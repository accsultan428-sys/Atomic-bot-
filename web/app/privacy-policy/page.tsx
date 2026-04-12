/*
 * Atomicals Bot for Discord
 * Copyright (C) 2026 Atomicals LancarJaya
 *
 * Licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * You may not use this file except in compliance with the License.
 * See the LICENSE file for more information.
 */

'use client'

import { useRouter } from 'next/navigation'
import { GeistSans } from 'geist/font/sans'

export default function PrivacyPolicyPage() {
  const router = useRouter()

  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-[#ededed] ${GeistSans.className}`} style={{ letterSpacing: '-0.01em' }}>
      <div className="max-w-2xl mx-auto px-6 py-12 sm:py-16">

        {/* - back link - \\ */}
        <button
          onClick={() => router.back()}
          className="text-base text-[#888] hover:text-[#ccc] transition-colors mb-10 flex items-center gap-1.5"
        >
          ← Back
        </button>

        {/* - page title - \\ */}
        <h1 className="text-[1.5rem] sm:text-[1.75rem] font-normal text-[#ffffff] mb-3 leading-tight" style={{ letterSpacing: '-0.01em' }}>
          Privacy Policy
        </h1>
        <p className="text-sm text-[#666] mb-10">Last updated: April 13, 2026</p>


        {/* - sections - \\ */}
        <div className="flex flex-col gap-9">

          {/* - overview - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              Overview
            </h2>
            <p className="text-[0.85rem] text-[#888] leading-relaxed">
              Atomicals LancarJaya (&ldquo;Atomic&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) is committed to protecting your privacy.
              This Privacy Policy explains what information we collect, how we use it, and what rights
              you have in relation to it when you use our Discord bot, web dashboard, or any related services.
            </p>
          </section>

          {/* - information we collect - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              Information We Collect
            </h2>
            <ul className="text-[0.85rem] text-[#888] leading-relaxed flex flex-col gap-3 list-none">
              <li className="flex gap-2">
                <span className="text-[#555] shrink-0">—</span>
                <span>
                  <span className="text-[#ccc]">Discord User Data</span> — When you authenticate via Discord OAuth2,
                  we collect your Discord user ID, username, and avatar hash. This is used solely to identify
                  your account within our services.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#555] shrink-0">—</span>
                <span>
                  <span className="text-[#ccc]">Server Data</span> — Our bot may store guild IDs, channel IDs,
                  role IDs, and configuration settings to provide its functionality. No message content is stored
                  unless explicitly required by a specific feature (e.g. ticket transcripts).
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#555] shrink-0">—</span>
                <span>
                  <span className="text-[#ccc]">Form Submissions</span> — Data submitted through staff application
                  or other forms is stored in our secure database and is only accessible to authorized reviewers.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#555] shrink-0">—</span>
                <span>
                  <span className="text-[#ccc]">Device Fingerprint</span> — A non-reversible device fingerprint
                  may be stored to prevent fraudulent form submissions. It does not identify you personally and
                  cannot be used to track you outside of our service.
                </span>
              </li>
            </ul>
          </section>

          {/* - how we use information - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              How We Use Your Information
            </h2>
            <ul className="text-[0.85rem] text-[#888] leading-relaxed flex flex-col gap-2 list-none">
              <li className="flex gap-2"><span className="text-[#555] shrink-0">—</span><span>To operate and maintain our Discord bot and web dashboard.</span></li>
              <li className="flex gap-2"><span className="text-[#555] shrink-0">—</span><span>To process and review staff applications and other form submissions.</span></li>
              <li className="flex gap-2"><span className="text-[#555] shrink-0">—</span><span>To prevent abuse, duplicate submissions, and fraudulent activity.</span></li>
              <li className="flex gap-2"><span className="text-[#555] shrink-0">—</span><span>To authenticate you securely via Discord OAuth2 sessions.</span></li>
            </ul>
          </section>

          {/* - data retention - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              Data Retention
            </h2>
            <p className="text-[0.85rem] text-[#888] leading-relaxed">
              We retain your data only for as long as necessary to provide our services. Server configuration
              data is removed when our bot is removed from a server. Form submission data may be retained for
              internal review purposes and is deleted upon request. Session data expires automatically after
              a short inactivity period.
            </p>
          </section>

          {/* - sharing - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              Data Sharing
            </h2>
            <p className="text-[0.85rem] text-[#888] leading-relaxed">
              We do not sell, rent, or share your personal data with any third parties for marketing or
              commercial purposes. Data may only be shared with authorized internal staff who operate
              the Atomic Hub platform, solely for the purpose of reviewing applications or resolving
              support requests.
            </p>
          </section>

          {/* - your rights - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              Your Rights
            </h2>
            <p className="text-[0.85rem] text-[#888] leading-relaxed">
              You have the right to request access to, correction of, or deletion of any personal data we
              hold about you. To exercise these rights, please contact us through the official Atomic Hub
              Discord server. We will respond to your request within a reasonable timeframe.
            </p>
          </section>

          {/* - security - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              Security
            </h2>
            <p className="text-[0.85rem] text-[#888] leading-relaxed">
              We take reasonable technical measures to protect your data from unauthorized access, disclosure,
              or loss. However, no method of transmission over the internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* - changes - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              Changes to This Policy
            </h2>
            <p className="text-[0.85rem] text-[#888] leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be reflected on this page
              with an updated date. Continued use of our services after any changes constitutes your
              acceptance of the revised policy.
            </p>
          </section>

          {/* - contact - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">Contact</h2>
            <p className="text-[0.85rem] text-[#888] leading-relaxed">
              If you have any questions or concerns about this Privacy Policy or how your data is handled,
              please reach out to us through the official Atomic Hub Discord server.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
