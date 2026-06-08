import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqs = [
  {
    question: "What is website change monitoring?",
    answer: "Website change monitoring is the practice of automatically tracking and detecting changes to web pages — visual layout shifts, content edits, structural modifications, redirect injections, and more. Unlike uptime monitoring, which only checks if a server responds, change monitoring tells you exactly what changed on each page and when it happened."
  },
  {
    question: "How is website change monitoring different from uptime monitoring?",
    answer: "Uptime monitoring checks one thing: 'Did the server respond with a 200 OK?' Website change monitoring checks everything else — broken layouts, missing checkout forms, changed pricing, injected redirects, unauthorized content edits. Your site can be 'up' and still be broken in ways that cost you revenue and reputation. PageSentinel catches what uptime tools miss."
  },
  {
    question: "Who needs website change monitoring?",
    answer: "Agencies managing 20–200+ client sites need to know about breakages before clients call. Ecommerce teams need to catch broken checkouts and pricing errors. Compliance teams need audit trails for policy pages. Any site owner who depends on their website for leads or revenue needs the peace of mind that their pages haven't changed without their knowledge."
  },
  {
    question: "How does PageSentinel detect website defacement?",
    answer: "PageSentinel takes scheduled screenshots and HTML snapshots of your monitored pages and compares each new capture to a known-good baseline. When new outbound links, unexpected redirect rules, injected scripts, or visual defacement appear, you get an immediate alert with a visual diff and a plain-English summary. Noise reduction filters out benign changes so you only see what matters."
  },
  {
    question: "How quickly do I get alerted when a page changes?",
    answer: "Alerts arrive in under 30 seconds after a scan detects a meaningful change. You choose your scan frequency — from every 15 minutes to weekly — based on how critical each page is. High-value pages like checkout and pricing can be checked continuously, while lower-priority pages get daily or weekly scans."
  },
  {
    question: "Do I need to install anything on my website?",
    answer: "No. PageSentinel monitors any public URL from the outside — no plugin installs, no wp-admin access, no code snippets. Just add the URLs you want to monitor, set your scan frequency, and you're done. Setup takes under 3 minutes."
  },
  {
    question: "What's included in the free trial?",
    answer: "Your 7-day free trial includes full access to all features. Monitor up to 20 pages, set any scan frequency, and receive real alerts. No credit card required. Cancel anytime — your data and change history are yours to keep."
  },
  {
    question: "Can I monitor competitor websites for changes?",
    answer: "Yes, PageSentinel monitors any publicly accessible URL. Track competitor pricing changes, messaging updates, or new feature launches. Many agencies use this for competitive intelligence alongside client monitoring. Terms of service require respecting robots.txt and applicable laws."
  },
]

export function HomeFAQ() {
  return (
    <section className="relative border-b border-border/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 md:py-24">
        {/* FAQPage Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />

        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know about website change monitoring and how PageSentinel works.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-sm font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
