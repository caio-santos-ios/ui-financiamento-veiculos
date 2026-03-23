import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-brand-500 mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Página não encontrada</p>
        <Link
          href="/simulator"
          className="inline-flex items-center px-5 py-2.5 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
