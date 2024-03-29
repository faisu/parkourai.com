import { RetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

import { ChainTool, SerpAPI } from "langchain/tools";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { BaseLanguageModel } from "langchain/base_language";

const retrievalLlm = new ChatOpenAI({ temperature: 0 });

export async function loadSalesDocVectorStore(FileName: string) {
  const vectorStore = await MemoryVectorStore.fromTexts(
    [`Bridge IT provides with the following solutions
    
    1. **Customer Support Automation:**
   - Implement a GPT-powered chatbot for instant and intelligent responses to customer queries, enhancing customer support efficiency and availability.

2. **Lead Generation Automation:**
   - Develop a GPT-driven system to automatically qualify and generate leads by analyzing customer interactions, social media data, and other relevant sources.

3. **Content Creation Automation:**
   - Integrate GPT models to automate the generation of marketing content, blog posts, or social media updates, saving time and ensuring consistent messaging.

4. **Data Analysis and Reporting Automation:**
   - Utilize GPT for automating data analysis and report generation, allowing businesses to quickly derive insights and make informed decisions.

5. **Email Marketing Automation:**
   - Enhance email marketing campaigns by employing GPT to generate personalized and engaging email content, improving open and click-through rates.

6. **Code Generation Automation:**
   - Integrate GPT to automate code generation for repetitive tasks, reducing development time and minimizing errors in coding processes.

7. **Language Translation Automation:**
   - Implement GPT models for language translation to automate the translation of content into multiple languages, catering to a diverse audience.

8. **Legal Document Analysis Automation:**
   - Use GPT to automate the analysis of legal documents, extracting key information, and facilitating faster contract reviews or compliance checks.

9. **HR Process Automation:**
   - Streamline HR processes by employing GPT for resume screening, candidate pre-screening interviews, and employee onboarding communication.

10. **Social Media Management Automation:**
    - Utilize GPT models to automate social media posting schedules, generate engaging captions, and respond intelligently to user interactions.

11. **E-learning Content Creation:**
    - Implement GPT for automating the creation of e-learning content, quizzes, and assessments, making educational material creation more efficient.

12. **Event Planning Automation:**
    - Use GPT to automate event planning tasks such as scheduling, communication, and coordination, ensuring a smooth and organized event.

13. **Healthcare Data Analysis Automation:**
    - Apply GPT models for automating the analysis of healthcare data, helping healthcare professionals derive insights for patient care and research.

14. **Automated Legal Research:**
    - Develop a GPT-based system for automating legal research, analyzing case law, and summarizing legal documents for faster decision-making.

15. **IT Service Desk Automation:**
    - Integrate GPT into the IT service desk for automating responses to common technical issues, providing instant support to employees.

When implementing GPT-based automation services, it's crucial to consider data privacy, ethical considerations, and the specific needs of the business or industry. Customizing these solutions to fit the unique requirements of the organization will maximize their effectiveness.`],
    [{ id: 1 }],
    new OpenAIEmbeddings()
  );
  return vectorStore;
}

export async function setup_knowledge_base(FileName: string, llm: BaseLanguageModel) {
  const vectorStore = await loadSalesDocVectorStore(FileName);

  const knowledge_base = RetrievalQAChain.fromLLM(retrievalLlm, vectorStore.asRetriever(2));
  return knowledge_base;
}

/*
* query to get_tools can be used to be embedded and relevant tools found
* we only use one tool for now, but this is highly extensible!
*/

export async function get_tools(product_catalog: string) {
  const chain = await setup_knowledge_base(product_catalog, retrievalLlm);
  const tools = [
    new ChainTool({
      name: "ServiceSearch",
      description: "useful for when you need to answer questions about services information",
      chain
    }),
    new SerpAPI(process.env.SERPAPI_API_KEY, {
      location: "Mumbai,Maharashtra,India",
      hl: "en",
      gl: "us",
    }),
  ];
  return tools;
}