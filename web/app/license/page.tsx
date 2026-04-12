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

export default function LicensePage() {
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
          License
        </h1>
        <p className="text-sm text-[#666] mb-10">Last updated: April 13, 2026</p>

        {/* - sections - \\ */}
        <div className="flex flex-col gap-9">

          {/* - preamble - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              Preamble
            </h2>
            <p className="text-[0.85rem] text-[#888] leading-relaxed">
              This license governs the use, reproduction, adaptation, and distribution of the Atomicals
              software platform (&ldquo;the Work&rdquo;), developed and maintained by Atomicals LancarJaya
              (&ldquo;the Licensor&rdquo;). By accessing, using, copying, modifying, or distributing any
              part of this Work, you (&ldquo;the Licensee&rdquo;) agree to be fully bound by the terms
              of the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License
              (CC BY-NC-SA 4.0), as supplemented by the additional terms set forth in this document.
            </p>
            <p className="text-[0.85rem] text-[#888] leading-relaxed mt-3">
              This document is intended to provide a comprehensive and human-readable explanation of your
              rights and responsibilities under this license. To view the full legal text of the
              CC BY-NC-SA 4.0 license, visit{' '}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#aaa] underline underline-offset-2 hover:text-white transition-colors"
              >
                creativecommons.org/licenses/by-nc-sa/4.0/legalcode
              </a>.
            </p>
          </section>

          {/* - copyright - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              Copyright Notice
            </h2>
            <p className="text-[0.85rem] text-[#888] leading-relaxed">
              Copyright &copy; 2024&ndash;2026 Atomicals LancarJaya. All rights reserved under applicable
              intellectual property law, except as expressly granted below. The name &ldquo;Atomicals&rdquo;,
              the Atomicals logo, and all associated branding are trademarks of Atomicals LancarJaya and
              may not be used without prior written permission, regardless of whether the underlying code
              is used under this license.
            </p>
          </section>

          {/* - license identifier - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              License Identifier
            </h2>
            <p className="text-[0.85rem] text-[#888] leading-relaxed">
              This Work is licensed under the{' '}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#aaa] underline underline-offset-2 hover:text-white transition-colors"
              >
                Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License
              </a>
              {' '}(SPDX Identifier: CC-BY-NC-SA-4.0). This license was chosen to encourage open collaboration
              and transparency while explicitly prohibiting commercial exploitation of the Work without
              the Licensor&rsquo;s express written consent.
            </p>
          </section>

          {/* - definitions - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              Definitions
            </h2>
            <ul className="text-[0.85rem] text-[#888] leading-relaxed flex flex-col gap-3 list-none">
              <li className="flex gap-2">
                <span className="text-[#555] shrink-0">—</span>
                <span><span className="text-[#ccc]">The Work</span> — The Atomicals software platform, including but not limited to the Discord bot source code, the web dashboard source code, all configuration files, documentation, and associated assets maintained in the official repository.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#555] shrink-0">—</span>
                <span><span className="text-[#ccc]">Adapted Material</span> — Material derived from or based upon the Work including, without limitation, translations, alterations, arrangements, transformations, or other modifications.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#555] shrink-0">—</span>
                <span><span className="text-[#ccc]">Licensor</span> — Atomicals LancarJaya and any individual or entity authorized to grant rights under this license on their behalf.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#555] shrink-0">—</span>
                <span><span className="text-[#ccc]">NonCommercial</span> — Not primarily intended for, or directed towards, commercial advantage or monetary compensation. Providing a service to a Discord community for free, even if that community monetizes other aspects, does not by itself make the use commercial under this license, provided no direct revenue is generated from the Work itself.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#555] shrink-0">—</span>
                <span><span className="text-[#ccc]">Share</span> — To provide the Work to the public by any means or process that requires permission under this license.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#555] shrink-0">—</span>
                <span><span className="text-[#ccc]">Adapter&rsquo;s License</span> — The license you apply to your Adapted Material. It must be a Creative Commons license with the same License Elements as this license (BY-NC-SA 4.0, or a later compatible version).</span>
              </li>
            </ul>
          </section>

          {/* - licensed rights - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              Licensed Rights — What You May Do
            </h2>
            <p className="text-[0.85rem] text-[#888] leading-relaxed mb-3">
              Subject to the terms and conditions of this license, the Licensor grants you a worldwide,
              royalty-free, non-sublicensable, non-exclusive, irrevocable license to:
            </p>
            <ul className="text-[0.85rem] text-[#888] leading-relaxed flex flex-col gap-3 list-none">
              <li className="flex gap-2">
                <span className="text-[#555] shrink-0">—</span>
                <span><span className="text-[#ccc]">Reproduce and Share</span> — Copy and redistribute the Work in any medium or format, including downloading it, hosting mirrors, or distributing it to others, provided it is for NonCommercial purposes only.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#555] shrink-0">—</span>
                <span><span className="text-[#ccc]">Adapt</span> — Remix, transform, and build upon the Work; for example, forking the repository, modifying the source code, adding new commands, changing the UI, or integrating it into a broader system — again strictly for NonCommercial purposes.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#555] shrink-0">—</span>
                <span><span className="text-[#ccc]">Study and Learn</span> — Read, analyze, and study the source code freely for educational purposes without restriction.</span>
              </li>
            </ul>
          </section>

          {/* - conditions - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              License Conditions — What You Must Do
            </h2>
            <ul className="text-[0.85rem] text-[#888] leading-relaxed flex flex-col gap-4 list-none">
              <li className="flex gap-2">
                <span className="text-[#555] shrink-0">—</span>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[#ccc]">Attribution (BY)</span>
                  <p>If you share or adapt the Work, you must: (a) retain the original copyright notice; (b) provide a link to this license; (c) indicate whether any modifications were made; (d) include the name &ldquo;Atomicals LancarJaya&rdquo; as the original author; and (e) not imply that the Licensor endorses you or your use. Attribution may be provided in any reasonable manner, but not in a way that obscures or misrepresents authorship.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-[#555] shrink-0">—</span>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[#ccc]">NonCommercial (NC)</span>
                  <p>You may not use the Work, or any Adapted Material derived from it, for commercial purposes. This includes but is not limited to: selling the software, offering it as a paid service or SaaS product, integrating it into a product that generates revenue, or accepting donations specifically in exchange for access to the Work or Adapted Material.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-[#555] shrink-0">—</span>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[#ccc]">ShareAlike (SA)</span>
                  <p>If you produce Adapted Material, you must distribute it under an Adapter&rsquo;s License that is identical to, or compatible with, this license (CC BY-NC-SA 4.0 or a Creative Commons license with the same elements). You may not apply additional legal terms or technological measures to the Adapted Material that restrict recipients from exercising the rights granted under the Adapter&rsquo;s License.</p>
                </div>
              </li>
              <li className="flex gap-2">
                <span className="text-[#555] shrink-0">—</span>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[#ccc]">No Additional Restrictions</span>
                  <p>You may not apply legal terms or technological measures (e.g. DRM, obfuscation designed to prevent study) that legally or effectively restrict others from doing anything this license permits.</p>
                </div>
              </li>
            </ul>
          </section>

          {/* - prohibitions - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              Explicit Prohibitions
            </h2>
            <p className="text-[0.85rem] text-[#888] leading-relaxed mb-3">
              The following uses are explicitly prohibited and constitute a violation of this license, which
              automatically terminates your rights under it:
            </p>
            <ul className="text-[0.85rem] text-[#888] leading-relaxed flex flex-col gap-2 list-none">
              <li className="flex gap-2"><span className="text-[#555] shrink-0">—</span><span>Selling, sublicensing, or offering access to the Work or any derivative for monetary compensation of any form.</span></li>
              <li className="flex gap-2"><span className="text-[#555] shrink-0">—</span><span>Using the Work&rsquo;s code as the foundation for a paid bot-as-a-service, SaaS product, or commercial Discord bot marketplace listing.</span></li>
              <li className="flex gap-2"><span className="text-[#555] shrink-0">—</span><span>Removing, replacing, or misrepresenting the copyright notice, authorship attribution, or license identifier from any distributed copy of the Work.</span></li>
              <li className="flex gap-2"><span className="text-[#555] shrink-0">—</span><span>Using the &ldquo;Atomicals&rdquo; name or logo to brand a fork or derivative in a way that implies it is the official product or is endorsed by the Licensor, without express written permission.</span></li>
              <li className="flex gap-2"><span className="text-[#555] shrink-0">—</span><span>Distributing the Work or Adapted Material under a different license that removes the NonCommercial or ShareAlike conditions.</span></li>
              <li className="flex gap-2"><span className="text-[#555] shrink-0">—</span><span>Integrating this Work into a closed-source proprietary product where the source of the Adapted Material is not made available under a compatible license.</span></li>
            </ul>
          </section>

          {/* - termination - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              Termination
            </h2>
            <p className="text-[0.85rem] text-[#888] leading-relaxed">
              Your rights under this license terminate automatically upon any breach of its terms. However,
              if you cure the breach within 30 days of becoming aware of it, your rights are automatically
              reinstated — provided the breach was not willful. Rights of third parties who have received
              copies or rights from you under this license are not affected by termination of your rights.
              The Licensor may also offer the Work under separate terms at their sole discretion, and doing
              so does not waive the rights granted here to other parties.
            </p>
          </section>

          {/* - no warranty - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              Disclaimer of Warranties and Limitation of Liability
            </h2>
            <p className="text-[0.85rem] text-[#888] leading-relaxed">
              To the maximum extent permitted by applicable law, the Work is provided &ldquo;as is&rdquo; and
              &ldquo;as available&rdquo;, without any warranty of any kind, whether express or implied,
              including without limitation warranties of merchantability, fitness for a particular purpose,
              non-infringement, accuracy, or absence of errors. The Licensor does not warrant that the
              Work will meet your requirements, operate without interruption, or be free from defects.
            </p>
            <p className="text-[0.85rem] text-[#888] leading-relaxed mt-3">
              In no event shall the Licensor be liable for any direct, indirect, incidental, special,
              exemplary, or consequential damages (including but not limited to loss of data, loss of
              revenue, service interruption, Discord account termination, or platform bans) arising out
              of or in connection with the use or inability to use the Work, even if the Licensor has been
              advised of the possibility of such damages.
            </p>
          </section>

          {/* - third party - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              Third-Party Components and Dependencies
            </h2>
            <p className="text-[0.85rem] text-[#888] leading-relaxed">
              This Work incorporates third-party open-source libraries and packages. Each such component
              is governed exclusively by its own license, which may differ from this one. The inclusion
              of these components does not modify the terms under which the Work as a whole is licensed,
              nor does it grant you any additional rights over those components beyond what their
              respective licenses provide. A non-exhaustive list of key dependencies includes:
            </p>
            <ul className="text-[0.85rem] text-[#888] leading-relaxed flex flex-col gap-2 list-none mt-3">
              <li className="flex gap-2"><span className="text-[#555] shrink-0">—</span><span><span className="text-[#ccc]">discord.js</span> — Apache-2.0</span></li>
              <li className="flex gap-2"><span className="text-[#555] shrink-0">—</span><span><span className="text-[#ccc]">Next.js</span> — MIT</span></li>
              <li className="flex gap-2"><span className="text-[#555] shrink-0">—</span><span><span className="text-[#ccc]">React</span> — MIT</span></li>
              <li className="flex gap-2"><span className="text-[#555] shrink-0">—</span><span><span className="text-[#ccc]">Tailwind CSS</span> — MIT</span></li>
              <li className="flex gap-2"><span className="text-[#555] shrink-0">—</span><span><span className="text-[#ccc]">Framer Motion / Motion</span> — MIT</span></li>
              <li className="flex gap-2"><span className="text-[#555] shrink-0">—</span><span><span className="text-[#ccc]">shadcn/ui</span> — MIT</span></li>
              <li className="flex gap-2"><span className="text-[#555] shrink-0">—</span><span><span className="text-[#ccc]">pg (node-postgres)</span> — MIT</span></li>
              <li className="flex gap-2"><span className="text-[#555] shrink-0">—</span><span><span className="text-[#ccc]">TypeScript</span> — Apache-2.0</span></li>
              <li className="flex gap-2"><span className="text-[#555] shrink-0">—</span><span><span className="text-[#ccc]">Geist Font</span> — SIL Open Font License 1.1</span></li>
            </ul>
            <p className="text-[0.85rem] text-[#888] leading-relaxed mt-3">
              Atomicals LancarJaya makes no claims over third-party components and their licenses remain the
              sole intellectual property of their respective owners.
            </p>
          </section>

          {/* - contributions - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              Contributions
            </h2>
            <p className="text-[0.85rem] text-[#888] leading-relaxed">
              By submitting a pull request, patch, or any other form of contribution to this repository,
              you agree that your contribution will be licensed under the same CC BY-NC-SA 4.0 terms as
              the Work, and you grant the Licensor a perpetual, worldwide, non-exclusive, royalty-free
              right to use, reproduce, modify, and distribute your contribution as part of the Work.
              You represent that you have the right to make such a submission and that it does not
              infringe the rights of any third party.
            </p>
          </section>

          {/* - interpretation - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              Interpretation and Severability
            </h2>
            <p className="text-[0.85rem] text-[#888] leading-relaxed">
              If any provision of this license is found to be unenforceable or invalid under applicable law,
              that provision shall be reformed to the minimum extent necessary to make it enforceable, and
              the remaining provisions of the license shall continue in full force and effect. The failure
              of the Licensor to enforce any right or provision of this license shall not constitute a
              waiver of that right or provision.
            </p>
            <p className="text-[0.85rem] text-[#888] leading-relaxed mt-3">
              Ambiguities in the scope of the licensed rights shall be resolved in favor of permitting the
              use, provided the NonCommercial and ShareAlike conditions are met. However, nothing in this
              license authorizes you to make assertions to the public that imply endorsement by the Licensor.
            </p>
          </section>

          {/* - governing law - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              Governing Law
            </h2>
            <p className="text-[0.85rem] text-[#888] leading-relaxed">
              This license and any disputes arising out of or related to it shall be governed by and
              construed in accordance with the laws of the Republic of Indonesia, without regard to its
              conflict of law provisions. Any legal action or proceeding arising under this license shall
              be brought exclusively in the courts located in Indonesia.
            </p>
          </section>

          {/* - changes to license - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">
              Changes to This License Document
            </h2>
            <p className="text-[0.85rem] text-[#888] leading-relaxed">
              The Licensor reserves the right to update or amend this document at any time. An updated
              &ldquo;last updated&rdquo; date will be reflected at the top of this page. Continued use
              of the Work following any such update constitutes your acceptance of the revised terms.
              The Creative Commons license itself (CC BY-NC-SA 4.0) is a standardized legal instrument
              and is not modified by changes to this document; only the supplementary terms and
              clarifications herein may change.
            </p>
          </section>

          {/* - contact - \\ */}
          <section>
            <h2 className="text-[0.9rem] font-normal text-[#ffffff] mb-1.5">Contact and Commercial Licensing</h2>
            <p className="text-[0.85rem] text-[#888] leading-relaxed">
              If you wish to use this Work in a manner not permitted by this license &mdash; including any
              commercial use, rebranding, or use in a closed-source product &mdash; you must obtain a
              separate written license agreement from Atomicals LancarJaya prior to doing so. For all
              licensing inquiries, please contact us through the official Atomic Hub Discord server.
              Unauthorized commercial use will be treated as copyright infringement and may be pursued
              to the full extent of applicable law.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
