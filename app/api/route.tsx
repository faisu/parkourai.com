import { ChatOpenAI } from "langchain/chat_models/openai";
import { type NextRequest } from 'next/server';
import { StreamingTextResponse } from "ai";

import { SalesGPT } from "@/lib/salesgpt";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export const runtime = 'nodejs';

// test the intermediate chains
const verbose = false;
const llm = new ChatOpenAI({ modelName: "gpt-4", temperature: 0 });

const llmConfig = {
    salesperson_name: "Noor",
    use_tools: true,
    product_catalog: "sample_product_catalog.txt",
};


export async function POST(request: NextRequest) {
    const body = await request.json();

    const conversation_history = body.messages.map((el: Message) => `${el.role}: ${el.content} <END_OF_TURN>`);
    const sales_agent = await SalesGPT.from_llm(llm, verbose, {
        ...llmConfig,
        conversation_history
    });
    const stageResponse = await sales_agent.determine_conversation_stage();
    console.log('stageResponse', stageResponse);
    const stepResponse = await sales_agent.step();
    // const userResponse = await sales_agent.get_possible_user_resp()
    // console.log('userResponse', userResponse);
    const textEncoder = new TextEncoder();
    const fakeStream = new ReadableStream({
        async start(controller) {
            // for (const character of 'hello') {
            for (const character of stepResponse as unknown as string) {
                controller.enqueue(textEncoder.encode(character));
                await new Promise((resolve) => setTimeout(resolve, 20));
            }
            controller.close();
        },
    });

    return new StreamingTextResponse(fakeStream);
}