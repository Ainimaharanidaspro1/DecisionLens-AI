import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Body:", body);
    console.log("API KEY ADA?", !!process.env.GEMINI_API_KEY);

    const {
      income,
      expense,
      saving_goal,
      financial_problem,
    } = body;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `
Kamu adalah AI financial advisor Indonesia.

Pendapatan: Rp${income}
Pengeluaran: Rp${expense}
Tujuan: ${saving_goal}
Masalah: ${financial_problem}

Berikan:
1. Analisis kondisi keuangan
2. Masalah utama
3. Rekomendasi penghematan
4. Langkah praktis
`,
    });

    console.log("Response Gemini:", response);

    return NextResponse.json({
      result: response.text,
    });
  } catch (error) {
    console.error("GEMINI ERROR:", error);

    return NextResponse.json(
      {
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "API jalan",
  });
}