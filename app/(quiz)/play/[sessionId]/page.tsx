'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { useQuizStore, useSyncStore } from '@/lib/stores';
import { QuestionCard, Timer, OptionList, ResultsSummary } from '@/components/quiz';
import { offlineRequest } from '@/lib/api';
import * as svc from '@/lib/services';
import { db } from '@/lib/db';
import { queueScore } from '@/lib/db/scores';

interface PageProps {
  params: Promise<{ sessionId: string }>;
}

export default function QuizPlayerPage({ params }: PageProps) {
  const { sessionId: sessionIdStr } = use(params);
  const sid = parseInt(sessionIdStr);
  const router = useRouter();
  const {
    questions, currentIndex, answers, isSubmitted, timeRemaining,
    loadQuiz, answerQuestion, nextQuestion, prevQuestion, submitQuiz, resetQuiz, getScore
  } = useQuizStore();
  const isOnline = useSyncStore((state) => state.isOnline);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const session = await svc.getSessionById(sid);
        const qs = await offlineRequest(() => svc.getSessionQuestions(sid), { cacheKey: 'sessions' });
        loadQuiz(sid, qs, session.time_limit_seconds);
      } catch (err) {
        console.error(err);
        router.push('/play/join');
      } finally {
        setLoading(false);
      }
    };
    init();
    return () => resetQuiz();
  }, [sid, loadQuiz, resetQuiz, router]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isSubmitted && questions.length > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isSubmitted, questions.length]);

  const handleSubmit = async () => {
    const studentData = localStorage.getItem('current_student');
    if (!studentData) return;
    const student = JSON.parse(studentData);

    const finalScore = getScore();
    await queueScore({
      session_id: sid,
      student_id: student.id,
      score: finalScore,
      played_at: new Date().toISOString(),
      local_attempt_id: crypto.randomUUID(),
    });

    submitQuiz();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  if (!questions.length) return null;

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 pt-12">
        <ResultsSummary
          questions={questions}
          answers={answers}
          score={getScore()}
          totalQuestions={questions.length}
          onFinish={() => router.push('/play/join')}
        />
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 p-4">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            {!isOnline && (
              <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-600 rounded-lg text-xs font-bold">
                <AlertCircle className="w-3 h-3" /> Offline
              </div>
            )}
          </div>
          <Timer
            totalSeconds={timeRemaining}
            onTimeUp={handleSubmit}
            isRunning={!isSubmitted}
          />
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 mt-8">
        <QuestionCard
          question={currentQuestion}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
        >
          <OptionList
            options={currentQuestion.options}
            selectedOptionId={answers.get(currentQuestion.id) || null}
            onSelect={(oid) => answerQuestion(currentQuestion.id, oid)}
          />
        </QuestionCard>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4">
        <div className="max-w-2xl mx-auto flex gap-4">
          <button
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-50 text-slate-700 font-bold rounded-2xl disabled:opacity-30"
          >
            <ArrowLeft className="w-5 h-5" /> Anterior
          </button>
          
          {currentIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-green-500 text-white font-bold rounded-2xl hover:bg-green-600 shadow-lg shadow-green-100"
            >
              <Check className="w-5 h-5" /> Finalizar
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100"
            >
              Próximo <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
