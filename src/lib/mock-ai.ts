// Mock AI polishing service since we don't have Groq integration
export async function polishFeedback(originalText: string): Promise<string> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock AI enhancement - in a real app, this would call Groq or another AI service
    const enhancements = [
        {
            pattern: /\bgood\b/gi,
            replacement: "excellent",
        },
        {
            pattern: /\bnice\b/gi,
            replacement: "outstanding",
        },
        {
            pattern: /\bokay\b/gi,
            replacement: "satisfactory",
        },
        {
            pattern: /\bgreat\b/gi,
            replacement: "exceptional",
        },
        {
            pattern: /\bawesome\b/gi,
            replacement: "remarkable",
        },
    ]

    let polishedText = originalText

    // Apply basic enhancements
    enhancements.forEach(({ pattern, replacement }) => {
        polishedText = polishedText.replace(pattern, replacement)
    })

    // Add professional structure if the text is short
    if (originalText.length < 100) {
        polishedText = `${polishedText}. This demonstrates strong professional capabilities and positive collaboration skills.`
    }

    // Ensure proper capitalization and punctuation
    polishedText = polishedText.charAt(0).toUpperCase() + polishedText.slice(1)
    if (!polishedText.endsWith(".") && !polishedText.endsWith("!") && !polishedText.endsWith("?")) {
        polishedText += "."
    }

    return polishedText
}

export const mockAIPolishingExamples = [
    {
        original: "Sarah is good at coding and helps others",
        polished:
            "Sarah is excellent at coding and helps others. This demonstrates strong professional capabilities and positive collaboration skills.",
    },
    {
        original: "Great teamwork on the project, very nice communication",
        polished:
            "Exceptional teamwork on the project, very outstanding communication. This demonstrates strong professional capabilities and positive collaboration skills.",
    },
    {
        original:
            "Alex consistently delivers high-quality work and is always willing to help team members. Their attention to detail is awesome.",
        polished:
            "Alex consistently delivers high-quality work and is always willing to help team members. Their attention to detail is remarkable.",
    },
]
