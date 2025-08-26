"use client";

import { useState } from "react";
import { useData } from "@/contexts/data-context";
import { usePermissions } from "@/hooks/use-permissions";
import { polishFeedback } from "@/lib/mock-ai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Send, RotateCcw } from "lucide-react";

interface FeedbackFormProps {
  employeeId: string;
  employeeName: string;
  onSuccess?: () => void;
}

export function FeedbackForm({
  employeeId,
  employeeName,
  onSuccess,
}: FeedbackFormProps) {
  const [feedback, setFeedback] = useState("");
  const [polishedFeedback, setPolishedFeedback] = useState("");
  const [isPolishing, setIsPolishing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPolished, setShowPolished] = useState(false);
  const { user, canLeaveFeedback } = usePermissions();
  const { addFeedback } = useData();

  const canLeave = canLeaveFeedback(employeeId);

  const handlePolish = async () => {
    if (!feedback.trim()) return;

    setIsPolishing(true);
    try {
      const polished = await polishFeedback(feedback);
      setPolishedFeedback(polished);
      setShowPolished(true);
    } catch (error) {
      console.error("Failed to polish feedback:", error);
    } finally {
      setIsPolishing(false);
    }
  };

  const handleSubmit = async () => {
    if (!user || !feedback.trim()) return;

    setIsSubmitting(true);
    try {
      const finalFeedback = showPolished ? polishedFeedback : feedback;

      addFeedback({
        employeeId,
        authorId: user.id,
        authorName: user.name,
        content: finalFeedback,
        isPolished: showPolished,
        originalContent: showPolished ? feedback : undefined,
      });

      // Reset form
      setFeedback("");
      setPolishedFeedback("");
      setShowPolished(false);
      onSuccess?.();
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setShowPolished(false);
    setPolishedFeedback("");
  };

  if (!canLeave) {
    return (
      <Alert>
        <AlertDescription>
          You don't have permission to leave feedback for this employee.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Leave Feedback for {employeeName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="feedback">Your Feedback</Label>
          <Textarea
            id="feedback"
            placeholder="Share your thoughts about this employee's work, collaboration, or any positive observations..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        {showPolished && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span>AI-Polished Version</span>
                <Badge variant="secondary" className="text-xs">
                  Enhanced
                </Badge>
              </Label>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="h-3 w-3 mr-1" />
                Use Original
              </Button>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
              <p className="text-sm text-purple-900">{polishedFeedback}</p>
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handlePolish}
            disabled={!feedback.trim() || isPolishing || showPolished}
            className="flex items-center space-x-2 bg-transparent"
          >
            {isPolishing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            <span>{isPolishing ? "Polishing..." : "Polish with AI"}</span>
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={!feedback.trim() || isSubmitting}
            className="flex items-center space-x-2"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span>{isSubmitting ? "Submitting..." : "Submit Feedback"}</span>
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>
            💡 <strong>Tip:</strong> Use the AI polish feature to enhance your
            feedback with more professional language and structure.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
