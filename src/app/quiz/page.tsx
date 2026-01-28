import React from 'react';
import { DataLoader } from '@/lib/DataLoader';
import Link from 'next/link';

export const metadata = {
  title: 'Course Finder Quiz',
  description: 'Find the right course for your career goals in 60 seconds.',
};

export default function QuizPage() {
  const quizData = DataLoader.loadData<{ questions: any[] }>('quiz.json');
  const questions = quizData.questions || [];

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Find Your Perfect Course 🎯</h1>

        {questions.length === 0 ? (
          <div className="bg-white p-12 rounded-xl shadow-sm border border-slate-200">
            <div className="text-6xl mb-4">🧩</div>
            <h3 className="text-xl font-semibold mb-2">Quiz Config Missing</h3>
            <p className="text-slate-500 mb-6">There are no questions configured in <code>data/quiz.json</code>.</p>
            <Link href="/" className="inline-block bg-slate-900 text-white px-6 py-2 rounded-lg font-medium">
              Back Home
            </Link>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-left">
            <p className="text-slate-600 mb-4">Quiz Engine Placeholder. Questions loaded: {questions.length}</p>
            {/* Quiz Logic Implementation would go here */}
            <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md border border-yellow-200 text-sm">
              Interactive Quiz Component to be implemented.
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
