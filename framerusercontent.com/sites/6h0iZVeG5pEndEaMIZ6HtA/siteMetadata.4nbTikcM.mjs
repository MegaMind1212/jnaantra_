import{__esmMin as e}from"./rolldown-runtime.DUQjXqPR.mjs";function t(e,t){return{customHTMLBodyEnd:`<!-- Capture the query params and route to target links -->
<script>
(function () {
  const STORAGE_KEY = "stacker_query_params";
  const TARGET_HOSTS = new Set(["go.stackerhq.com", "playground.ai.stackerhq.com"]);

  // Parse query string into an object
  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const obj = {};
    for (const [key, value] of params.entries()) obj[key] = value;
    return obj;
  }

  // Persist current params if any
  const currentParams = getQueryParams();
  if (Object.keys(currentParams).length > 0) {
    console.log("Capturing Query Params ✅");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentParams));
  }

  // Load stored params (if any)
  const savedParams = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

  function isTargetHost(u) {
    try {
      return TARGET_HOSTS.has(new URL(u, location.origin).host);
    } catch {
      return false;
    }
  }

  // Append saved params to target links
  function restoreParams() {
    if (Object.keys(savedParams).length === 0) return;

    // Query for both absolute and relative hrefs; filter by host via URL()
    document.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      if (!isTargetHost(href)) return;

      try {
        const url = new URL(href, location.origin);
        const merged = new URLSearchParams(url.search);
        for (const [key, value] of Object.entries(savedParams)) {
          if (!merged.has(key)) merged.set(key, value);
        }
        const mergedStr = merged.toString();
        if (url.search !== (mergedStr ? \`?\${mergedStr}\` : "")) {
          const updated = \`\${url.origin}\${url.pathname}\${mergedStr ? \`?\${mergedStr}\` : ""}\${url.hash}\`;
          if (link.href !== updated) {
            console.log("Updating link:", link.href, "→", updated);
            link.href = updated;
          }
        }
      } catch (e) {
        console.warn("Invalid URL in link:", href);
      }
    });
  }

  // Run restore repeatedly to catch SPA/late DOM updates
  function runRestoreLoop() {
    if (Object.keys(savedParams).length === 0) return;
    let attempts = 0;
    const interval = setInterval(() => {
      restoreParams();
      attempts++;
      if (attempts >= 50) {
        clearInterval(interval);
        console.log("Stopped restoring after 5s ⏹️");
      }
    }, 100);
  }

  // --- Hook into SPA navigation ---
  const origPushState = history.pushState;
  history.pushState = function () {
    origPushState.apply(this, arguments);
    runRestoreLoop();
  };

  const origReplaceState = history.replaceState;
  history.replaceState = function () {
    origReplaceState.apply(this, arguments);
    runRestoreLoop();
  };

  window.addEventListener("popstate", runRestoreLoop);

  // Initial run
  runRestoreLoop();
})();
<\/script>
<!-- End -->

<!-- Capture the prompt and append it to target links on click -->
<script>
(function () {
  const TARGET_HOSTS = new Set(["go.stackerhq.com", "playground.ai.stackerhq.com"]);

  function isTargetHost(u) {
    try {
      return TARGET_HOSTS.has(new URL(u, location.origin).host);
    } catch {
      return false;
    }
  }

  document.addEventListener("click", function (e) {
    const anchor = e.target.closest("a[href]");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (!isTargetHost(href)) return;

    const textarea = document.querySelector("textarea[name='prompt']");
    if (!textarea) return;

    const inputValue = textarea.value || "";
    if (!inputValue) return; // skip if empty

    try {
      const url = new URL(href, location.origin);
      // Let URLSearchParams handle encoding; avoid double-encoding
      url.searchParams.set("prompt", inputValue);
      anchor.href = url.toString();
    } catch (err) {
      console.warn("Failed to set prompt on URL:", href);
    }
  });
})();
<\/script>
<!-- End -->`,customHTMLBodyStart:`<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NGM6QCLH" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`,customHTMLHeadEnd:`<script>
function updateStackerLinks() {
    const currentQueryString = window.location.search;
    const links = document.querySelectorAll('a[href*="get.stackerhq.com"]');
    links.forEach(link => {
        const url = new URL(link.href);
        url.search = currentQueryString;
        link.href = url.toString();
    });
}

(function(history) {
    const pushState = history.pushState;
    history.pushState = function(state, title, url) {
        const result = pushState.apply(history, arguments);
        window.dispatchEvent(new Event('pushState'));
        return result;
    };
    window.addEventListener('pushState', function() {
        setTimeout(updateStackerLinks, 100);
    });
})(window.history);

document.addEventListener('DOMContentLoaded', updateStackerLinks);
<\/script>
<!-- PostHog -->
<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init Fe Us zs Oe js Ns capture Ze calculateEventProperties Hs register register_once register_for_session unregister unregister_for_session Js getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Gs Bs createPersonProfile Vs As Ks opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing qs debug L Ws getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('phc_pZiCNB4KJQtDpXqy4GIanJhmXUWtq5zmFAMzprTImcN', {
        api_host: 'https://us.i.posthog.com',
        defaults: '2025-05-24',
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
        session_recording: {
        maskAllInputs: false,
        },
    })
<\/script>
`,customHTMLHeadStart:`<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '24726959073603598');
fbq('track', 'PageView');
<\/script>
<noscript></noscript>`,description:`Stacker is the software system for a modern business to run on. Create a software to power your operations like CRMs, internal tools, customer portals and other business applications for your team`,favicon:`https://framerusercontent.com/assets/ZkaoYs9FCuHyweiy1Y668X7UN8M.svg`,robots:`max-image-preview:large`,socialImage:`https://framerusercontent.com/assets/MadUVRpSKQeWWvraVN4A6dkwL0s.svg`,title:`Stacker | Software that's as unique as your business`}}var n=e((()=>{}));export{n as init_siteMetadata,t as metadata};
//# sourceMappingURL=siteMetadata.4nbTikcM.mjs.map