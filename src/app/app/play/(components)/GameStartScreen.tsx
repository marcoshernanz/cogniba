import quotes from "@/content/quotes.json";
import calculateAccuracy from "@/lib/calculateAccuracy";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/cn";
import { cva } from "class-variance-authority";
import {
  CheckIcon,
  CrosshairIcon,
  MoveDownRightIcon,
  MoveRightIcon,
  MoveUpRightIcon,
  TriangleAlert,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

const boxVariants = cva("flex items-center gap-2 rounded-md py-2 pl-4 border", {
  variants: {
    size: { small: "pr-10 ", big: "" },
    color: {
      green:
        "bg-green-200 text-green-950 border-green-300/50 dark:bg-green-950 dark:text-green-50 dark:border-green-900",
      red: "bg-red-200 text-red-950 border-red-300/50 dark:bg-red-950 dark:text-red-50 dark:border-red-900",
      yellow:
        "bg-yellow-200 text-yellow-950 border-yellow-300/50 dark:bg-yellow-950 dark:text-yellow-50 dark:border-yellow-900",
      blue: "bg-sky-200 text-sky-950 border-sky-300/50 dark:bg-sky-950 dark:text-sky-50 dark:border-sky-900",
      orange:
        "bg-orange-200 text-orange-950 border-orange-300/50 dark:bg-orange-950 dark:text-orange-50 dark:border-orange-900",
    },
  },
});

interface StartScreenProps {
  visible: boolean;
  onStart: () => void;
  correctHits: number | null;
  incorrectHits: number | null;
  missedHits: number | null;
  previousLevel: number;
  newLevel: number;
}

export default function StartScreen({
  visible,
  onStart,
  correctHits,
  incorrectHits,
  missedHits,
  previousLevel,
  newLevel,
}: StartScreenProps) {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const hasStatistics =
    correctHits !== null && incorrectHits !== null && missedHits !== null;
  let accuracy = 0;
  if (hasStatistics) {
    accuracy = Math.round(
      calculateAccuracy({ correctHits, incorrectHits, missedHits }) * 100,
    );
  }

  useEffect(() => {
    const { quote: fetchedQuote, author: fetchedAuthor } =
      quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(fetchedQuote);
    setAuthor(fetchedAuthor);
  }, []);

  return (
    <>
      {/* <div
        data-state={"closed"}
        className="fixed left-1/2 top-1/2 z-[60] h-96 w-96 bg-red-600 data-[state=closed]:invisible data-[state=closed]:duration-1000 data-[state=open]:duration-1000 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      ></div> */}
      <div
        data-state={visible ? "open" : "closed"}
        className="pointer-events-auto fixed inset-0 z-40 bg-black/80 backdrop-blur-sm data-[state=closed]:invisible data-[state=closed]:duration-500 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      ></div>
      <Dialog defaultOpen open={visible} modal={false}>
        {/* <DialogOverlay backdrop={true} className="duration-500" /> */}
        <DialogContent
          className="z-50 flex h-full w-full max-w-full justify-center bg-slate-50 p-0 data-[state=closed]:duration-500 data-[state=open]:duration-500 dark:bg-slate-950 sm:h-fit sm:max-w-lg sm:p-6"
          closeButton={false}
          backdrop={true}
          hideOverlay
          aria-describedby="Start screen. Press 'Play' to start playing"
        >
          <div className="flex w-full max-w-lg flex-col justify-center px-6 xs:px-7 sm:px-0">
            {!hasStatistics ? (
              <>
                <DialogTitle className="mb-6 text-3xl text-slate-900 dark:text-slate-100">
                  Welcome back!
                </DialogTitle>
                <blockquote className="font-serif text-lg font-normal italic text-slate-600 dark:text-slate-300">
                  <div className="mb-1">&ldquo;{quote}&rdquo;</div>
                  <div className="text-right text-xl text-slate-700 dark:text-slate-400">
                    &mdash; {author}
                  </div>
                </blockquote>
              </>
            ) : (
              <>
                <DialogTitle className="mb-6 text-3xl text-slate-900 dark:text-slate-100">
                  Well played!
                </DialogTitle>
                <div className="flex flex-col items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-slate-300/50 bg-white p-2 dark:border-slate-800 dark:bg-slate-900/30 xs:flex-row">
                  <div className="flex w-full flex-col gap-1 text-lg xs:w-fit">
                    <div
                      className={cn(
                        boxVariants({ size: "small", color: "green" }),
                      )}
                    >
                      <CheckIcon className="h-6 w-6" />
                      <div>
                        <span className="font-semibold">{correctHits}</span>{" "}
                        correct
                      </div>
                    </div>
                    <div
                      className={cn(
                        boxVariants({ size: "small", color: "red" }),
                      )}
                    >
                      <XIcon className="h-6 w-6" />
                      <div>
                        <span className="font-semibold">{incorrectHits}</span>{" "}
                        incorrect
                      </div>
                    </div>
                    <div
                      className={cn(
                        boxVariants({ size: "small", color: "yellow" }),
                      )}
                    >
                      <TriangleAlert className="h-6 w-6" />
                      <div>
                        <span className="font-semibold">{missedHits}</span>{" "}
                        missed
                      </div>
                    </div>
                  </div>

                  <div className="hidden h-[calc(100%+1rem)] border-l border-slate-200 dark:border-slate-800 xs:block"></div>
                  <div className="block w-[calc(100%+1rem)] border-t border-slate-200 dark:border-slate-800 xs:hidden"></div>

                  <div className="flex h-full w-full flex-col gap-1 text-lg">
                    <div
                      className={cn(
                        boxVariants({
                          size: "big",
                          color:
                            newLevel > previousLevel
                              ? "green"
                              : newLevel === previousLevel
                                ? "blue"
                                : "red",
                        }),
                      )}
                    >
                      <CrosshairIcon className="h-6 w-6" />
                      <div>
                        <span className="font-semibold">{accuracy}%</span>{" "}
                        accuracy
                      </div>
                    </div>
                    {newLevel > previousLevel && (
                      <div
                        className={cn(
                          boxVariants({
                            size: "big",
                            color: "green",
                          }),
                        )}
                      >
                        <MoveUpRightIcon className="h-6 w-6" />
                        <div className="font-medium">Level Increased</div>
                      </div>
                    )}
                    {newLevel === previousLevel && (
                      <div
                        className={cn(
                          boxVariants({ size: "big", color: "blue" }),
                        )}
                      >
                        <MoveRightIcon className="h-6 w-6" />
                        <div className="font-medium">Level Maintained</div>
                      </div>
                    )}
                    {newLevel < previousLevel && (
                      <div
                        className={cn(
                          boxVariants({ size: "big", color: "red" }),
                        )}
                      >
                        <MoveDownRightIcon className="h-6 w-6" />
                        <div className="font-medium">Level Decreased</div>
                      </div>
                    )}
                    <div className="hidden items-center justify-between gap-3 text-center font-medium xs:flex">
                      <div
                        className={cn(
                          boxVariants({
                            size: "big",
                            color: "orange",
                            className: "w-full justify-center px-0",
                          }),
                        )}
                      >
                        Level {previousLevel}
                      </div>
                      <MoveRightIcon className="h-6 w-6 flex-shrink-0 text-slate-900 dark:text-slate-100" />
                      <div
                        className={cn(
                          boxVariants({
                            size: "big",
                            color: "orange",
                            className: "w-full justify-center px-0",
                          }),
                        )}
                      >
                        Level {newLevel ?? 0}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            <Button
              className="mt-14 w-full justify-center border border-orange-400/50 bg-orange-300 py-5 text-4xl font-bold uppercase tracking-wide text-slate-950 transition duration-200 hover:border-orange-500/50 hover:bg-orange-400 hover:shadow-lg focus-visible:outline-none focus-visible:ring-opacity-0 active:shadow-sm dark:border-orange-200/50 dark:bg-orange-300 dark:text-slate-950 dark:hover:border-orange-300/50 dark:hover:bg-orange-400"
              size="custom"
              type="submit"
              onClick={onStart}
              tabIndex={-1}
            >
              Play
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}