import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <main id="main-content" className="pt-20 flex-1 flex items-center justify-center">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="text-8xl font-bold gradient-text">404</div>
          <h1 className="text-accessible-3xl font-bold">Page Not Found</h1>
          <p className="text-muted-foreground text-accessible-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg">
              <Link to="/">
                <Home className="w-5 h-5 mr-2" aria-hidden="true" />
                Go Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
