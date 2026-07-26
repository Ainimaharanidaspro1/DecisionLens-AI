This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      income,
      expense,
      saving_goal,
      financial_problem
    } = body;


    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });


    const prompt = `
Kamu adalah AI financial advisor untuk pengguna Indonesia.

Analisis kondisi finansial berikut:

Pendapatan:
Rp${income}

Pengeluaran:
Rp${expense}

Tujuan keuangan:
${saving_goal}

Masalah finansial:
${financial_problem}


Berikan jawaban dengan format:

1. Analisis kondisi keuangan
2. Masalah utama
3. Rekomendasi penghematan
4. Langkah praktis yang bisa dilakukan
`;


    const result = await model.generateContent(prompt);

    const response = result.response.text();


    return NextResponse.json({
      result: response
    });


  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "Gagal membuat analisis AI"
      },
      {
        status: 500
      }
    );

  }

}