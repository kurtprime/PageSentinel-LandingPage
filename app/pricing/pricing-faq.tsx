import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqs = [
  {
    question: "What is website change monitoring?",
    answer: "Website change monitoring tracks what actually changes on your pages — visual shifts, text edits, new links, removed sections — not just whether the server is responding. Think of it as the difference between knowing your site is 'up' and knowing exactly what looks different from yesterday. You can do this manually by taking screenshots and comparing them, or use automated monitoring to handle it continuously.",
  },
  {
    question: "How does website change monitoring work?",
    answer: "A monitoring tool takes scheduled captures of your pages — screenshots and HTML snapshots — then compares each new capture to a known-good baseline. The system flags differences that matter (layout breaks, missing elements, changed prices, injected scripts) while filtering out benign noise like font rendering variations or ad rotations. When a real change is detected, you get an alert with a visual diff and a plain-English summary of what happened.",
  },
  {
    question: "How is this different from uptime monitoring?",
    answer: "Uptime monitoring checks one thing: is the server responding? Your site can be 'up' but broken — layout shifted, checkout form missing, prices changed, redirect injected. Uptime tools miss all of these. Website change monitoring catches the problems that actually affect your visitors and your revenue — the ones your customers notice before you do.",
  },
  {
    question: "What are scan credits and how do they work?",
    answer: "Each time a monitored URL is checked, it uses one scan credit. If you monitor 10 pages once daily, that's roughly 300 scans per month. Credits are pooled across all your URLs — you don't need to track per-page limits. They reset each billing cycle, and your plan's credit limit is designed to cover your configured scan frequency. If you need more, upgrading takes a click and preserves all your history.",
  },
  {
    question: "When do credits reset?",
    answer: "Credits reset at the start of each billing cycle (monthly or annual). Unused credits don't roll over — they're designed to cover your monitoring needs within each period. If you find yourself consistently running low, upgrading to the next tier gives you more headroom without losing any of your monitored URLs or history.",
  },
  {
    question: "What happens if I run out of credits?",
    answer: "You'll get a heads-up before you hit your limit. After that, scans continue at a reduced frequency so nothing gets dropped entirely. You can also buy additional credit packs for a temporary boost without changing your plan. Most teams set up their monitoring to stay well within their plan's limits — if you need help configuring your scan frequency to optimize credit usage, we're happy to walk through it.",
  },
  {
    question: "Can I set different frequencies for different pages?",
    answer: "Yes. Not every page needs the same level of attention. You might scan your homepage every 15 minutes, your pricing page hourly, and your blog daily — all managed from the same dashboard. Set a default frequency for your account, then override individual URLs that need more or less frequent checks. This gives you tight coverage on critical pages without wasting credits on low-priority ones.",
  },
  {
    question: "Where do alerts go when a change is detected?",
    answer: "All plans include dashboard alerts and email notifications. The Agency plan adds Slack and webhook alerts so your team sees changes in the tools you already use. White‑Label includes SMS for urgent notifications. You can route different alert types to different channels — for example, critical layout breaks go to Slack while routine content changes go to email.",
  },
  {
    question: "Can PageSentinel detect visual website changes like broken layouts?",
    answer: "Yes — it's one of the core features. Full-page screenshots are compared pixel-by-pixel to catch layout breaks, hidden sections, CSS regressions, and design shifts. Built-in noise reduction filters out benign differences like font smoothing variations so you only get alerted on real problems. Each alert includes a visual diff highlighting exactly what shifted, so you can see the issue at a glance.",
  },
  {
    question: "Can PageSentinel detect defacement or malicious redirects?",
    answer: "Yes. Defacement, injected links, redirect hacks, and unauthorized script tags are all detectable because they change the page's structure or content. When something that looks like tampering appears — new outbound links, unexpected redirect rules, injected content — you're alerted immediately with details on what was added or modified. This is especially valuable for agencies managing multiple client sites, where one compromised plugin can spread across your entire roster.",
  },
  {
    question: "Can I monitor competitor websites for changes?",
    answer: "PageSentinel monitors any publicly accessible URL, including competitor pages. Track pricing changes, messaging updates, new feature launches, or policy revisions across any website. Many agencies use this for competitive intelligence alongside their client monitoring. Just keep in mind that our terms of service require you to respect robots.txt and applicable laws when monitoring third-party sites.",
  },

]

export function PricingFAQ() {
  return (
    <div className="mt-20 mx-auto max-w-2xl">
      <h3 className="text-xl font-bold text-center mb-8">Frequently asked questions</h3>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
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
  )
}
