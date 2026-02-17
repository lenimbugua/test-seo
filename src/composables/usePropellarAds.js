export function usePropellarAds() {
  function initPropellerAds() {
    var value = new URL(location.href).searchParams.get("PROPELLER");
    if (value) {
      var date = new Date();
      date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
      document.cookie =
        "prop_visitor_id=" +
        (value || "") +
        "; expires=" +
        date.toUTCString() +
        "; path=/";
    }
  }

  function trackPropellerConversion() {
    var visitorId = ("; " + document.cookie)
      .split("; prop_visitor_id=")
      .pop()
      .split(";")[0];

    if (visitorId) {
      var xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "https://ad.propellerads.com/conversion.php?aid=3773556&tid=139960&visitor_id=" +
          encodeURIComponent(visitorId),
        true
      );
      xhr.send();
    }
  }

  function trackPropellerDeposit() {
    var visitorId = ("; " + document.cookie)
      .split("; prop_visitor_id=")
      .pop()
      .split(";")[0];

    if (visitorId) {
      var xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        "https://ad.propellerads.com/conversion.php?aid=3773556&tid=139960&goal=2&visitor_id=" +
          encodeURIComponent(visitorId),
        true
      );
      xhr.send();
    }
  }

  return {
    initPropellerAds,
    trackPropellerConversion,
    trackPropellerDeposit,
  };
}
