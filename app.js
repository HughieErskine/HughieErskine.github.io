/**
 * HUGHIE ERSKINE — SCROLLING PORTFOLIO CONTROLLER
 * Active Scroll Spy, Live VFR Calculator & One-Click Copy
 */

(function () {
  'use strict';


  // 2. Parallax Moving Hero Background on Scroll
  const backdropImg = document.getElementById('backdrop-img');
  if (backdropImg) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.pageYOffset || document.documentElement.scrollTop;
          if (scrollY < window.innerHeight * 1.8) {
            backdropImg.style.transform = `translate3d(0, ${scrollY * 0.35}px, 0)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // 3. PDF Side-Drawer Popup Controller (Takes half of the screen on the right)
  const pdfDrawer = document.getElementById('pdf-drawer');
  const pdfBackdrop = document.getElementById('pdf-backdrop');
  const pdfFrame = document.getElementById('pdf-frame');
  const pdfDrawerTitle = document.getElementById('pdf-drawer-title');
  const pdfDrawerKicker = document.getElementById('pdf-drawer-kicker');
  const pdfExternalLink = document.getElementById('pdf-external-link');
  const pdfCloseBtn = document.getElementById('pdf-close-btn');

  function openPdfDrawer(pdfUrl, title, kicker) {
    if (!pdfDrawer || !pdfUrl) return;

    if (eventDrawer && eventDrawer.classList.contains('active')) {
      closeEventDrawer();
    }

    if (pdfDrawerTitle) pdfDrawerTitle.textContent = title || 'Research Document';
    if (pdfDrawerKicker) pdfDrawerKicker.textContent = kicker || 'RESEARCH MEMO';
    if (pdfExternalLink) pdfExternalLink.href = pdfUrl;

    if (pdfFrame) {
      // Ensure iframe loads the PDF cleanly
      if (pdfFrame.getAttribute('data-loaded-src') !== pdfUrl) {
        pdfFrame.src = pdfUrl;
        pdfFrame.setAttribute('data-loaded-src', pdfUrl);
      }
    }

    pdfDrawer.classList.add('active');
    if (pdfBackdrop) pdfBackdrop.classList.add('active');
    pdfDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('pdf-drawer-open');
  }

  function closePdfDrawer() {
    if (!pdfDrawer) return;
    pdfDrawer.classList.remove('active');
    if (!eventDrawer || !eventDrawer.classList.contains('active')) {
      if (pdfBackdrop) pdfBackdrop.classList.remove('active');
      document.body.classList.remove('pdf-drawer-open');
    }
    pdfDrawer.setAttribute('aria-hidden', 'true');
  }

  // 4. Event Detail Slide-Drawer Controller (Takes half of the screen on the right)
  const eventDrawer = document.getElementById('event-drawer');
  const eventDrawerTitle = document.getElementById('event-drawer-title');
  const eventDrawerKicker = document.getElementById('event-drawer-kicker');
  const eventExternalLink = document.getElementById('event-external-link');
  const eventCloseBtn = document.getElementById('event-close-btn');
  const eventDrawerBody = document.getElementById('event-drawer-body');

  const EVENT_DETAILS = {
    'france-japan': {
      title: "France-Japan Foundation / French Bank Summer Conference.",
      kicker: "DISPATCHES & GATHERINGS • ECONOMICS",
      date: "June '26",
      tag: "ECONOMICS",
      location: "Palais Brongniart — Paris, France",
      url: "https://giannimzd.github.io/News/FFJ_BDF_SC/ffj_lab_summer_conference.html",
      urlLabel: "POP OUT",
      author: "Gianni Mazaud",
      customHtml: `
        <p>
          I had the chance to attend the 2026 summer conference of the France-Japan Foundation and Banque de France, which
          took place at the Palais Brongniart in Paris. This year's topic was "Global Imbalances: (Un)learned Lessons from the Japanese Experience".
        </p>

        <figure class="event-article-figure">
          <img src="assets/events/view.jpg" onerror="this.onerror=null; this.src='https://giannimzd.github.io/News/FFJ_BDF_SC/view.jpg'" alt="View from the Palais Brongniart" />
          <figcaption>View from the Palais Brongniart.</figcaption>
        </figure>

        <p>
          As it was emphasized several times during the conference, Japan is an economy with profound historical experience managing
          global imbalances, notably the "lost decades." Throughout the event, different perspectives were explored from
          both Japanese and French economists and policymakers.
        </p>

        <figure class="event-article-figure">
          <img src="assets/events/conference.jpg" onerror="this.onerror=null; this.src='https://giannimzd.github.io/News/FFJ_BDF_SC/conference.jpg'" alt="conference view" />
        </figure>

        <h2>The Return of Global Imbalances &amp; The Plaza Accord &mdash; Takeo Hoshi</h2>
        <p>
          Global imbalances have definitively returned, and the scope extends far beyond simple trade competition.
          Technically speaking, global imbalances can be defined as the sum of the absolute values of each economy's
          current account deficit and surplus.
        </p>

        <figure class="event-article-figure">
          <img src="assets/events/imbalances.jpg" onerror="this.onerror=null; this.src='https://giannimzd.github.io/News/FFJ_BDF_SC/imbalances.jpg'" alt="imbalances graph" />
        </figure>

        <p>
          The Plaza Accord is a crucial shift in economic policy that occurred in 1985. During that period, Reagan's
          fiscal expansion paired with Volcker's disinflation (highlighting that interest rates alone cannot resolve
          the issue, but are part of the process) led to a remarkably strong dollar and surging protectionist pressure.
          The Accord implied a dollar depreciation, which reduced protectionist pressure and created room for
          political adjustments and domestic structural reforms, with the ultimate goal of lowering global imbalances.
        </p>
        <p>
          While the immediate and short-term objectives were achieved, the longer-term objectives proved more complicated.
          The agreement couldn't fundamentally halt the increase in the US saving rate or Japanese demand.
          The outcomes are perceived completely differently:
        </p>
        <ul>
          <li><strong>Japan:</strong> The appreciation of the yen severely damaged competitiveness, leading to economic stagnation and what is now known as the "lost decades."</li>
          <li><strong>United States:</strong> The outcomes were largely viewed as desired.</li>
        </ul>
        <p>
          Ultimately, US pressure led to yen appreciation, which prompted Japanese monetary easing to resist it. This
          easing fueled a bubble economy that inevitably burst, leading to the lost decades. Generally, the easing
          policies are forgotten in what caused this economic event.
        </p>

        <h2>How the Landscape Has Changed (1985-2000 vs. Today)</h2>
        <p>
          The global paradigm has shifted significantly since the Plaza Accord era. The principal surplus country is
          no longer Japan, but China. Furthermore, there is substantially less trust in multilateral rules today. What
          used to be primarily an economic rivalry has now evolved into a geopolitical and economic rivalry.
        </p>

        <h2>Structural Adjustments &amp; Macroeconomic Modeling &mdash; Kazumasa Iwata</h2>
        <p>
          Borrowing from abroad was modeled by K. Iwata as a function of the labor growth rate, technological
          progress, and the national saving rate. Notably, total factor productivity is expected to begin decreasing
          globally by 2035.
        </p>

        <figure class="event-article-figure">
          <img src="assets/events/Model.jpg" onerror="this.onerror=null; this.src='https://giannimzd.github.io/News/FFJ_BDF_SC/Model.jpg'" alt="equation model" />
        </figure>

        <p>
          Effective structural adjustments must be made by some countries to correct these imbalances:
        </p>
        <ul>
          <li><strong>China:</strong> Needs to shift toward more domestic consumption.</li>
          <li><strong>United States:</strong> Must focus on better public finances and reducing deficits.</li>
          <li><strong>Europe:</strong> Requires more productive investment. (Currently, the core issue with EU investments isn't the percentage of investment, but its composition, exacerbated by capital markets that remain fragmented across member states).</li>
        </ul>
        <p>
          If debt reaches levels perceived as unsustainable, financial markets will force abrupt, painful adjustments.
          Tariffs and industrial policies are largely ineffective tools for rebalancing these global imbalances. With
          foreign exchange (Forex) markets now driven 90% by speculative trading and only 10% by real transactions,
          orderly adjustments require radical transparency. Transparency enables the proper functioning of markets to
          quantify and price risks accurately.
        </p>

        <h2>Japan's Path Forward: "Sanaenomics" &mdash; Takuji Aida</h2>
        <p>
          Has Japan finally exited its "lost decades"? While there is a nominal GDP (NGDP) expansion, structural
          stagnating pressures remain. For instance, the corporate saving rate should theoretically be below zero for
          heavy investment, but it remains above zero in Japan, indicating the transition isn't complete.
        </p>
        <p>
          The path forward is being framed around <strong>Sanaenomics</strong>, which marks a transition from a cost-cutting
          model to an investment growth model. Key pillars include:
        </p>
        <ul>
          <li>Strategic investments.</li>
          <li>Creating a "high pressure economy" by shifting the output gap target from a low-pressure 0% to a high-pressure 2%.</li>
        </ul>
        <p>
          Currently, the CAPEX cycle is shifting upward, and corporate net debt has disappeared. While the
          debt structure is resilient, it still needs to be reduced, though the fiscal situation is improving
          alongside rising NGDP.
        </p>

        <h2>Global Imbalances Nowadays &mdash; Xavier Debrun</h2>
        <p>
          China's economic structure intrinsically enables imbalances, and this will likely continue with the
          integration of AI. China currently has little room for economic stimulus due to military spending and
          existing deficits. Furthermore, AI adoption in China is heavily focused on manufacturing and automation,
          which does little to boost domestic consumption, and may even harm it.
        </p>
        <p>
          Globally, imbalances are currently driven more by saving rates than by investment. Right now, there are more
          trade surpluses globally than deficits (oil exporters, for instance, generally run persistent trade
          surpluses). High and persistent imbalances are dangerous because flows eventually accumulate into stocks,
          creating a snowball effect.
        </p>
        <p>
          On the European front, U.S. tariffs have, on average, no real directional impact on the EU. The effect is
          not K-shaped; rather, tariffs simply lower both exports and imports, acting more as a substitute to a VAT increase.
        </p>
      `
    },
    'vivatech': {
      title: "First Time at VivaTech Paris",
      kicker: "DISPATCHES & GATHERINGS • TECH & FINANCE",
      date: "June '26",
      tag: "TECH",
      location: "Paris Expo Porte de Versailles — Paris, France",
      url: "https://giannimzd.github.io/News/Vivatech/vivatech_26.html",
      urlLabel: "POP OUT",
      author: "Gianni Mazaud",
      customHtml: `
        <p>
          Last week, I had the opportunity to attend <a href="https://vivatechnology.com/" target="_blank" rel="noopener noreferrer">VivaTech Paris</a>
          for the first time. As Europe's biggest tech event, the atmosphere at Paris Expo was incredibly innovative.
          Coming from a finance background, I was curious about discovering what innovations are made in other industries.
        </p>

        <p>
          I spent most of the time attending conferences at the different stages and the theater.
        </p>

        <h2>Day one</h2>
        <p>
          I landed in Paris on June 18th in the morning, so I went to the event only in the afternoon.
          I briefly explored the different stages and barely saw President Macron.
        </p>

        <h2>Day two</h2>
        <p>
          On June 19th I started with a small conference at the <strong>Airbus stand about the future of aviation</strong>.
          The talk covered foldable wings, zeroE program which aims at doing electric flight without
          batteries but hydrogen, and lastly the implications of AI in the industry. The presentation showed
          us what the future of user flight experience could look like with for instance your seat screen
          recognizing you and recommending you things based on previous travel, movies watched… But it also
          helps for MRO (Maintenance, Repairs &amp; Operations), like predicting a failure and early organizing the
          maintenance.
        </p>

        <figure class="event-article-figure">
          <img src="assets/events/IMG_6642.jpg" onerror="this.onerror=null; this.src='https://giannimzd.github.io/News/Vivatech/IMG_6642.jpg'" alt="Airbus stand at VivaTech" />
          <figcaption>The Airbus stand.</figcaption>
        </figure>

        <p>
          After that I attended a round table about <strong>the sovereignty (on European scale) of tech and AI</strong>.
          There was the former minister of AI and now French Ambassador to the EU Clara Chappaz, the CEO of ScaleWay
          and the COO of Proton. It was an interesting topic given that we currently see the U.S. restricting the
          access to some of their technology. They went through this new trend in Europe to build our own chips here
          to reduce dependency. The core idea was to see Europe as an important actor in the AI and tech world thanks
          to its regulation. While we often criticize EU regulations, they depicted another point of view. If you go
          to US tech products, you have no guarantee that you will have access to it at all times and that your data
          won't be sent to government or U.S. institutions. Europe brings that and we should capitalize on this to
          spread and sell our products to people that want safe and independent products.
        </p>

        <p>
          After that talk, I joined the theater to attend the conference of Cameron Fink, co-founder of Aaru. He
          talked little about his company but more about his experience so far and our world today. There is one thing
          he mentioned that kept my attention. There is a popular trend among entrepreneurs (and not only) to trash
          universities as outdated and useless. Cameron Fink offered an interesting view of the matter saying: &ldquo;if
          you don't know what you want to do, college/uni is the best place to go&rdquo;.
        </p>

        <figure class="event-article-figure">
          <img src="assets/events/IMG_6652.jpg" onerror="this.onerror=null; this.src='https://giannimzd.github.io/News/Vivatech/IMG_6652.jpg'" alt="Conference at VivaTech theater" />
          <figcaption>Cameron Fink at the VivaTech theater.</figcaption>
        </figure>

        <p>
          Then, Emmanuel Moulin, the new Governor of the Bank of France came to give a short speech about the
          future of money and especially euros (&euro;). His view is that we are going to have digitalization of
          traditional fiat currency. It will bring two changes to the payment system: the use of cash will (and has
          already started to) decrease, and the digitalization of financial assets will take place. Tokenization in
          the institution is seen as the next step in monetary markets. This implies that no intermediary will be
          involved, which will significantly reduce costs. However, this comes with some risks. A main one is the risk
          of dependency to a no-&euro; system.<br />
          The Bank of France sees itself as a catalyst, not a substitute. Bank deposits need to enter the digital
          world. In a nutshell: &ldquo;the future of the euro is in code&rdquo;.
        </p>

        <figure class="event-article-figure">
          <img src="assets/events/IMG_6661.jpg" onerror="this.onerror=null; this.src='https://giannimzd.github.io/News/Vivatech/IMG_6661.jpg'" alt="Conference at VivaTech theater" />
          <figcaption>Emmanuel Moulin giving his speech.</figcaption>
        </figure>

        <h2>Last day</h2>

        <p>
          The main event of the last day was the conference of Thomas Pesquet, a French astronaut (spationaut in
          French ahah). Several topics came out, the first one was about his first extravehicular activity, the first
          liftoff, and also the challenges to go to Mars.<br />
          To him, the main challenge about going far beyond the Earth orbit (like lunar missions) is about the time it
          takes. Pesquet explained a mission to Mars takes about 300 days to get there, 300 days on-site, and 300
          days to return. Spending that much time so far seems more like a psychological issue at this point. He
          explained the importance of travelling faster.
        </p>

        <figure class="event-article-figure">
          <img src="assets/events/IMG_6719.jpg" onerror="this.onerror=null; this.src='https://giannimzd.github.io/News/Vivatech/IMG_6719.jpg'" alt="Conference at VivaTech theater" />
          <figcaption>Thomas Pesquet on stage.</figcaption>
        </figure>
      `
    },
    'financial-risks': {
      title: "19th Financial Risks International Forum.",
      kicker: "DISPATCHES & GATHERINGS • ECONOMICS",
      date: "March '26",
      tag: "ECONOMICS",
      location: "Palais Brongniart — Paris, France",
      url: "https://giannimzd.github.io/News/Financial-risk-forum/financial-risk-forum.html",
      urlLabel: "POP OUT",
      author: "Gianni Mazaud",
      customHtml: `
        <p>
          I recently attended the <a href="https://www.risks-forum.org" target="_blank" rel="noopener noreferrer">19th Financial Risks International Forum</a>
          which took place at the Palais Brongniart in Paris.
          This year’s edition notably focused on AI and the risks associated with it.
        </p>

        <figure class="event-article-figure">
          <img src="assets/events/frf-room.jpg" onerror="this.onerror=null; this.src='https://giannimzd.github.io/News/Financial-risk-forum/room.jpg'" alt="Salon d'honneur" />
          <figcaption>Salon d'honneur.</figcaption>
        </figure>

        <p>
          The forum opened with an address from the Chair of the AMF (Autorité des marchés financiers), 
          who shaped the second day notably around AI: used properly, AI allows regulators 
          and market participants to detect risks earlier and with far more precision than traditional 
          tools could. She walked through how AI is now embedded across financial institutions, 
          from asset managers automating parts of the investment process relying on 
          models for real-time transaction monitoring. Retail investors were also part of the speech, 
          with AI-driven research tools and chatbots becoming part of the everyday 
          investing experience, which raises the question of how well individuals actually understand the 
          tools guiding their decisions.
        </p>

        <p>
          She was equally direct about the issues this shift creates. Governance, model transparency, 
          data protection and systemic risk were enumerated as four areas regulators need to watch more 
          closely as AI adoption accelerates. Because so many market participants may end up relying 
          on similar models trained on similar data, decisions could become more correlated across the 
          market, amplifying moves during periods of stress rather than absorbing them.
        </p>

        <p>
          On the supervisory side, she described how AI is already changing the AMF's own toolbox. 
          Machine learning is used to process and analyze far larger volumes of market data than before, 
          helping detect market abuse, filter out false positives, and identify malicious websites and 
          fraud schemes targeting retail investors (tasks that would be extremely time-consuming to carry 
          out manually). She referenced a recent survey showing that around 90% of market participants 
          already use AI, or plan to adopt it, a figure that illustrates how 
          quickly the technology has moved from experimentation to becoming a standard part of the toolbox.
        </p>    

        <h2>AI and the Integrity of knowledge</h2>

        <p>
          Several interconnected traps threatening the reliability of AI-driven knowledge were emphasized. 
          The epistemic trap arises when models trained on AI-generated outputs degrade accuracy through feedback 
          loops, while the homogenization trap flattens the diversity of thought as organizations converge on 
          the same few large language models. The infrastructure trap compounds these risks: with cloud platforms
          dominated by three hyperscalers, AI accelerators controlled by NVIDIA, and semiconductor lithography 
          monopolized by ASML, financial institutions face dangerous dependency on Big Tech. Meanwhile, the 
          information trap makes verification prohibitively expensive (in a world where AI can generate plausible 
          content at scale, the burden of fact-checking falls on human experts, and flawed AI-generated papers 
          can slip through peer review undetected).
        </p>

        <figure class="event-article-figure">
          <img src="assets/events/frf-conference.jpg" onerror="this.onerror=null; this.src='https://giannimzd.github.io/News/Financial-risk-forum/conference.jpg'" alt="AI and the Integrity of knowledge" />
          <figcaption>AI and the Integrity of knowledge.</figcaption>
        </figure>

        <p>
          At the core of these concerns lies a single issue: using AI as a substitute for human judgment 
          rather than as a tool to augment it. The speaker emphasized that LLMs may read faster, but speed does 
          not equal understanding or accuracy. Data is just as important: firms are overwhelmed with information, 
          but using bad or biased data in models gives false risk results. Ensuring the integrity of knowledge 
          in an AI-driven world will require stronger governance, diversified infrastructure, and a renewed 
          commitment to human expertise as the final arbiter of truth.
        </p>

        <h2>Round Table: Hidden Risks in AI and pricing models</h2>

        <p>
          This round table, I found particularly interesting, focused on several subjects, especially keeping humans 
          in the loop for AI-driven risk management. The speakers agreed that only humans can truly interpret meaning 
          and context (especially in high-stakes processes like systemic risk monitoring) where a single wrong call 
          can have cascading effects. They also stressed that humans must validate the data fed into models, since 
          the assumption that observations are independent and identically distributed (i.i.d.) is almost never true 
          in real financial markets.
        </p>

        <p>
          The panel also warned against conflating volume with value. It is cheap to produce information but costly to 
          verify it. AI can generate endless content, but that does not make it knowledge. As one speaker put it: 
          information that proliferates is not knowledge. In risk management, distinguishing between the two is essential.
        </p>
      `
    }
  };

  function openEventDrawer(eventId) {
    const data = EVENT_DETAILS[eventId];
    if (!eventDrawer || !data) return;

    if (pdfDrawer && pdfDrawer.classList.contains('active')) {
      closePdfDrawer();
    }

    if (eventDrawerTitle) eventDrawerTitle.textContent = data.title;
    if (eventDrawerKicker) eventDrawerKicker.textContent = data.kicker;

    if (eventExternalLink) {
      if (data.url) {
        eventExternalLink.href = data.url;
        const linkSpan = eventExternalLink.querySelector('span:first-child');
        if (linkSpan) linkSpan.textContent = data.urlLabel || 'VISIT';
        eventExternalLink.style.display = 'inline-flex';
      } else {
        eventExternalLink.style.display = 'none';
      }
    }

    if (eventDrawerBody) {
      if (data.customHtml) {
        eventDrawerBody.innerHTML = `
          <div class="event-drawer-meta-bar">
            <span class="event-drawer-meta-pill pill-date">${data.date}</span>
            <span class="event-drawer-meta-pill pill-tag">${data.tag}</span>
            <span class="event-drawer-meta-pill">${data.location}</span>
          </div>

          <h2 class="event-drawer-main-title font-sans">${data.title}</h2>

          <div class="event-article">
            ${data.customHtml}
          </div>

          <div class="event-article-footer font-mono">
            ${data.author || 'Gianni Mazaud'} &bull; ${data.date}
          </div>
        `;
      } else {
        eventDrawerBody.innerHTML = `
          <div class="event-drawer-meta-bar">
            <span class="event-drawer-meta-pill pill-date">${data.date}</span>
            <span class="event-drawer-meta-pill pill-tag">${data.tag}</span>
            <span class="event-drawer-meta-pill">${data.location}</span>
          </div>

          <h2 class="event-drawer-main-title font-sans">${data.title}</h2>

          <p class="event-drawer-lead">${data.lead}</p>

          <div class="event-drawer-section-heading font-mono">${data.sectionTitle}</div>

          <ul class="event-drawer-points font-sans">
            ${data.points.map(pt => `
              <li class="event-drawer-point-item">
                <strong>${pt.heading}:</strong> ${pt.desc}
              </li>
            `).join('')}
          </ul>

          ${data.callout ? `
            <div class="event-drawer-callout font-sans">
              <strong>${data.callout.title} —</strong> ${data.callout.desc}
            </div>
          ` : ''}
        `;
      }
    }

    eventDrawer.classList.add('active');
    if (pdfBackdrop) pdfBackdrop.classList.add('active');
    eventDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('pdf-drawer-open');
  }

  function closeEventDrawer() {
    if (!eventDrawer) return;
    eventDrawer.classList.remove('active');
    if (!pdfDrawer || !pdfDrawer.classList.contains('active')) {
      if (pdfBackdrop) pdfBackdrop.classList.remove('active');
      document.body.classList.remove('pdf-drawer-open');
    }
    eventDrawer.setAttribute('aria-hidden', 'true');
  }

  // Bind all clickable essays (PDF Drawer)
  const clickableEssays = document.querySelectorAll('.essay-clickable');
  clickableEssays.forEach((item) => {
    const handleTrigger = (e) => {
      // Don't trigger if user clicked an external link inside
      if (e.target.tagName.toLowerCase() === 'a' && e.target !== item) return;
      const pdfUrl = item.getAttribute('data-pdf');
      const title = item.getAttribute('data-title');
      const kicker = item.getAttribute('data-kicker');
      if (pdfUrl) {
        openPdfDrawer(pdfUrl, title, kicker);
      }
    };

    item.addEventListener('click', handleTrigger);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleTrigger(e);
      }
    });
  });

  // Bind all clickable events (Event Detail Drawer)
  const clickableEvents = document.querySelectorAll('.event-clickable');
  clickableEvents.forEach((item) => {
    const handleTrigger = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' && e.target !== item) return;
      const eventId = item.getAttribute('data-event-id');
      if (eventId) {
        openEventDrawer(eventId);
      }
    };

    item.addEventListener('click', handleTrigger);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleTrigger(e);
      }
    });
  });

  if (pdfCloseBtn) {
    pdfCloseBtn.addEventListener('click', closePdfDrawer);
  }

  if (eventCloseBtn) {
    eventCloseBtn.addEventListener('click', closeEventDrawer);
  }

  if (pdfBackdrop) {
    pdfBackdrop.addEventListener('click', () => {
      closePdfDrawer();
      closeEventDrawer();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (pdfDrawer && pdfDrawer.classList.contains('active')) closePdfDrawer();
      if (eventDrawer && eventDrawer.classList.contains('active')) closeEventDrawer();
    }
  });

  // Handle direct hash navigation to open drawer
  function checkHashForPdfOrEvent() {
    if (window.location.hash) {
      const hash = window.location.hash;
      const essayTarget = document.querySelector(`.essay-clickable${hash}`);
      if (essayTarget) {
        const pdfUrl = essayTarget.getAttribute('data-pdf');
        const title = essayTarget.getAttribute('data-title');
        const kicker = essayTarget.getAttribute('data-kicker');
        if (pdfUrl) openPdfDrawer(pdfUrl, title, kicker);
        return;
      }

      const eventTarget = document.querySelector(`.event-clickable${hash}`);
      if (eventTarget) {
        const eventId = eventTarget.getAttribute('data-event-id');
        if (eventId) openEventDrawer(eventId);
      }
    }
  }

  checkHashForPdfOrEvent();
  window.addEventListener('hashchange', checkHashForPdfOrEvent);

  // Live QNH Fetcher for Trébeurden (LFRO - Lannion / Servel)
  (function updateTrebeurdenQNH() {
    const qnhEl = document.getElementById('colophon-qnh');
    if (!qnhEl) return;
    try {
      fetch('https://aviationweather.gov/api/data/metar?ids=LFRO&format=json')
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data[0] && data[0].altim) {
            qnhEl.textContent = `${data[0].altim} hPa`;
          }
        })
        .catch(() => {});
    } catch (e) {}
  })();

})();
