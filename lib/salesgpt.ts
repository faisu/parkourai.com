import { loadSalesConversationChain, loadStageAnalyzerChain } from "./chain";
import { BaseLanguageModel } from "langchain/base_language";
import { LLMSingleActionAgent, AgentExecutor } from "langchain/agents";
import { BaseChain, LLMChain } from "langchain/chains";
import { ChainValues } from "langchain/schema";
import { CallbackManagerForChainRun } from "langchain/callbacks";
import { CONVERSATION_STAGES, SALES_AGENT_TOOLS_PROMPT } from "./config";
import { CustomPromptTemplateForTools } from "./prompts";
import { SalesConvoOutputParser } from "./parser";
import { get_tools } from "./knowledge";

export class SalesGPT extends BaseChain {
    conversation_stage_id: string;
    conversation_history: string[];
    current_conversation_stage: string = "1";
    stage_analyzer_chain: LLMChain; // StageAnalyzerChain
    sales_conversation_utterance_chain: LLMChain; // SalesConversationChain
    sales_agent_executor?: AgentExecutor;
    use_tools: boolean = false;

    conversation_stage_dict: Record<string, string> = CONVERSATION_STAGES;

    salesperson_name: string = "Noor";
    salesperson_role: string = "Sales Representative; Cat Lover; Chai Enthusiast";
    company_name: string = "Bridge IT";
    company_business: string = "Bridge IT is a technology consulting company. We offer a range of high-quality solutions that are designed to meet the unique needs of our customers.";
    company_values: string = "Our mission at Bridge IT is to help businesses achieve optimum customer success. We provide with the best possible solution. We are committed to helping our customers achieve optimal output by offering exceptional products and customer service.";
    // conversation_purpose: string = "find out whether they are looking to achieve GPT based automation and if so, ensure to get either phone number or email address";
    conversation_purpose: string = "help get gstin of the developers specifically from mastersindia links from google searh";
    conversation_type: string = "chat";

    constructor(args: {
        salesperson_name: string,
        stage_analyzer_chain: LLMChain,
        sales_conversation_utterance_chain: LLMChain,
        sales_agent_executor?: AgentExecutor,
        conversation_history: string[];
        use_tools: boolean
    }) {
        super();
        this.salesperson_name = args.salesperson_name;
        this.stage_analyzer_chain = args.stage_analyzer_chain;
        this.sales_conversation_utterance_chain = args.sales_conversation_utterance_chain;
        this.sales_agent_executor = args.sales_agent_executor;
        this.use_tools = args.use_tools;
        this.conversation_history = args.conversation_history;
    }

    retrieve_conversation_stage(key = "0") {
        return this.conversation_stage_dict[key] || "1"
    }

    seed_agent() {
        // Step 1: seed the conversation
        this.current_conversation_stage = this.retrieve_conversation_stage("1");
        this.conversation_stage_id = "0";
        this.conversation_history = [];
    }

    async determine_conversation_stage() {
        let { text } = await this.stage_analyzer_chain.call({
            conversation_history: this.conversation_history.join('\n'),
            current_conversation_stage: this.current_conversation_stage,
            conversation_stage_id: this.conversation_stage_id,
        });

        this.conversation_stage_id = text;
        this.current_conversation_stage = this.retrieve_conversation_stage(text);
        return text;
    }

    human_step(human_input: string) {
        this.conversation_history.push(`User: ${human_input} <END_OF_TURN>`);
    }

    async step() {
        const res = await this._call({ inputs: {} });
        return res;
    }

    async _call(_values: ChainValues, runManager?: CallbackManagerForChainRun): Promise<ChainValues> {
        // Run one step of the sales agent.
        // Generate agent's utterance
        let ai_message;
        let res;
        if (this.use_tools && this.sales_agent_executor) {
            res = await this.sales_agent_executor.call({
                input: "",
                conversation_stage: this.current_conversation_stage,
                conversation_history: this.conversation_history.join('\n'),
                salesperson_name: this.salesperson_name,
                salesperson_role: this.salesperson_role,
                company_name: this.company_name,
                company_business: this.company_business,
                company_values: this.company_values,
                conversation_purpose: this.conversation_purpose,
                conversation_type: this.conversation_type,
            }, runManager?.getChild("sales_agent_executor"));
            ai_message = res.output;
        } else {
            res = await this.sales_conversation_utterance_chain.call({
                salesperson_name: this.salesperson_name,
                salesperson_role: this.salesperson_role,
                company_name: this.company_name,
                company_business: this.company_business,
                company_values: this.company_values,
                conversation_purpose: this.conversation_purpose,
                conversation_history: this.conversation_history.join('\n'),
                conversation_stage: this.current_conversation_stage,
                conversation_type: this.conversation_type,
            }, runManager?.getChild("sales_conversation_utterance"));
            ai_message = res.text;
        }
        return ai_message;
    }
    static async from_llm(llm: BaseLanguageModel, verbose: boolean, config: {
        use_tools: boolean,
        product_catalog: string,
        salesperson_name: string
        conversation_history: string[]
    }) {
        const { use_tools, product_catalog, salesperson_name, conversation_history } = config;
        let sales_agent_executor;
        let tools;
        if (use_tools !== undefined && use_tools === false) {
            sales_agent_executor = undefined;
        } else {
            tools = await get_tools(product_catalog);

            const prompt = new CustomPromptTemplateForTools({
                tools,
                inputVariables: [
                    "input",
                    "intermediate_steps",
                    "salesperson_name",
                    "salesperson_role",
                    "company_name",
                    "company_business",
                    "company_values",
                    "conversation_purpose",
                    "conversation_type",
                    "conversation_history",
                ],
                template: SALES_AGENT_TOOLS_PROMPT
            });
            const llm_chain = new LLMChain({
                llm, prompt, verbose
            });
            const output_parser = new SalesConvoOutputParser({ ai_prefix: salesperson_name });
            const sales_agent_with_tools = new LLMSingleActionAgent({
                llmChain: llm_chain,
                outputParser: output_parser,
                stop: ["\nObservation:"],
            });
            sales_agent_executor = AgentExecutor.fromAgentAndTools({
                agent: sales_agent_with_tools,
                tools,
                verbose,
            });
        }

        return new SalesGPT({
            salesperson_name,
            stage_analyzer_chain: loadStageAnalyzerChain(llm, verbose),
            sales_conversation_utterance_chain: loadSalesConversationChain(llm, verbose),
            sales_agent_executor,
            conversation_history,
            use_tools
        });
    }

    _chainType(): string {
        throw new Error("Method not implemented.");
    }

    get inputKeys(): string[] {
        return [];
    }

    get outputKeys(): string[] {
        return [];
    }
}
