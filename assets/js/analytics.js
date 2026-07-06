(function () {
  'use strict';

  function track(eventName, parameters) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, parameters || {});
  }

  function cleanText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim().slice(0, 100);
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href]');
    if (!link) return;

    var url;
    try {
      url = new URL(link.href, window.location.href);
    } catch (_) {
      return;
    }

    var text = cleanText(link.textContent) || cleanText(link.getAttribute('aria-label'));
    var parameters = {
      link_text: text,
      link_url: url.href,
      link_domain: url.hostname,
      page_location: window.location.href
    };

    track('link_click', parameters);

    if (/schedule\.html|calendar\.app\.google/i.test(url.href)) {
      track('schedule_click', parameters);
    }
    if (/thefinancialhq\.com\/comra-RRE/i.test(url.href)) {
      track('risk_analysis_click', parameters);
    }
    if (/youtube\.com\/@RetirementRoadmapExperts/i.test(url.href)) {
      track('podcast_click', parameters);
    }
    if (/\.pdf(?:$|[?#])/i.test(url.href) || link.hasAttribute('download')) {
      track('resource_download_click', parameters);
    }
  });

  document.addEventListener('submit', function (event) {
    var form = event.target;
    if (!(form instanceof HTMLFormElement)) return;

    track('generate_lead', {
      form_id: form.id || 'unnamed_form',
      form_name: form.getAttribute('name') || form.id || 'unnamed_form',
      page_location: window.location.href
    });
  });

  var scrollMilestones = [25, 50, 75, 90];
  var reachedMilestones = {};
  function trackScrollDepth() {
    var documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    var viewportBottom = window.scrollY + window.innerHeight;
    var percentage = Math.min(100, Math.round((viewportBottom / documentHeight) * 100));

    scrollMilestones.forEach(function (milestone) {
      if (percentage >= milestone && !reachedMilestones[milestone]) {
        reachedMilestones[milestone] = true;
        track('scroll_depth', {
          percent_scrolled: milestone,
          page_location: window.location.href
        });
      }
    });
  }
  window.addEventListener('scroll', trackScrollDepth, { passive: true });
  window.addEventListener('load', trackScrollDepth);

  document.querySelectorAll('video').forEach(function (video, index) {
    var label = video.id || video.getAttribute('aria-label') || ('video_' + (index + 1));
    var milestones = {};

    video.addEventListener('play', function () {
      track('video_start', { video_title: label, video_url: video.currentSrc || video.src });
    }, { once: true });

    video.addEventListener('timeupdate', function () {
      if (!video.duration || !isFinite(video.duration)) return;
      var percentage = Math.floor((video.currentTime / video.duration) * 100);
      [25, 50, 75].forEach(function (milestone) {
        if (percentage >= milestone && !milestones[milestone]) {
          milestones[milestone] = true;
          track('video_progress', {
            video_title: label,
            video_url: video.currentSrc || video.src,
            video_percent: milestone
          });
        }
      });
    });

    video.addEventListener('ended', function () {
      track('video_complete', { video_title: label, video_url: video.currentSrc || video.src });
    });

    video.addEventListener('volumechange', function () {
      if (!video.muted && video.volume > 0) {
        track('video_unmute', { video_title: label, video_url: video.currentSrc || video.src });
      }
    });
  });
})();
