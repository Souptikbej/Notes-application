import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-primary/10 border border-primary/30 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row items-center p-6 gap-4">
          <div className="bg-primary/20 p-4 rounded-full">
            <ZapIcon className="size-10 text-primary" />
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold mb-1">Rate Limit Reached</h3>
            <p className="text-sm opacity-80">
              Too many requests were made in a short time.
            </p>
            <p className="text-xs opacity-60 mt-1">
              Please wait a few seconds and try again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
