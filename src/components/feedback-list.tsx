"use client";

import type { Feedback } from "@/lib/mock-data";
import { usePermissions } from "@/hooks/use-permissions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Sparkles, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { useState } from "react";

interface FeedbackListProps {
  feedback: Feedback[];
  employeeId: string;
}

export function FeedbackList({ feedback, employeeId }: FeedbackListProps) {
  const { canViewFeedback } = usePermissions();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const canView = canViewFeedback(employeeId);

  if (!canView) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>You don't have permission to view feedback for this employee.</p>
        </CardContent>
      </Card>
    );
  }

  const employeeFeedback = feedback.filter(
    (fb) => fb.employeeId === employeeId
  );

  if (employeeFeedback.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No feedback available yet.</p>
          <p className="text-sm">
            Be the first to leave feedback for this employee!
          </p>
        </CardContent>
      </Card>
    );
  }

  const toggleExpanded = (feedbackId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(feedbackId)) {
      newExpanded.delete(feedbackId);
    } else {
      newExpanded.add(feedbackId);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="space-y-4">
      {employeeFeedback.map((fb) => {
        const isExpanded = expandedItems.has(fb.id);
        const hasOriginal = fb.isPolished && fb.originalContent;

        return (
          <Card key={fb.id} className="hover:shadow-sm transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-green-100 text-green-600 text-sm">
                      {fb.authorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{fb.authorName}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(fb.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {fb.isPolished && (
                    <Badge
                      variant="secondary"
                      className="text-xs flex items-center space-x-1"
                    >
                      <Sparkles className="h-3 w-3" />
                      <span>AI Enhanced</span>
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <p className="text-sm leading-relaxed">{fb.content}</p>

                {hasOriginal && (
                  <Collapsible
                    open={isExpanded}
                    onOpenChange={() => toggleExpanded(fb.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-muted-foreground p-0 h-auto"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-3 w-3 mr-1" />
                            Hide original
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3 mr-1" />
                            Show original feedback
                          </>
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">
                          Original feedback:
                        </p>
                        <p className="text-sm text-gray-700">
                          {fb.originalContent}
                        </p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
