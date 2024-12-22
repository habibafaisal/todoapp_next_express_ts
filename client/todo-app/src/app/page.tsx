export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-800 font-sans">
      <div className="text-center p-8 bg-white shadow-xl rounded-lg w-full max-w-md">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-4 transition duration-300 transform hover:scale-105">
          Habiba's To-Do List
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Organize your tasks with ease and stay productive.
        </p>
        <div className="space-y-4">
          <p className="text-base text-gray-700">Already have an account?</p>
          <a
            href="/auth/login"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold transition duration-300 hover:bg-blue-700 transform hover:scale-105"
          >
            Login
          </a>
          <p className="text-base text-gray-700">New here?</p>
          <a
            href="/auth/signup"
            className="inline-block bg-green-600 text-white py-2 px-4 rounded-lg font-semibold transition duration-300 hover:bg-green-700 transform hover:scale-105"
          >
            Signup
          </a>
        </div>
      </div>
    </main>
  );
}
