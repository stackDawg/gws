import { Link } from "wouter";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-pink-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center border-2 border-pink-100">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        
        <h1 className="font-handwriting text-3xl font-bold text-foreground mb-4">
          Oops! Page Not Found
        </h1>
        
        <p className="text-muted-foreground mb-8">
          We couldn't find the page you were looking for. It might have floated away like a balloon! 🎈
        </p>

        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
        >
          Return to Card
        </Link>
      </div>
    </div>
  );
}
