"use client";
import Link from "next/link";
import { LiaWeightSolid } from "react-icons/lia";
import { Bell, Dumbbell, Menu, Package2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import UserProfile from "./auth/user-profile";
import useExercises from "@/app/hook/useExercises";
import slugify from "slugify";

export function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  // Fetch exercises for each category
  const {
    data: pushExercises,
    error: pushError,
    isLoading: pushLoading,
  } = useExercises("Push");
  const {
    data: pullExercises,
    error: pullError,
    isLoading: pullLoading,
  } = useExercises("Pull");
  const {
    data: legsExercises,
    error: legsError,
    isLoading: legsLoading,
  } = useExercises("Legs");

  // Helper function to render exercises or a loading/error state
  const renderExercises = (
    exercises: any[],
    isLoading: boolean,
    error: Error | null
  ) => {
    if (isLoading) return <p>Loading exercises...</p>;
    if (error) return <p>Error loading exercises: {error.message}</p>;

    return exercises.map((exercise) => {
      // slug
      const categorySlug = slugify(exercise.category_name, { lower: true });
      const exerciseSlug = slugify(exercise.name, { lower: true });
      const href = `/workout/${categorySlug}/${exerciseSlug}`;

      return (
        <Link
          key={exercise.id}
          href={href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-4 text-muted-foreground transition-all hover:text-primary",
            pathname === href ? "bg-muted text-primary" : ""
          )}
        >
          <Dumbbell className="h-4 w-4 shrink-0" />
          <span className="py-2">{exercise.name}</span>
        </Link>
      );
    });
  };

  return (
    <div className="fixed grid min-h-dvh w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-dvh flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span>Fitness Tracker</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div>
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/body-weight"
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 text-muted-foreground transition-all hover:text-primary",
                  pathname === "/body-weight" ? "bg-muted text-primary" : ""
                )}
              >
                <LiaWeightSolid className="h-6 w-6" />
                <span className="py-2">Body Weight</span>
              </Link>
              <Accordion type="single" collapsible className="w-full">
                <p className="text-xs font-extralight text-muted-foreground pt-4 pb-1 pl-2">
                  Workouts
                </p>
                {/* Push Day */}
                <AccordionItem value="item-1">
                  <AccordionTrigger
                    className={cn(
                      "px-3 py-2 transition-all hover:text-primary hover:no-underline",
                      pathname.includes("/workout/push")
                        ? "text-primary"
                        : "text-muted-foreground "
                    )}
                  >
                    Push Day
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full bg-primary ml-auto mr-2",
                        pathname.includes("/workout/push") ? "" : "hidden"
                      )}
                    >
                      <span className="sr-only">Current section: Push Day</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="vertical-scrollbar max-h-[calc(100dvh-458px)] overflow-y-auto">
                    {renderExercises(
                      pushExercises || [],
                      pushLoading,
                      pushError
                    )}
                  </AccordionContent>
                </AccordionItem>

                {/* Pull Day */}
                <AccordionItem value="item-2">
                  <AccordionTrigger
                    className={cn(
                      "px-3 py-2 transition-all hover:text-primary hover:no-underline",
                      pathname.includes("/workout/pull")
                        ? "text-primary"
                        : "text-muted-foreground "
                    )}
                  >
                    Pull Day
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full bg-primary ml-auto mr-2",
                        pathname.includes("/workout/pull") ? "" : "hidden"
                      )}
                    >
                      <span className="sr-only">Current section: Pull Day</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="vertical-scrollbar max-h-[calc(100dvh-458px)] overflow-y-auto">
                    {renderExercises(
                      pullExercises || [],
                      pullLoading,
                      pullError
                    )}
                  </AccordionContent>
                </AccordionItem>

                {/* Legs Day */}
                <AccordionItem value="item-3">
                  <AccordionTrigger
                    className={cn(
                      "px-3 py-2 transition-all hover:text-primary hover:no-underline",
                      pathname.includes("/workout/legs")
                        ? "text-primary"
                        : "text-muted-foreground "
                    )}
                  >
                    Legs Day
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full bg-primary ml-auto mr-2",
                        pathname.includes("/workout/legs") ? "" : "hidden"
                      )}
                    >
                      <span className="sr-only">Current section: Legs Day</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="vertical-scrollbar max-h-[calc(100dvh-458px)] overflow-y-auto">
                    {renderExercises(
                      legsExercises || [],
                      legsLoading,
                      legsError
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-dvh">
        <header className="flex h-14 items-center gap-3 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col gap-2 p-0">
              <SheetTitle className="sr-only">Navbar</SheetTitle>
              <SheetDescription className="sr-only">
                Navigate to pages
              </SheetDescription>
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span>Fitness Tracker</span>
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-auto mr-7 h-8 w-8"
                >
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Toggle notifications</span>
                </Button>
              </div>
              <div>
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                  <Link
                    href="/body-weight"
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 text-muted-foreground transition-all hover:text-primary",
                      pathname === "/body-weight" ? "bg-muted text-primary" : ""
                    )}
                  >
                    <LiaWeightSolid className="h-6 w-6" />
                    <span className="py-2">Body Weight</span>
                  </Link>
                  <Accordion type="single" collapsible className="w-full">
                    <p className="text-xs font-extralight text-muted-foreground pt-4 pb-1 pl-2">
                      Workouts
                    </p>
                    {/* Push Day */}
                    <AccordionItem value="item-1">
                      <AccordionTrigger
                        className={cn(
                          "px-3 py-2 transition-all hover:text-primary hover:no-underline",
                          pathname.includes("/workout/push")
                            ? "text-primary"
                            : "text-muted-foreground "
                        )}
                      >
                        Push Day
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full bg-primary ml-auto mr-2",
                            pathname.includes("/workout/push") ? "" : "hidden"
                          )}
                        >
                          <span className="sr-only">
                            Current section: Push Day
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="vertical-scrollbar max-h-[calc(100dvh-458px)] overflow-y-auto">
                        {renderExercises(
                          pushExercises || [],
                          pushLoading,
                          pushError
                        )}
                      </AccordionContent>
                    </AccordionItem>

                    {/* Pull Day */}
                    <AccordionItem value="item-2">
                      <AccordionTrigger
                        className={cn(
                          "px-3 py-2 transition-all hover:text-primary hover:no-underline",
                          pathname.includes("/workout/pull")
                            ? "text-primary"
                            : "text-muted-foreground "
                        )}
                      >
                        Pull Day
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full bg-primary ml-auto mr-2",
                            pathname.includes("/workout/pull") ? "" : "hidden"
                          )}
                        >
                          <span className="sr-only">
                            Current section: Pull Day
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="vertical-scrollbar max-h-[calc(100dvh-458px)] overflow-y-auto">
                        {renderExercises(
                          pullExercises || [],
                          pullLoading,
                          pullError
                        )}
                      </AccordionContent>
                    </AccordionItem>

                    {/* Legs Day */}
                    <AccordionItem value="item-3">
                      <AccordionTrigger
                        className={cn(
                          "px-3 py-2 transition-all hover:text-primary hover:no-underline",
                          pathname.includes("/workout/legs")
                            ? "text-primary"
                            : "text-muted-foreground "
                        )}
                      >
                        Legs Day
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full bg-primary ml-auto mr-2",
                            pathname.includes("/workout/legs") ? "" : "hidden"
                          )}
                        >
                          <span className="sr-only">
                            Current section: Legs Day
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="vertical-scrollbar max-h-[calc(100dvh-458px)] overflow-y-auto">
                        {renderExercises(
                          legsExercises || [],
                          legsLoading,
                          legsError
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </nav>
              </div>
              <div className="mt-auto p-4">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-3 pb-3">
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <ModeToggle />
          <UserProfile />
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
