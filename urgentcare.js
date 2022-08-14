function resetHashcode(n, t) {
    var a, c, u, o, f, l;
    if ($(".results-count").addClass("yes"), $(".prepend").remove(), a = $(t).attr("data-tab-title") ? '<span class="or">|<\/span>' : "", $(".search-results-count .component-content").prepend('<div class="prepend">' + $(t).attr("data-tab-title") + a + "<\/div>"), n.preventDefault(), !triggerEventHashChange) {
        $("body").addClass("global-search-inprogress");
        var r = [],
            s, e = window.location.hash.split("#")[1],
            v = e,
            i = MHO.Util.GetSearchResultSig($(".content-search-results")),
            h = i;
        if (i = i == "" ? "s=" : i + "_s=", h = h == "" ? "q=" : h + "_q=", e != undefined) {
            for (e = e.split("&"), c = 0; c < e.length; c++) s = e[c].split("="), r.push(s[1]), r[s[0]] = s[1];
            u = window.location.hash;
            r.s == undefined && r[i.split("=")[0]] == undefined ? u = u + "&" + i + $(t).attr("data-scope") : (o = window.location.hash, o = r.s != undefined ? o.replace(/s=.*}/, i + $(t).attr("data-scope")) : o.replace(i + r[i.split("=")[0]], i + $(t).attr("data-scope")), u = o);
            r.q != undefined;
            f = MHO.Util.GetSearchResultSig($(".content-search-results"));
            f = f == "" ? "g=" : f + "_g=";
            r.g == undefined && r[f.split("=")[0]] == undefined && ($(t).attr("data-tab-title") == "Providers" || $(t).attr("data-tab-title") == "Locations") ? (l = encodeURI(MHO.Util.GetLatLongFromCookie()), l != "" && (u = u + "&" + f + l + "&globalsearch_distance%20by%20miles=25000&globalsearch_o=Distance%2CAscending"), window.location.hash = u) : $(t).attr("data-tab-title") != "Providers" && $(t).attr("data-tab-title") != "Locations" ? removeParams(i.split("=")[0], f.split("=")[0], h.split("=")[0], u) : window.location.hash = u
        } else window.location.hash = $(".show-all-search-result-container").length > 0 ? "#&" + i + $(t).attr("data-scope") : "#&" + i + $(t).attr("data-scope")
    }
}
function getFParam() {
    var n = $(".content-search-results").attr("data-properties"),
        t = JSON.parse(n);
    return t.f
}
function removeParams(n, t, i, r) {
    for (var f = window.location.href.split("#")[0] + "#", s = r.substring(1), o = s.split("&"), u, e = 0; e < o.length; e++) u = o[e].split("="), (u[0] == "q" || u[0] == i || u[0] == "s" || u[0] == n || (u[0] == "g" || u[0] == t) && $(".radius-filter").length > 0) && (f = f + u[0] + "=" + u[1] + "&");
    window.location.href = f.substring(0, f.length - 1)
}
function getCookie(n) {
    for (var t, r = n + "=", f = decodeURIComponent(document.cookie), u = f.split(";"), i = 0; i < u.length; i++) {
        for (t = u[i]; t.charAt(0) == " ";) t = t.substring(1);
        if (t.indexOf(r) == 0) return t.substring(r.length, t.length)
    }
    return ""
}
function setParamforCheckBox(n) {
    var t = window.location.href.split("#")[0] + "#",
        l = decodeURIComponent(window.location.hash.substring(1)),
        s = l.split("&"),
        i, f, r = JSON.parse(n.attr("data-properties")).f.toLowerCase(),
        e, u, h, c, o;
    if ($(".mfc-search-page:visible").length ? (r == "accepting new patients" && (r = encodeURI(r)), e = ["doctorssearch", "facilitysearch"], u = ["doctorssearch_" + r, "facilitysearch_" + r]) : (e = MHO.Util.GetSearchResultSig($(".content-search-results")), u = e + "_" + r), typeof e == "string") {
        for (f = 0; f < s.length; f++) i = s[f].split("="), i[0] == u ? (h = !0, n.is(":checked") ? t = t + i[0] + "=" + n.is(":checked") + "&" : n.attr("id") != "PreferredChkbox" && (t = t + i[0] + "=" + n.is(":checked") + "&")) : t = t + i[0] + "=" + i[1] + "&";
        h || (t = t + u + "=" + n.is(":checked") + "&");
        window.location.href = t.substring(0, t.length - 1)
    } else c = n.is(":checked"), o = window.location.hash, $(u).each(function(n, t) {
        o = MHO.Util.updateParam(o, c, t + "=")
    }), window.location.hash = o
}
function clearAllFunc() {
    for (var s = window.location.hash.substr(1), h = s.split("&").reduce(function(n, t) {
        var i = t.split("=");
        return i[0].includes("doctorssearch_insurance") ? i[1] : n
    }, {}), i = decodeURIComponent(window.location.hash), u = document.querySelectorAll(".facet-dropdown:not(.facet-insurance-accepted)"), o, t, u = $(u).add(document.getElementsByClassName("facet-single-selection-list")), n = 0; n < u.length; n++) {
        var c = u[n].getAttribute("data-properties"),
            f = JSON.parse(c),
            e = f.f.toLowerCase(),
            r = f.searchResultsSignature;
        r.includes(",") ? (r = r.split(","), $(r).each(function(n, t) {
            var r = t + "_" + e;
            i = i.replace(new RegExp("&?" + r + "=[0-9a-zA-Z '|(),\\.\\- _:]*"), "")
        })) : (o = r + "_" + e, i = i.replace(new RegExp("&?" + o + "=[0-9a-zA-Z '|(),\\.\\- _:]*"), ""))
    }
    if ($(".any-insurance-fad").length == 1) {
        for (sURLVariables = i.split("&"), t = "", n = 0; n < sURLVariables.length; n++) sParameterName = sURLVariables[n].split("="), sParameterName[0].includes("doctorssearch_insurance") ? t = t + sParameterName[0] + "=" + h + "&" : sParameterName[0].includes("doctorssearch") && (t = t + sURLVariables[n] + "&");
        window.location.hash = t.substring(0, t.length - 1)
    } else window.location.hash = encodeURI(i)
}
function changeURLFunc(n) {
    var i = decodeURIComponent(window.location.hash),
        t, r;
    n == "specialtiesDDFilter" || n == "treatmentsDDFilter" ? (t = document.getElementById(n), r = t.getAttribute("data-properties")) : (t = document.getElementsByClassName(n), r = t[0].getAttribute("data-properties"));
    var u = JSON.parse(r),
        f = u.f.toLowerCase(),
        e = u.searchResultsSignature,
        o = e + "_" + f;
    i = i.replace(new RegExp("&?" + o + "=[a-zA-Z '(),\\.\\- _:||]*"), "");
    window.location.hash = i;
    n != "specialtiesDDFilter" && n != "treatmentsDDFilter" && $("." + n + " .facet-dropdown-select option:first").attr("selected", !0).trigger("change")
}
function calcFilterCount() {
    $(".filters-applied-content:visible").length ? ($(".doc-search-filter-button.filter-and-sort-mobile #filter-count-fad").text("(" + $(".filters-applied-content ul li").length + ")"), $(".doc-search-filter-button.filter-and-sort-mobile #sortby-filter-fad").text($(".filter-and-sort-mobile .button-container button.text-mho-charcoal").text())) : ($(".doc-search-filter-button.filter-and-sort-mobile #filter-count-fad").text(""), $(".doc-search-filter-button.filter-and-sort-mobile #sortby-filter-fad").text(""))
}
function myEventTriggerFunctionOnClick(n) {
    if ("createEvent" in document) {
        var t = document.createEvent("HTMLEvents");
        t.initEvent("click", !0, !0);
        n.dispatchEvent(t)
    } else n.fireEvent("onclick")
}
function dataFromStorage(n) {
    var f, r, u, t, i;
    localStorage.getItem("sessionURL") != null && localStorage.getItem("sessionURL") == n && localStorage.getItem("sessionArrObj") != null && localStorage.getItem("sessionArrObj") != "[]" && (f = JSON.parse(localStorage.getItem("sessionArrObj")), filterSelectedArr = f, pageRefresh = "true", r = filterSelectedArr.filter(function(n) {
        return n.dropdown == "specialtiesDDFilter"
    }), u = filterSelectedArr.filter(function(n) {
        return n.dropdown == "treatmentsDDFilter"
    }), r.length > 0 && (t = r.length, i = '<div class="selectedItem-count text-primaryFontDemi">' + t + "<\/div>", $("#facet-specialtiesDD").prepend(i)), u.length > 0 && (t = u.length, i = '<div class="selectedItem-count text-primaryFontDemi">' + t + "<\/div>", $("#facet-treatmentsDD").prepend(i), $(".treatment-container").find(".dummy-facet span").addClass("truncate-treatment")), $("#facet-specialtiesDD .selectedItem-count").length > 1 && $("#facet-specialtiesDD .selectedItem-count:first").remove(), $("#facet-treatmentsDD .selectedItem-count").length > 1 && $("#facet-treatmentsDD .selectedItem-count:first").remove())
}
function mfcUrlChange(n, t) {
    var u = t,
        i = window.location.href.split("#")[0] + "#",
        c = decodeURIComponent(window.location.hash.substring(1)),
        s = c.split("&"),
        f, o, r, h;
    if (r = n == "mfc-radio" ? ["doctorssearch_s", "facilitysearch_s", "otherssearch_s"] : n == "mfc-sort-by" ? "doctorssearch_o" : "doctorssearch_resulttype", typeof r == "string") {
        for (o = 0; o < s.length; o++) if (f = s[o].split("="), f[0] == r) if (h = !0, r == "doctorssearch_resulttype") {
            if (u == undefined) {
                i = i.substring(0, i.indexOf("#"));
                window.history.replaceState({}, document.title, i);
                return
            }
            i = i + f[0] + "=" + u + "&"
        } else r == "doctorssearch_o" ? u != "" && (i = i + f[0] + "=" + u + "&") : i = i + f[0] + "=" + u + "&";
        else i = i + f[0] + "=" + f[1] + "&";
        if (!h) if (r == "doctorssearch_resulttype") if (u != undefined) i = i.indexOf(r) == -1 ? i + r + "=" + u + "&" : i;
        else {
            i = i.substring(0, i.indexOf("#"));
            window.history.replaceState({}, document.title, i);
            return
        } else r == "doctorssearch_o" ? u != "" && (i = i.indexOf(r) == -1 ? i + r + "=" + u + "&" : i) : i = i.indexOf(r) == -1 ? i + r + "=" + u + "&" : i;
        window.location.href = i.substring(0, i.length - 1)
    } else {
        var l = $("input[data-provider-scope='" + u + "']").attr("data-others-scope"),
            a = $("input[data-provider-scope='" + u + "']").attr("data-facility-scope"),
            e = window.location.hash;
        $(r).each(function(n, t) {
            e = t == "otherssearch_s" ? MHO.Util.updateParam(e, l, t + "=") : t == "doctorssearch_s" ? MHO.Util.updateParam(e, u, t + "=") : MHO.Util.updateParam(e, a, t + "=")
        });
        window.location.hash = e
    }
}
function mfcPageLoad() {
    $(".mfc-search-page:visible").length > 0 && ($(".filter-select").hasClass("doc-search-facility") ? ($("#flatSortingList option[data-facet='HeroTitle']").show(), $("#flatSortingList option[data-facet='Doctor - Last Name']").hide()) : ($("#flatSortingList option[data-facet='HeroTitle']").hide(), $("#flatSortingList option[data-facet='Doctor - Last Name']").show()))
}
function mfcProviderSmallView() {
    var n = $(".mfc-provider-radioset").parents(":eq(2)"),
        t;
    $(".mfc-provider-radioset").parents(":eq(2)").remove();
    $(".global-search-mfc").length == 0 ? (t = $(".heading-cta-banner .search-results-count"), $(".heading-cta-banner .search-results-count").remove(), $(".heading-cta-banner label[for='textBoxSearch']").parents(":eq(2)").before(t), $(".heading-cta-banner .count-finddoc.search-results-count").before(n)) : $(".heading-cta-banner label[for='textBoxSearch']").parents(":eq(2)").before(n.addClass("mob-margin-bottom-20"))
}
function FADPageLoad() {
    if ($(".mfc-search-page:visible").length == 0 && $("#fad-filter-container").length > 0) {
        var n = $("#specialtiesDDFilter .search-dropdown-content p input:checked"),
            t = $("#treatmentsDDFilter .search-dropdown-content p input:checked");
        n.length > 0 && ($.each(n, function(n, t) {
            $(t).attr("data-val", $(t).siblings("label").text().split("(")[0].trim());
            generateFilterArr("specialtiesDDFilter", $(t).siblings("label").text().split("(")[0].trim(), "add");
            var i = {};
            i.name = $(t).attr("data-val");
            i.ele = $(t);
            i.checked = !0;
            oldSpeciality.push(i);
            $("#specialtiesDDFilter .values-selected").append($(t).parent())
        }), $("#specialtiesDDFilter .filterButton").trigger("click"));
        t.length > 0 && ($.each(t, function(n, t) {
            $(t).attr("data-val", $(t).siblings("label").text().split("(")[0].trim());
            generateFilterArr("treatmentsDDFilter", $(t).siblings("label").text().split("(")[0].trim(), "add");
            var i = {};
            i.name = $(t).attr("data-val");
            i.ele = $(t);
            i.checked = !0;
            oldTreatment.push(i);
            $("#treatmentsDDFilter .values-selected").append($(t).parent())
        }), $("#treatmentsDDFilter .filterButton").trigger("click"));
        globalFilterApplied(filterSelectedArr)
    }
}
function updateQparameValueInButtons() {
    var u = window.location.hash.replace("#", "").indexOf("_q="),
        i = encodeURI(MHO.Util.GetLatLongFromCookie()),
        t, f, n, r;
    u >= 0 && (t = window.location.hash.replace("#", "").split("&").filter(function(n) {
        return n.indexOf("_q=") >= 0
    }), t.length > 0 && (t = t[0].split("="), t = t.length > 0 ? t[1] : ""));
    $(".show-all-search-result-container").length > 0 ? ($(".global-filter-nav .component.plain-html a:not(.doc-global-showall)").each(function() {
        u >= 0 ? $(this).attr("href").indexOf("globalsearch_q") >= 0 ? $(this).attr("href", MHO.Util.updateParam($(this).attr("href"), t, "_q=")) : $(this).attr("href", $(this).attr("href") + "&globalsearch_q=" + t) : $(this).attr("href").indexOf("globalsearch_q") >= 0 && $(this).attr("href", MHO.Util.removeParam($(this).attr("href"), "_q="));
        ($(this).hasClass("doc-search-doctors") || $(this).hasClass("doc-search-locations")) && ($(this).attr("href").indexOf("globalsearch_g=") >= 0 ? $(this).attr("href", MHO.Util.updateParam($(this).attr("href"), i, "_g=")) : $(this).attr("href", $(this).attr("href") + "&globalsearch_g=" + i), $(this).hasClass("doc-search-doctors") && i != "" && ($(this).attr("href").indexOf("globalsearch_o=") >= 0 ? $(this).attr("href", MHO.Util.updateParam($(this).attr("href"), "Distance%2CAscending", "globalsearch_o=")) : $(this).attr("href", $(this).attr("href") + "&globalsearch_o=Distance%2CAscending")))
    }), $(".show-all-search-result-container .Default-Button a").each(function() {
        u >= 0 ? $(this).attr("href").indexOf("globalsearch_q") >= 0 ? $(this).attr("href", MHO.Util.updateParam($(this).attr("href"), t, "_q=")) : $(this).attr("href", $(this).attr("href") + "&globalsearch_q=" + t) : $(this).attr("href").indexOf("globalsearch_q") >= 0 && $(this).attr("href", MHO.Util.removeParam($(this).attr("href"), "_q="));
        ($(this).hasClass("see-more-providers-global") || $(this).hasClass("see-more-location-global")) && ($(this).attr("href").indexOf("globalsearch_g=") >= 0 ? $(this).attr("href", MHO.Util.updateParam($(this).attr("href"), i, "_g=")) : $(this).attr("href", $(this).attr("href") + "&globalsearch_g=" + i), $(this).hasClass("see-more-providers-global") && i != "" && ($(this).attr("href").indexOf("globalsearch_o=") >= 0 ? $(this).attr("href", MHO.Util.updateParam($(this).attr("href"), "Distance%2CAscending", "globalsearch_o=")) : $(this).attr("href", $(this).attr("href") + "&globalsearch_o=Distance%2CAscending")))
    })) : $(".doc-global-showall").length > 0 ? (f = ["globalprovider_q", "globalservice_q", "globallocation_q", "globalce_q", "globalnews_q", "globalblog_q", "globalpatient_q", "globalarticle_q", "globalother_q"], n = $(".doc-global-showall").attr("href"), u >= 0 && $(f).each(function(i, r) {
        n.indexOf(r) >= 0 ? i == 0 && (n = MHO.Util.updateParam(n, t, "_q=")) : n = n.indexOf("#") >= 0 ? n + "&" + r + "=" + t : n + "#" + r + "=" + t
    }), n = n.indexOf("globalprovider_g") < 0 ? n.indexOf("#") >= 0 ? n + "&globalprovider_g=" + i : n + "#globalprovider_g=" + i : MHO.Util.updateParam(n, i, "_g="), n.indexOf("globallocation_g") < 0 && (n = n.indexOf("#") >= 0 ? n + "&globallocation_g=" + i : n + "#globallocation_g=" + i), n.indexOf("globalprovider_distance") < 0 && (n = n.indexOf("#") >= 0 ? n + "&globalprovider_distance%20by%20miles=25000" : n + "#globalprovider_distance%20by%20miles=25000", n.indexOf("globallocation_distance") < 0 && (n = n.indexOf("#") >= 0 ? n + "&globallocation_distance%20by%20miles=25000" : n + "#globallocation_distance%20by%20miles=25000")), $(".doc-global-showall").attr("href", n)) : $(".mfc-search-page").length > 0 && ($(".global-filter-nav .component.plain-html a:not(.filter-select)").each(function() {
        if ($(this).attr("href").indexOf("/") >= 0) {
            var n = $(this).attr("href");
            n.indexOf("#") >= 0 && (n = n.slice(0, n.indexOf("#"), ""));
            n = n + window.location.hash;
            $(this).attr("href", n)
        }
    }), $(".global-search-mfc .Default-Button a").each(function() {
        if ($(this).attr("href").indexOf("/") >= 0) {
            var n = $(this).attr("href");
            n.indexOf("#") >= 0 && (n = n.slice(0, n.indexOf("#"), ""));
            n = n + window.location.hash;
            $(this).attr("href", n)
        }
    }), $(".mfc-provider-radioset").length > 0 && (r = MHO.Util.getValueFromKey(window.location.hash, "doctorssearch_s"), r != "" && (r = decodeURI(r), $(".mfc-other-search").length > 0 ? $("input[data-others-scope='" + r + "']").prop("checked", !0) : $("input[data-provider-scope='" + r + "']").prop("checked", !0))))
}
function setDefaultParamsOnPageLoad(n) {
    var t = "",
        i, u;
    if (t = n == "clearall" ? "" : window.location.hash, i = encodeURI(MHO.Util.GetLatLongFromCookie()), t.indexOf("doctorssearch_g") < 0 && i != "" && (t = t.indexOf("#") >= 0 ? t + "&doctorssearch_g=" + i + "&doctorssearch_o=Distance%2CAscending" : t + "#doctorssearch_g=" + i + "&doctorssearch_o=Distance%2CAscending"), t.indexOf("facilitysearch_g") < 0 && i != "" && (t = t.indexOf("#") >= 0 ? t + "&facilitysearch_g=" + i + "&facilitysearch_o=Distance%2CAscending" : t + "#facilitysearch_g=" + i + "&facilitysearch_o=Distance%2CAscending"), t.indexOf("doctorssearch_distance") < 0 && (t = t.indexOf("#") >= 0 ? t + "&doctorssearch_distance%20by%20miles=25000" : t + "#doctorssearch_distance%20by%20miles=25000"), t.indexOf("facilitysearch_distance") < 0 && (t = t.indexOf("#") >= 0 ? t + "&facilitysearch_distance%20by%20miles=25000" : t + "#facilitysearch_distance%20by%20miles=25000"), $(".mfc-accept-new-patients").length > 0 && (t.indexOf("doctorssearch_accepting") >= 0 ? (u = MHO.Util.getValueFromKey(t, "doctorssearch_accepting%20new%20patients"), $(".mfc-accept-new-patients").length > 0 && $(".mfc-accept-new-patients select option[data-facetname=" + u + "]").attr("selected", "selected")) : ($(".mfc-accept-new-patients select option:first").attr("selected", "selected"), $(".mfc-accept-new-patients select").val($(".mfc-accept-new-patients select option:first").text()))), $(".mfc-provider-radioset").length != 0) {
        var f = $("input[name='mfc-radio']").length ? $("input[name='mfc-radio']:first").attr("data-others-scope") : "",
            r = $("input[name='mfc-radio']").length ? $("input[name='mfc-radio']:first").attr("data-provider-scope") : "",
            e = $("input[name='mfc-radio']").length ? $("input[name='mfc-radio']:first").attr("data-facility-scope") : "";
        r != "" && (t.indexOf("facilitysearch_s") < 0 && (t = t.indexOf("#") >= 0 ? t + "&facilitysearch_s=" + e : t + "facilitysearch_s=" + e), t.indexOf("doctorssearch_s") < 0 && (t = t.indexOf("#") >= 0 ? t + "&doctorssearch_s=" + r : t + "doctorssearch_s=" + r), t.indexOf("otherssearch_s") < 0 && (t = t.indexOf("#") >= 0 ? t + "&otherssearch_s=" + f : t + "otherssearch_s=" + f));
        t.indexOf("doctorssearch_resulttype") < 0 && (t = t.indexOf("#") >= 0 ? t + "&doctorssearch_resulttype=b8e7a41426c8483e92362e6264a6360e" : t + "doctorssearch_resulttype=b8e7a41426c8483e92362e6264a6360e");
        t.indexOf("facilitysearch_resulttype") < 0 && (t = t.indexOf("#") >= 0 ? t + "&facilitysearch_resulttype=d69fc5dc8004460daab2ee0262bc926c" : t + "facilitysearch_resulttype=d69fc5dc8004460daab2ee0262bc926c");
        window.innerWidth < 991 && mfcProviderSmallView()
    }
    t != window.location.hash && (window.location.hash = t);
    SetAcceptinNewPatientsDropdownText();
    updateQparameValueInButtons()
}
function SetAcceptinNewPatientsDropdownText() {
    for (var r, t, u = decodeURIComponent(window.location.hash.substring(1)), i = u.split("&"), n = 0; n < i.length; n++) sParameterName = i[n].split("="), r = sParameterName[0].toLowerCase(), r.indexOf("doctorssearch_distance by miles") != -1 && (t = $(".radius-filter ul li[data-value='" + sParameterName[1] + "']"), t.length > 0 && $(".facet-distance-by-miles .facet-title").html('Within <span class="selectedVal">' + t.attr("data-title") + "<\/span>").length)
}
function myMap() {
    function h(n) {
        if ($(".link-list.including-availabletime").length > 0) for (var t in n) $(".link-list.including-availabletime .available-time p[data-attribute=" + n[t].solvid + "]").length > 0 && ($(".link-list.including-availabletime .available-time p[data-attribute=" + n[t].solvid + "]").parent().show(), $(".link-list.including-availabletime .available-time p[data-attribute=" + n[t].solvid + "]").html(MHO.Util.formatDateTime(n[t].WaitTime, !1)))
    }
    var e, o;
    currentUserLoc = getCookie("CustomLatLon").split("|");
    currentUserLoc == "" && (currentUserLoc = getCookie("LatLon").split("|"));
    var n, t = "",
        i = "",
        r = "",
        u = "",
        f = "",
        s = $("#urgentCare_ContextPage").val();
    n = $("#googleMap").is("[data-dept]") ? $("#googleMap").attr("data-dept") : "cardioligy";
    e = {};
    o = "";
    n == "urgentcarelist" ? (o = "/api/sitecore/Location/Urgentcarelist", e = {
        department: n
    }) : (e = {
        currentUserLoc: currentUserLoc,
        department: n,
        contextPageLatLong: s
    }, o = "/api/sitecore/Location/GetMarkerValues");
    hospitalData = $.ajax({
        url: o,
        type: "POST",
        data: e,
        success: function(e) {
            var c, v;
            if (e == "") console.log("no data"), c = {
                center: new google.maps.LatLng("39.32927", "-76.61476"),
                zoom: 8
            }, map = new google.maps.Map(document.getElementById("googleMap"), c);
            else {
                c = {
                    center: new google.maps.LatLng(e[0].Latitude, e[0].Longitude),
                    zoom: 8
                };
                map = new google.maps.Map(document.getElementById("googleMap"), c);
                for (var y = new google.maps.InfoWindow, l = [], p = "", s = "", a = "", w = [], o = 0; o < e.length; o++) n == "urgentcare" ? (s = MHO.Util.formatDateTime(e[o].WaitTime, !0), e[o].Title != "" && (f = e[o].Title + ","), e[o].Address1 != "" && (t = e[o].Address1 + ","), e[o].Address2 != "" && (i = e[o].Address2 + ","), e[o].StateAbbr != "" && (u = e[o].StateAbbr + ","), e[o].City != "" && (r = e[o].City + ","), destination = f + t + i + r + u + e[o].Zipcode, a += '<li> <div class="uc-loc-card mho-bg-white mscard"><div class="uc-loc-card-miles">' + e[o].Distance + ' <\/div><a href="/locations/' + e[o].Name + '"><h4 class="uc-loc-card-title">' + e[o].Title + '<\/h4><\/a><div class="uc-loc-card-availability button-with-border"><p>Next available:<\/p><p>' + s + "<\/p>", e[o].SaveMySpotURL != "" && (a += '<a href="' + e[o].SaveMySpotURL + '" role="button" target="_blank">Reserve a Spot<\/a><\/div>'), a += '<div class="uc-loc-card-address"> <p>' + e[o].Address1 + "<\/p><p>" + e[o].Address2 + "<\/p><p>" + e[o].City + ", " + e[o].StateAbbr + " " + e[o].Zipcode + '<\/p><\/div><a class="location-body get-direction-link" target="_blank" href="https://www.google.com/maps/dir/?api=1&amp;origin=&amp;destination=' + destination + '&travelmode=driving">Get directions<\/a><a class="  field-phone-number-blue" href="tel:' + e[o].PhoneNumber + '">' + e[o].PhoneNumber + "<\/a><\/div><\/li>", w[o] = '<div class="pop-up-address"><p class="text-primaryFontDemi text-mho-dark-blue"><a href="/locations/' + e[o].Name + '">' + e[o].Title + '<\/a><\/p><a href="javascript:void(0)" role="button" class="card-close"><\/a><p class="small-body-copy remove-bottom-space">' + e[o].Address1 + '<\/p><p class="small-body-copy remove-bottom-space">' + e[o].Address2 + e[o].City + ", " + e[o].StateAbbr + " " + e[o].Zipcode + '<\/p><p class="pop-availability">Next available: ' + s + '<\/p><div class="pop-links"><div class="button-with-border"><a href="' + e[o].SaveMySpotURL + '" target="_blank" role="button">Reserve a Spot<\/a><\/div><a class="field-phone-number-blue" href="tel:' + e[o].PhoneNumber + '"><strong>' + e[o].PhoneNumber + "<\/strong><\/a><\/div><\/div>") : n == "urgentcarelist" ? (markertextVal = MHO.Util.formatDateTime(e[o].WaitTime, !0), s = " ", e[o].Title != "" && (f = e[o].Title + ","), e[o].Address1 != "" && (t = e[o].Address1 + ","), e[o].Address2 != "" && (i = e[o].Address2 + ","), e[o].StateAbbr != "" && (u = e[o].StateAbbr + ","), e[o].City != "" && (r = e[o].City + ","), destination = f + t + i + r + u + e[o].Zipcode, w[o] = '<div class="pop-up-address"><p class="text-primaryFontDemi text-mho-dark-blue"><a href="/locations/' + e[o].Name + '">' + e[o].Title + '<\/a><\/p><a href="javascript:void(0)" role="button" class="card-close"><\/a><p class="small-body-copy remove-bottom-space">' + e[o].Address1 + '<\/p><p class="small-body-copy remove-bottom-space">' + e[o].Address2 + e[o].City + ", " + e[o].StateAbbr + " " + e[o].Zipcode + '<\/p><p class="pop-availability">Next available: ' + markertextVal + '<\/p><div class="pop-links"><div class="button-with-border"><a href="' + e[o].SaveMySpotURL + '" target="_blank" role="button">Reserve a Spot<\/a><\/div><a class="field-phone-number-blue" href="tel:' + e[o].PhoneNumber + '"><strong>' + e[o].PhoneNumber + "<\/strong><\/a><\/div><\/div>") : s = e[o].Distance, v = "", p = o == 0 ? "short-path" : "default-path", n == "urgentcarelist" ? (v = "/~/media/Themes/MHO/Medstar/MHO-Theme/images/Icons/Location-pin.png", p = "") : v = "/~/media/Themes/MHO/Medstar/MHO Theme/images/Icons/map-marker-image.png", l[o] = new google.maps.Marker({
                    position: new google.maps.LatLng(e[o].Latitude, e[o].Longitude),
                    map: map,
                    label: {
                        className: p,
                        text: s.replace("<br>", " ")
                    },
                    icon: v
                }), google.maps.event.addListener(l[o], "click", function(t, i) {
                    return function() {
                        n == "urgentcare" || n == "urgentcarelist" ? y.setContent(w[i]) : y.setContent(e[i].MarkerInfo);
                        y.open(map, l[i])
                    }
                }(l[o], o));
                n == "urgentcare" && $(".uc-loc-carousel .component-content").append('<ul class="search-results">' + a + "<\/ul>")
            }
            h(e)
        },
        error: function() {
            console.log("error occured");
            var n = {
                center: new google.maps.LatLng("39.32927", "-76.61476"),
                zoom: 8
            };
            map = new google.maps.Map(document.getElementById("googleMap"), n)
        }
    })
}
function getCookie(n) {
    return document.cookie.length > 0 && (c_start = document.cookie.indexOf(n + "="), c_start != -1) ? (c_start = c_start + n.length + 1, c_end = document.cookie.indexOf(";", c_start), c_end == -1 && (c_end = document.cookie.length), unescape(document.cookie.substring(c_start, c_end))) : ""
}
function setCookie(n, t, i) {
    var u = "",
        r;
    i && (r = new Date, r.setTime(r.getTime() + i * 864e5), u = "; expires=" + r.toUTCString());
    document.cookie = n + "=" + (t || "") + u + "; path=/"
}
function loadJS(n, t) {
    var i = document.createElement("script");
    i.type = "text/javascript";
    i.src = n;
    $(t).append(i)
}
function myEventMap() {
    var n = $("#eve-lat").val(),
        t = $("#eve-long").val(),
        r = $("#eve-add").val(),
        u = $("#eve-facname").val(),
        f = '<div class="pop-up-address"><p class="text-primaryFontDemi text-mho-dark-blue">' + u + '<\/p><a href class="card-close"><\/a><p class="small-body-copy remove-bottom-space">' + r + "<\/p><\/div>",
        i = new google.maps.InfoWindow,
        e = {
            center: new google.maps.LatLng(n, t),
            zoom: 8
        };
    map = new google.maps.Map(document.getElementById("eventmaps"), e);
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(n, t),
        map: map,
        label: {
            className: "default-path1",
            text: " "
        },
        icon: "/~/media/Themes/MHO/Medstar/MHO Theme/images/Icons/Location pin.png"
    });
    google.maps.event.addListener(marker, "click", function(n) {
        return function() {
            i.setContent(f);
            i.open(map, n)
        }
    }(marker))
}
function newsPagePostAnchorTagClick(n) {
    var t = n.split("#");
    t.length > 0 && window.location.href.indexOf(t[0]) >= 0 && ($(window).scrollTop(0), $("body").removeClass("scroll-up"), $("body").removeClass("scroll-down"), $("h1.field-hero-title").length > 0 && $("h1.field-hero-title").attr("tabindex", -1).focus())
}
function reviewCallback(n, t) {
    var u;
    if (n.valid) {
        var r = $(t).parents(".ratings"),
            f = $(r).find(".review-comments")[0],
            i = $(t).parents(".ratings").data("info");
        i && (i.currentpage += 1, $(r).data("info", i));
        $.each(n.reviews, function(n, t) {
            if (n >= 3 || i.currentpage != 1) {
                var r = "<li><p><strong>" + t.formattedReviewDate + "<\/strong><\/p><p>" + (t.bodyForDisplay != "" ? t.bodyForDisplay : t.body2ForDisplay) + "<\/p><\/li>";
                $(f).append(r);
                console.log(t.formattedReviewDate)
            }
        });
        n.reviewMeta && n.reviewMeta.recordCnt && (u = n.reviewMeta.recordCnt - $(f).find("li").length, $($(r).find(".count")[0]).text(u), u <= 0 && $(".ratings .more-reviews a").hide())
    }
}
function singleSlideConfig(n) {
    if ($(n).find("ul").length > 0 && $(n).find(".slick-initialized").length == 0) {
        ConstructPagination($(n).find("ul:first"));
        var t = !1;
        ($(n).parents(".show-all-search-result-container").length > 0 || $(n).parents(".global-search-mfc").length > 0) && (t = !0);
        $(n).find("ul:first").slick({
            infinite: !1,
            slidesToScroll: 1,
            slidesToShow: 1,
            arrows: !0,
            adaptiveHeight: t
        })
    }
}
function doubleSlideConfig(n) {
    $(n).find("ul").length > 0 && $(n).find(".slick-initialized").length == 0 && (ConstructPagination($(n).find("ul:first")), $(n).find("ul:first").slick({
        infinite: !1,
        slidesToScroll: 2,
        slidesToShow: 2,
        arrows: !0,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    }))
}
function TripleSlideConfig(n) {
    $(n).find("ul").length > 0 ? (ConstructPagination($(n).find("ul:first")), $(n).find("ul:first").slick({
        infinite: !1,
        slidesToScroll: 3,
        slidesToShow: 3,
        arrows: !0,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    })) : $(n).find(".carousel-target-element").length > 0 && (ConstructPagination($(n).find(".carousel-target-element")), $(n).find(".carousel-target-element").slick({
        infinite: !1,
        slidesToScroll: 3,
        slidesToShow: 3,
        arrows: !0,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    }))
}
function ConstructPagination(n) {
    n.on("init reInit afterChange", function(n, t, i) {
        var r = $(this)[0],
            e = $(r).parent().prev().addClass("carousel-prev-element"),
            f, u, s, l;
        if ($(e).find("h2").length > 0 && ($(e).next().addClass("h2title"), MHO.Util.titleUnderlineSection($(".carousel-prev-element"))), $(e).find("h3").length > 0 && $(e).next().addClass("h3title"), $(e).is(":empty") && $(".carousel-prev-element").parent().addClass("no-title-carousel"), $(r).find(".slick-slide:not(.slick-active) .video-wrapper .play-button").removeAttr("tabindex"), $(r).find(".slick-prev").length > 0 && ($(r).find(".carousel-navigation-arrows").length == 0 ? ($(r).prepend('<div class="carousel-navigation-arrows"><\/div>'), f = $(r).find(".carousel-navigation-arrows"), $(r).find(".slick-prev").appendTo(f), $(f).append('<span class="pagingInfo" aria-live="polite" aria-atomic="true"><\/span>'), $(r).find(".slick-next").appendTo(f), $(f).find(".slick-arrow").click(function() {
            var n = $(this);
            setTimeout(function() {
                $(n).parents(".slick-slider").find(".slick-slide").each(function() {
                    var n, t;
                    $(this).find("iframe").length > 0 ? (n = $(this).find("iframe").clone()[0], $(this).find("iframe").remove(), n.src.indexOf("autoplay=1") != -1 && (t = n.src.replace("autoplay=1", ""), n.src = "", n.src = t), $(n).attr("tabindex", -1), $(n).css("display", "none"), $($(this).find(".video-wrapper")).prepend(n)) : $(this).find("video").length > 0 && ($(this).find("video")[0].load(), $(this).find("video").attr("tabindex", -1), $(this).find("video").css("display", "none"));
                    $(this).find(".video-wrapper img").show();
                    $(this).find(".video-wrapper .play-button").attr("tabindex", 0)
                })
            }, 10)
        })) : (f = $(r).find(".carousel-navigation-arrows"), $(r).find(".slick-prev").prependTo(f), $(r).find(".slick-next").appendTo(f))), $(r).find(".pagingInfo").length > 0) {
            var c = $(r).find(".pagingInfo"),
                a = (i ? i : 0) + 1,
                h = Math.ceil((t.currentSlide + 1) / t.getSlideCount()),
                o = "";
            t.slideCount && (u = Math.ceil(t.slideCount / t.getSlideCount()));
            $(r).hasClass("mobile-view") && $(r).parents(".doctor-specialists").length > 0 && (s = $(r).parents(".doctor-specialists"), $(s).find(".viewall").length > 0 && u && $(s).find(".viewall").data("total") > u && (o = " of " + $(s).find(".viewall").data("total"), $(s).addClass("show-view-all")));
            ($(r).parents(".show-all-search-result-container").length > 0 || $(r).parents(".global-search-mfc").length > 0) && (l = $(r).parents(".single-slide-carousel").attr("data-count"), u && l > u && (o = " of " + l));
            t.slideCount && c.text(h + " / " + u + o);
            h > u && (c.text(h + " / " + u + o), setTimeout(function() {
                c.text(h + " / " + u + o)
            }, 500))
        }
    })
}
function vimeoLoadingThumb(n, t) {
    var u = "https://vimeo.com/api/v2/video/" + n + ".json?callback=showThumb",
        i = t,
        r = document.createElement("script");
    r.type = "text/javascript";
    r.src = u;
    $(t).attr("id", "vimeo-" + n);
    $(i).attr("src", "/-/media/Themes/MHO/Medstar/MHO-Theme/images/Fall back/video_fallback");
    $(i).css({
        opacity: "1"
    });
    $(i).before(r)
}
function showThumb(n) {
    var t = "#vimeo-" + n[0].id;
    $(t).on("error", function() {});
    $(t).attr("src", n[0].thumbnail_large);
    $(t).css({
        opacity: "1"
    })
}
function videoPlayButtonClick(n) {
    var i, t, r;
    $(n).parent().find(".sr-only").remove();
    $(n).parent().find("iframe").length > 0 ? ($(window).width() > 768 || $(n).parent().find("iframe")[0].src.indexOf("controls=") >= 0) && (i = $(n).parent().find("iframe").clone()[0], $(n).parent().find("iframe").remove(), t = i.src, t = t.replace("controls=0", ""), t += t.indexOf("?") != -1 ? "&autoplay=1" : "?autoplay=1", i.src = t, setTimeout(function() {
        $(n).parent().prepend(i)
    }, 10)) : $(n).parent().find("video").length > 0 && (r = $(n).parent().find("video")[0], r.play());
    $(n).parent().append("<span class='sr-only' role='alert'>Video is playing<\/span>");
    $(n).parent().find("img").hide();
    $("#play").hide()
}
function newsSearchResult() {
    $(".news-search-results").length > 0 && $(".news-search-results li").length > 0 && ($(".news-search-results").addClass("news-search-result-binded"), $(".news-search-results").hasClass("minified-search-summary") && $(".news-search-results").find(".gt-short-description").length == 0 && MHO.Util.minifySearchResult($(".news-search-results")), $(window).width() <= 991 && ($(".news-search-results").find(">ul").length > 0 && $(".news-search-results").find(".news-search-mobile-view").length == 0 && ($(".news-search-results").find(">ul").addClass("news-search-desktop-view"), $("<div class='single-slide-carousel'><ul class='news-search-mobile-view'><\/ul><\/div>").insertAfter($(".news-search-results .news-search-desktop-view")), $(".news-search-results .news-search-desktop-view li").slice(1, 3).clone().appendTo($(".news-search-results").find(".news-search-mobile-view"))), $(".news-search-results .news-search-mobile-view .carousel-navigation-arrows").length > 0 ? ($(".news-search-results .news-search-mobile-view .carousel-navigation-arrows").remove(), $(".news-search-results .news-search-mobile-view").slick("unslick"), singleSlideConfig($(".news-search-results .single-slide-carousel"))) : singleSlideConfig($(".news-search-results .single-slide-carousel"))))
}
function doctorSpecialities() {
    $(".doctor-specialists").length > 0 && $(".doctor-specialists").each(function() {
        var n = $(this);
        $(window).width() <= 991 && !$(".doctor-specialists").hasClass("vertical-card-alignment") && $(this).find(".slick-initialized").length == 0 && ($(n).find(">ul").length > 0 && $(n).find(".mobile-view").length == 0 && ($(n).find(">ul").addClass("desktop-view"), $("<div class='single-slide-carousel'><ul class='mobile-view'><\/ul><\/div>").insertAfter($(n).find(".desktop-view")), $(n).find(".desktop-view li").clone().appendTo($(n).find(".mobile-view"))), $(n).find(".carousel-navigation-arrows").length > 0 ? ($(n).find(".carousel-navigation-arrows").remove(), $(n).find(".mobile-view").slick("unslick"), singleSlideConfig($(n).find(".single-slide-carousel"))) : singleSlideConfig($(n).find(".single-slide-carousel")));
        $(n).find("h3").length > 0 ? $(n).find(".viewmore").attr({
            "aria-expanded": "false",
            role: "button",
            "aria-label": $(n).find("h3").text()
        }) : $(n).find("h2").length > 0 && $(n).find(".viewmore").attr({
            "aria-expanded": "false",
            role: "button",
            "aria-label": $(n).find("h2").text()
        })
    })
}
function addMutationObserverTargets(n) {
    return $(".minified-search-summary").each(function() {
        var t = !1,
            i = $(this);
        $(n).each(function(n, r) {
            $(i).hasClass(r.split(".")[1]) && (t = !0);
            $(i).parents(r).length > 0 && (t = !0)
        });
        t == !1 && $(i).addClass("minified-search-summary-tar")
    }), n.push(".minified-search-summary-tar"), $(".component.search-results.title-hover").each(function() {
        var t = !1,
            i = $(this);
        $(n).each(function(n, r) {
            $(i).hasClass(r.split(".")[1]) && (t = !0);
            $(i).parents(r).length > 0 && (t = !0)
        });
        t == !1 && $(i).addClass("title-hover-tar")
    }), n.push(".title-hover-tar"), n
}
function updateCountOfNews(n, t) {
    var i = $("." + n + " ul.search-result-list > li:hidden").length;
    $(document).find("." + n + " .show-more .count").text(" (" + i + ")");
    i == 0 && $("." + n + " ul.search-result-list").length == 0 ? $(document).find("." + n + " .show-more").css({
        display: "none"
    }) : $(document).find("." + n + " .show-more").css({
        display: "inline-block"
    });
    $("." + n + " ul.search-result-list > li").length <= t && i == 0 && $(document).find("." + n + " .show-more").css({
        display: "none"
    })
}
function disconnectMutationObserver(n, t) {
    var i = "",
        r;
    return ($($(n.target).parents(".search-results")[0]).find("ul li.slick-slide").length > 0 ? i = $($(n.target).parents(".search-results")[0]).data("mutindex") : $(n.target).parents(".result-show-more").find(".count-calculated").length > 0 ? i = $($(n.target).parents(".result-show-more")[0]).data("mutindex") : $(n.target).parents(".result-show-more-2-card").find(".count-calculated").length > 0 ? i = $($(n.target).parents(".result-show-more-2-card")[0]).data("mutindex") : $(n.target).parents(".text-cards-search-results").find(".count-calculated").length > 0 ? i = $($(n.target).parents(".text-cards-search-results")[0]).data("mutindex") : $($(n.target).parents(".minified-search-summary-tar")[0]).find(".gt-short-description").length > 0 ? (i = $($(n.target).parents(".minified-search-summary-tar")[0]).data("mutindex"), console.log("minified-search-summary-tar dis")) : $($(n.target).parents(".search-results")[0]).hasClass("news-search-result-binded") ? i = $($(n.target).parents(".search-results")[0]).data("mutindex") : $($(n.target).parents(".uc-loc-carousel")[0]).find("ul li.slick-slide").length > 0 ? i = $($(n.target).parents(".uc-loc-carousel")[0]).data("mutindex") : $($(n.target).parents(".title-hover-tar")[0]).hasClass(".title-hover-tar-binded") && (i = $($(n.target).parents(".title-hover-tar")[0]).data("mutindex")), i != "") ? (r = mutationObservers.filter(function(n) {
        return n.index == i
    }), r.length > 0 && ($(r)[0].element.disconnect(), t.disconnect()), !1) : !0
}
function pressReleasePage() {
    $(".panel-layout").length > 0
}
function isPhone() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
}
function setFocusForFirstItemOnShowMore(n) {
    $(n).attr("tabindex", -1);
    n.find("a:first").length > 0 ? n.find("a:first")[0].focus() : n.focus()
}
function serviceIconHover(n) {
    var i = n.find("img").attr("src"),
        t = i.replace("-hover", "");
    t = t.replace(".", "-hover.");
    n.find("img").attr("src", t);
    n.find("img").on("error", function() {
        n.find("img").attr("src", i)
    })
}
function serviceIconHoverRemoval(n) {
    var t = n.find("img").attr("src"),
        i = t.replace("-hover", "");
    n.find("img").attr("src", i);
    n.find("img").on("error", function() {
        n.find("img").attr("src", t)
    })
}
function addFreezeScrollPosition() {
    scrollTopDocument = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeftDocument = window.pageXOffset || document.documentElement.scrollLeft
}
function constructLeftNavigation() {
    var t, n;
    $(".nav-content").css("display", "block");
    $(".nav-content").length > 0 && ($(".nav-content").parent().addClass("left-nav-con"), $(".nav-content .component-content").append('<div class="left-nav-links-container"><\/div>'), t = "<ul>", $("h2").not(".fsForm h2").each(function(n) {
        var i = $(this).text(),
            r, u;
        i != "" && ($(this).find(".scWebEditInput").length > 0 && (i = $(this).find(".scWebEditInput").text()), i = titleCase(i), $(this).attr("id", i.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "") + n), r = $(this).attr("name") ? titleCase($(this).attr("name")) : i, u = "#" + i.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "") + n, t = t + "<li><a href='" + u + "'>" + r + "<\/a><\/li>")
    }), t = t + "<\/ul>", $(".left-nav-links-container").html(t), $(".nav-content .component-content .left-nav-links-container").append('<div class="left-nav-down-arrow"><\/div>'), ($(".nav-content").parents(".col-xl-4").length > 0 || $(".nav-content").parents(".col-lg-4").length > 0) && (n = $(".nav-content").parents(".col-xl-4").length > 0 ? $(".nav-content").parents(".col-xl-4") : $(".nav-content").parents(".col-lg-4").height(), $(n).addClass("col-lg-4"), n = $(n).next("div").addClass("col-lg-8"), n = $(n).find(".component:not(.container):first"), $(n).length > 0 && $(n).find("h2").length == 0 && ($(n).attr("id", "Overview"), $(".nav-content a").removeClass("nav-active"), $(".nav-content .component-content .left-nav-links-container ul").prepend("<li><a href='#Overview' class='nav-active'>Overview<\/a><\/li>"))), $(".left-nav-down-arrow").click(function() {
        $(".left-nav-links-container").scrollTop($(".left-nav-links-container").scrollTop() + 50)
    }), $("h2.h2title-underline").attr("tabindex", "-1"), $(".nav-content a").click(function(n) {
        var i, r, t;
        (n.preventDefault(), leftNavSelectoronPageLoad = [], pageLoadLeftNavSelector = !1, $("body").removeClass("overlay-enabled").removeClass("mobile-left-nav-opened"), leftNavClickEventTriggered) || (i = $(this).attr("href"), r = i.split("#"), $(".nav-content a").removeClass("nav-active"), $(this).addClass("nav-active"), r.length > 1 && sessionStorage.setItem(window.location.pathnam, r[1]), t = $(i).offset().top, $(window).width() < 991 && $(i).parents(".image-left-promo").length > 0 && (t = $($(i).parents(".component")[0]).offset().top), t = $(window).width() >= 991 ? t - 60 : t - 72, t < $(window).scrollTop() && (t = t - $("#header").height()), $("body").hasClass("secondary-menu-added") && (t = t - $(".hospital-nav-menu-wrapper").height()), leftNavClickEventTriggered = !0, $("html, body").animate({
            scrollTop: t
        }, 800, function() {
            $(i).focus();
            setTimeout(function() {
                leftNavClickEventTriggered = !1
            }, 100)
        }))
    }), $(".nav-content p").click(function() {
        $(window).width() < 991 && ($("body").hasClass("mobile-left-nav-opened") ? $("body").removeClass("mobile-left-nav-opened").removeClass("overlay-enabled") : $("body").addClass("mobile-left-nav-opened").addClass("overlay-enabled"))
    }))
}
function leftNavigationScrollSelection(n) {
    var e, i, f;
    if ($(".nav-content").length > 0) {
        var r = $(".nav-content").parent().offset().top,
            u = 0,
            t = 0;
        $(window).width() >= 991 ? t = $("body").hasClass("secondary-menu-added") ? r - 160 : r - 100 : (t = r - 27, $("body").hasClass("scroll-up") && (t = t - $("#header").height(), $("body").hasClass("secondary-menu-added") && (t = t - $(".hospital-nav-menu-wrapper").height())), $("body").hasClass("scroll-down") && $("body").hasClass("secondary-menu-added") && (t = t - $(".hospital-nav-menu-wrapper").height()));
        t < n ? $(".nav-content").addClass("sticky-nav") : ($(".nav-content").removeClass("sticky-nav"), $(window).width() > 991 && $(".left-nav-links-container").css("max-height", "initial"));
        ($(".nav-content").parents(".col-xl-4").length > 0 || $(".nav-content").parents(".col-lg-4").length > 0) && (u = $(".nav-content").parents(".col-xl-4").length > 0 ? $(".nav-content").parents(".col-xl-4").height() - 60 : $(".nav-content").parents(".col-lg-4").height() - 60);
        e = n - $(".nav-content").parent().offset().top + $(".nav-content").height();
        e + 100 > u ? ($(".nav-content").addClass("footer-reaches"), $(window).width() > 991 && $(".nav-content").css({
            top: u - $(".nav-content").height() + "px"
        })) : ($(".nav-content").removeClass("footer-reaches"), $(window).width() > 991 && ($(".nav-content").hasClass("sticky-nav") ? $("body").hasClass("secondary-menu-added") ? (i = $(".hospital-nav-menu-wrapper").outerHeight() + $("#header").outerHeight() + 5, $(".nav-content").css({
            top: i + "px"
        }), $(".left-nav-links-container").css("max-height", $(window).innerHeight() - (i + 100))) : (i = $("#header").outerHeight() + 5, $(".nav-content").css({
            top: i + "px"
        }), $(".left-nav-links-container").css("max-height", $(window).innerHeight() - (i + 100))) : $(".nav-content").css({
            top: "0px"
        })));
        $("body").hasClass("scroll-up") ? ($($("h2").get().reverse()).each(function() {
            $(this).attr("id") != undefined && leftNavh2Loop($(this))
        }), $("#Overview").length > 0 && leftNavh2Loop($("#Overview"))) : ($("#Overview").length > 0 && leftNavh2Loop($("#Overview")), $("h2").each(function() {
            $(this).attr("id") != undefined && leftNavh2Loop($(this))
        }));
        $(".left-nav-links-container").length > 0 && (f = $(".left-nav-links-container").height(), $(window).width() < 991 && (f = $(window).height() - 208), $(".left-nav-links-container").get(0).scrollHeight > f ? ($(".left-nav-links-container").addClass("scorll-avail"), $(".left-nav-links-container").scrollTop() + $(".left-nav-links-container").innerHeight() + 10 >= $(".left-nav-links-container")[0].scrollHeight ? $(".left-nav-links-container").addClass("end-reached") : $(".left-nav-links-container").removeClass("end-reached")) : $(".left-nav-links-container").removeClass("scorll-avail"))
    }
}
function leftNavh2Loop(n) {
    var e, r, f;
    if ($(n).text() != "") {
        var u = $(n).attr("id"),
            t = $(n).offset().top,
            i = $(n).offset().top + $(n).outerHeight(),
            o = $(window).scrollTop() + $(window).innerHeight(),
            s = $(window).scrollTop();
        t == 0 && (t = $(n).parent().offset().top, $(n).prev().length > 0 && (t = $(n).prev().offset().top), $(n).next().length > 0 && (i = $(n).next().offset().top));
        e = !0;
        $("body").hasClass("scroll-up") ? (pageLoadLeftNavSelector = !1, i = i - $("#header").height() - $(n).height(), $("body").hasClass("secondary-menu-added") && (i -= 60)) : $("body").hasClass("scroll-down") ? (pageLoadLeftNavSelector = !1, $(window).scrollTop() + $(window).innerHeight() / 2 < t && (e = !1)) : pageLoadLeftNavSelector = !0;
        o > t && s < i && e && (leftNavClickEventTriggered || (pageLoadLeftNavSelector == !1 ? ($(".nav-content a").removeClass("nav-active"), $('.nav-content a[href="\\#' + u + '"]').addClass("nav-active"), sessionStorage.setItem(window.location.pathnam, u)) : leftNavSelectoronPageLoad.push(u)), $(".nav-content.sticky-nav").length > 0 && (r = $('.nav-content a[href="\\#' + u + '"]')[0], $("body").hasClass("scroll-down") ? (f = $(".left-nav-links-container").offset().top + ($(".left-nav-links-container").height() - 40), $(r).offset().top > f && $(".left-nav-links-container").scrollTop($(".left-nav-links-container").scrollTop() + $(r).outerHeight() + 40)) : (f = $(".left-nav-links-container").offset().top, $(r).offset().top < f && $(".left-nav-links-container").scrollTop($(".left-nav-links-container").scrollTop() - $(r).outerHeight()))))
    }
}
function titleCase(n) {
    n = n.split(" ");
    for (var t = 0; t < n.length; t++) titleCaseExcludeWords.indexOf(n[t]) == -1 && (n[t] = n[t].charAt(0).toUpperCase() + n[t].slice(1)), n[t] == "and" && (n[t] = "&");
    return n.join(" ")
}
function accessbilityEnterEvent(n, t, i) {
    n == 13 && ($(t).click(), window.setTimeout(function() {
        $(i).focus()
    }, 0))
}
function serviceLandingShowMore() {
    var t = Math.floor($(".SericePageSearchResults li").length / 10) + 1,
        i = $(".SericePageSearchResults ul li:last"),
        n = "";
    n = location.search == "" ? "/api/sitecore/ServicePage/GetSearchResults?character=A" : "/api/sitecore/ServicePage/GetSearchResults" + location.search;
    $.ajax({
        url: n,
        type: "POST",
        data: {
            PageNumber: t
        },
        success: function(n) {
            if (n != "") {
                $(".SericePageSearchResults ul").append(n);
                var t = $(".SericePageSearchResults ul li").length;
                $("html, body").animate({
                    scrollTop: i.offset().top - 50
                }, 1e3);
                t == $(".SericePageSearchResults").data("total") ? ($(".SericePageSearchResults .show-more-element").hide(), $(".SericePageSearchResults .show-less-element").show()) : $(".SericePageSearchResults .show-more-element span").text($(".SericePageSearchResults").data("total") - t)
            } else console.log(n)
        },
        error: function() {
            console.log("error occured")
        }
    })
}
function globalSearchTabSelector() {
    $("#TargetSearchPageTab").length > 0 && MHO.Util.SetCookie("TargetSearchPageTab", $("#TargetSearchPageTab").attr("value"))
}
function generateFilterArr(n, t, i) {
    var r = {};
    r.dropdown = n;
    r.item = t;
    i == "add" ? filterSelectedArr.push(r) : filterSelectedArr = filterSelectedArr.filter(function(n) {
        return n.item != r.item
    })
}
function globalFilterApplied(n) {
    var i, t;
    if ($(".filters-applied-content").html(""), n = n.reduce(function(n, t) {
        var i = n.filter(function(n) {
            return t.dropdown == n.dropdown && t.item == n.item
        });
        return i.length == 0 && n.push(t), n
    }, []), n.length != 0) {
        for (i = "<ul>", t = 0; t < n.length; t++) i += '<li><div class="filtered-item"><a role="button" data-dropdown="' + n[t].dropdown + '" data-item="' + n[t].item + '" class="filtered-item-close"><\/a><span class="filtered-item-name">' + n[t].item + "<\/span><\/div><\/li>";
        i += "<\/ul>";
        $(".filters-applied-content").html(i);
        $(".filters-applied").addClass("d-block")
    } else $(".filters-applied").addClass("d-none"), $(".filters-applied").removeClass("d-block");
    screen.width < 991 && calcFilterCount()
}
function setClickEventForinternalPagelink() {
    $("a[href^='#']").click(function(n) {
        var r = $(this).attr("href"),
            t, i, u;
        r = r.split("#");
        r.length > 1 && r[1] != "" && (t = $('a[name="' + r[1] + '"]'), t.length == 0 && $(this).parents(".nav-content").length == 0 && (t = $("#" + r[1])), t.length > 0 && (n.preventDefault(), i = t.offset().top, i = $(window).width() >= 991 ? i - 60 : i - 72, i < $(window).scrollTop() && (i = i - $("#header").height()), $("body").hasClass("secondary-menu-added") && (i = i - $(".hospital-nav-menu-wrapper").height()), $(".nav-content").length > 0 && ($(t).hasClass("h2title-underline") || $(t).parent("h2").length > 0) ? (u = $(t).hasClass("h2title-underline") ? $(t).attr("id") : $(t).parent("h2").attr("id"), sessionStorage.setItem(window.location.pathnam, u), $(".nav-content a").removeClass("nav-active"), $('.nav-content a[href="#' + u + '"]').addClass("nav-active"), leftNavClickEventTriggered = !0, $("html, body").animate({
            scrollTop: i
        }, 800, function() {
            $(t).focus();
            setTimeout(function() {
                leftNavClickEventTriggered = !1
            }, 100)
        })) : $(this).parents(".alphabet-pagination-list").length == 0 && $("html, body").animate({
            scrollTop: i
        }, 1e3)))
    })
}
function multiExpandCollapse(n) {
    $(n + " .values-selected").removeClass("values-selected-exp");
    $(n + " .filter-showmore").remove();
    $(n + " .values-selected p").length >= 4 ? ($(n + " .values-selected").addClass("values-selected-exp"), $(n + " .values-selected").after("<div role='button' aria-expanded='false' class='filter-showmore'>Show More <\/div>")) : $(n + " .values-selected p").length < 4 && ($(n + " .values-selected").removeClass("values-selected-exp"), $(n + " .filter-showmore").remove())
}
function toggleDummyFacet(n) {
    n.siblings(".search-dropdown-list").toggle();
    n.toggleClass("up");
    $(n).hasClass("up") ? $(n).attr("aria-expanded", "true") : $(n).attr("aria-expanded", "false")
}
function setTopForSecondaryMenu() {
    if ($(".secondary-menu-added").length > 0 && $("header .alert").length > 0) if ($("body").hasClass("scroll-up")) {
        var n = $("#header").outerHeight() + "px",
            t = "translate3d(0," + n + ",0)";
        $(".hospital-nav-menu-wrapper").css("transform", t)
    } else $(".hospital-nav-menu-wrapper").css("transform", "translate3d(0,0,0)")
}
function setTopForLeftNavonMobileView() {
    var n = 0;
    n = $("body").hasClass("secondary-menu-added") ? $("body").hasClass("scroll-down") ? $(".hospital-nav-menu-wrapper").outerHeight() + 5 : $(".hospital-nav-menu-wrapper").outerHeight() + $("#header").outerHeight() + 5 : $("body").hasClass("scroll-down") ? 5 : $("#header").outerHeight() + 5;
    $(".nav-content").css({
        top: n + "px"
    })
}
function setHeaderViewOnPageScroll(n) {
    var t, i;
    $("body").hasClass("hamburger-opened") || (t = window.pageYOffset, n == "scrollEvn" ? t <= 0 ? (body.classList.remove(scrollUp), $("body").removeClass("sticky-header"), body.classList.remove(scrollDown)) : ($("body").addClass("sticky-header"), t > lastScroll && !body.classList.contains(scrollDown) ? (body.classList.remove(scrollUp), body.classList.add(scrollDown), sessionStorage.setItem("headerStats" + window.location.pathname, scrollDown)) : t < lastScroll && body.classList.contains(scrollDown) && (body.classList.remove(scrollDown), body.classList.add(scrollUp), sessionStorage.setItem("headerStats" + window.location.pathname, scrollUp))) : (i = sessionStorage.getItem("headerStats" + window.location.pathname), i && ($("body").addClass("sticky-header"), i == scrollDown ? (body.classList.remove(scrollUp), body.classList.add(scrollDown)) : i == scrollUp && (body.classList.remove(scrollDown), body.classList.add(scrollUp)))), lastScroll = t, setTopForSecondaryMenu(), $(window).width() <= 991 && setTopForLeftNavonMobileView())
}
function setBottomSpaceForFooter() {
    if ($(".fixed-btns").length > 0 && $("body").hasClass("full-width-image-banner")) if ($(window).width() <= 767) $("#footer .mho-bg-dark-blue").css("padding-bottom", $("#footer .fixed-btns").outerHeight());
    else if ($(window).width() <= 991) $("#footer .mho-bg-dark-blue").css("padding-bottom", 100);
    else if ($("#footer .mho-bg-dark-blue .button-yellow-bg a:first").length > 0) {
        var n = $(window).width() - $("#footer .mho-bg-dark-blue .button-yellow-bg a:first")[0].getBoundingClientRect().right;
        $(".heading-cta-banner .fixed-btns").outerWidth() + 30 > n && $("#footer .mho-bg-dark-blue").css("padding-bottom", 80)
    } else $("#footer .mho-bg-dark-blue").css("padding-bottom", 52)
}
function cloneBannerButtonsForSticky() {
    $("#footer .fixed-btns").length == 0 && ($(".fixed-btns").clone().appendTo($("#footer")), $("#footer .fixed-btns").removeClass("fixed-btns-right"), $("#footer .fixed-btns").children().wrapAll("<div class='fixed-btn-inner'><\/div>"), $("#footer .fixed-btns .button-with-border a").focusin(function() {
        var n = $(this).attr("class").split(" ").join(".");
        $("." + n).addClass("focus-style")
    }), $("#footer .fixed-btns .button-with-border a").focusout(function() {
        var n = $(this).attr("class").split(" ").join(".");
        $("." + n).removeClass("focus-style")
    }))
}
function secondaryMenuScrollEvent() {
    var n = $(".hospital-menu-list").height();
    $(".hospital-menu-list").get(0).scrollHeight > n && ($(".hospital-nav-menu").addClass("hospital-menu-scorll-avail"), $(".hospital-menu-list").scrollTop() + $(".hospital-menu-list").innerHeight() + 10 >= $(".hospital-menu-list")[0].scrollHeight ? $(".hospital-nav-menu").addClass("end-reached") : $(".hospital-nav-menu").removeClass("end-reached"))
}
function addRelativeSearchResult(n) {
    var t, i, r;
    if ($(".content-search-results").length > 0 && $("#header").hasClass("search-opened") && $(".close-btn img").click(), $(".related-search").length > 0) isRelativeSearchTriggered == !1 && (isRelatedSearchSrc = n, setTimeout(function() {
        constructRelativeSearch(isRelatedSearchSrc)
    }, 2500));
    else if (t = $(n).parents(".component.search-box").find(".tt-menu").find(".sugesstion-item"), t.length > 0) {
        for (i = "", r = 0; r < t.length; r++) i = i == "" ? $(t[r]).text() : i + "," + $(t[r]).text();
        sessionStorage.setItem("related-search", i)
    }
}
function constructRelativeSearch(n) {
    var t, r, i;
    if (t = n == "pageload" && sessionStorage.getItem("related-search") != null ? sessionStorage.getItem("related-search").split(",") : $(n).parents(".component.search-box").find(".tt-menu").find(".sugesstion-item"), $(".related-search .link-list > .row > div").remove(), t.length > 0) {
        for (t.length % 2 == 0 ? $(".related-search").addClass("even-items") : $(".related-search").addClass("odd-items"), r = "", i = 0; i < t.length; i++) r += n == "pageload" ? '<div class="col-lg-6" role="listitem"><a href="#">' + t[i] + "<\/a><\/div>" : '<div class="col-lg-6" role="listitem"><a href="#">' + $(t[i]).text() + "<\/a><\/div>";
        $(r).appendTo($(".related-search .link-list > .row"));
        $(".related-search").show();
        MHO.Util.titleUnderlineSection($(".related-search"))
    } else $(".related-search").hide();
    isRelativeSearchTriggered = !1
}
function initResultSlider() {
    $(".results-type-carousel ul").length > 0 && setTimeout(function() {
        var n = 1,
            t;
        $(".results-type-carousel").hasClass("col-8-result-carousel") ? (n = 3, slidetoshow = 3) : (n = 4, slidetoshow = 4);
        ConstructPagination($(".results-type-carousel ul"));
        $(".results-type-carousel ul.search-result-list").slick({
            slide: "li",
            arrows: !0,
            infinite: !1,
            speed: 300,
            slidesToShow: slidetoshow,
            slidesToScroll: n,
            responsive: [{
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        $(".results-type-carousel ul .slick-slide .field-title a").each(function() {
            $(this).height() > 60 && $(".results-type-carousel").not(".date-title-tag").length > 0 && $(this).parent().addClass("long-title")
        });
        $(".results-type-carousel ul .slick-slide>p").each(function() {
            $(this).height() > 60 && $(this).addClass("long-desc")
        });
        $(".results-type-carousel.col-8-result-carousel ul .slick-slide .field-content>p:first-child").each(function() {
            $(this).height() > 60 && $(this).addClass("long-desc")
        });
        $(".results-type-carousel.col-8-result-carousel ul .slick-slide .field-content>p:not(:first-child), .results-type-carousel.col-8-result-carousel ul .slick-slide .field-content>a, .results-type-carousel.col-8-result-carousel ul .slick-slide .field-content>img").hide();
        ($(".results-type-carousel .migrated_blogs").length > 0 || $(".results-type-carousel .textwidget").length > 0) && (t = $(".results-type-carousel .migrated_blogs").length > 0 ? $(".results-type-carousel .migrated_blogs") : $(".results-type-carousel .textwidget"), $(t).each(function() {
            var n = $(this),
                t;
            $(n).find("p").filter(function() {
                return this.innerHTML == "&nbsp;" || this.innerHTML == ""
            }).remove();
            t = "";
            $("body").hasClass("on-page-editor") ? (t = $(n).find("*:not(.scChromeData)").text(), $(n).empty(), $(n).append("<p>" + t + "<\/p>")) : (t = $(n).text(), $(n).empty(), $(n).append("<p>" + t + "<\/p>"))
        }))
    }, 100)
}
function getCurrentUserLocation(n) {
    navigator.geolocation ? navigator.geolocation.getCurrentPosition(function(t) {
        n == "add-location-popup-form" && location.reload();
        MHO.Util.GetCookie("LatLon") == "" && MHO.Util.GetCookie("CustomLatLon") == "" ? (MHO.Util.SetCookieNeverExpire("LatLon", t.coords.latitude + "|" + t.coords.longitude), setDistance(), (n == "search-current-location" || n == "global_search") && MHO.Util.SetWindowLocationHashOfLatLon(MHO.Util.GetCookie("LatLon"), $(".content-search-results")), showPosition(t, n)) : (readZipCode(), setDistance());
        gettingCurrentUserLocation = !0;
        $(".geolocation-denied-error-msg").hide()
    }, function(t) {
        readZipCode();
        setDistance();
        t.code == t.PERMISSION_DENIED && (gettingCurrentUserLocation = !1, (n == "add-location-popup-form" || n == "search-current-location" || n == "class_events_form" || n == "Raa-locationForm" || n == "global_search") && $(".geolocation-denied-error-msg").show())
    }) : (console.log("Your browser does not support geolocation"), readZipCode(), setDistance())
}
function readZipCode() {
    var n = MHO.Util.GetCookie("PreferredZipcode"),
        t;
    if (n != "" ? ($(".find_care_now_cmpt .location-search-box-input").val(n), $(".zipcode-label").text(n)) : (n = MHO.Util.GetCookie("CurrentZipcode"), n != "" && ($(".find_care_now_cmpt .location-search-box-input").val(n), $(".zipcode-label").text(n))), n == "" ? ($(".with-location").css("display", "block"), $(".with-out-location").css("display", "none")) : ($(".with-location").css("display", "none"), $(".with-out-location").css("display", "block")), MHO.Util.GetLatLongFromCookie() != "") $(".fad-url").each(function(n) {
        if (n == 0 && $(this).attr("href").indexOf(encodeURI(MHO.Util.GetLatLongFromCookie())) >= 0) return !1;
        changeGparameValueOnClickBeforeRedirect(this)
    }), $(".fal-url").each(function(n) {
        if (n == 0 && $(this).attr("href").indexOf(encodeURI(MHO.Util.GetLatLongFromCookie())) >= 0) return !1;
        changeGparameValueOnClickBeforeRedirect(this)
    });
    else for (t = 0; t < $(".poi-url.doctor-advanced-search-link").length; t++) updatePOIurlWithQueryParame($(".poi-url.doctor-advanced-search-link")[t])
}
function readCustomUserLocation() {
    var n = $(".location-popup");
    $($(n).find('input[name ="zip_code"]')[0]).val(MHO.Util.GetCookie("CustomLatLon") != "" ? MHO.Util.GetCookie("PreferredFormattedAddressShort") : MHO.Util.GetCookie("CurrentFormattedAddressShort"))
}
function showPosition(n, t) {
    var i = n.coords.latitude,
        r = n.coords.longitude,
        u = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + i + "," + r + "&key=AIzaSyCKc448sNyqNBwZuYhOn2YQrPFho2bYBGc";
    $.ajax({
        type: "GET",
        url: u,
        dataType: "json",
        success: function(n) {
            setCurrentZipcodeFromResult(n.results, t, "CurrentZipcode");
            var i = "";
            window.location.pathname == "/doctors" ? (i += "doctors#doctorssearch_g=" + encodeURI(MHO.Util.GetLatLongFromCookie()) + "&doctorssearch_distance%20by%20miles=25000&doctorssearch_o=Distance%2CAscending", window.location.href = i) : window.location.pathname == "/locations" && (i += "locations#locationsearch_g=" + encodeURI(MHO.Util.GetLatLongFromCookie()) + "&locationsearch_distance%20by%20miles=25000&locationsearch_o=Distance%2CAscending", window.location.href = i)
        },
        error: function(n) {
            console.log(n.responseText)
        }
    })
}
function showPositionWithLatLon(n, t, i) {
    var r = n,
        u = t,
        f = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + r + "," + u + "&key=AIzaSyCKc448sNyqNBwZuYhOn2YQrPFho2bYBGc";
    getAddressUsingLatLongInprogress || (getAddressUsingLatLongInprogress = !0, $.ajax({
        type: "GET",
        url: f,
        dataType: "json",
        success: function(n) {
            if (i == "FromAutoFillReload" || i == "FromAutoFill") {
                var t = n.results[0].address_components.filter(function(n) {
                    return n.types == "postal_code"
                });
                t.length > 0 && MHO.Util.SetCookieNeverExpire("PreferredZipcode", t[0].long_name);
                i == "FromAutoFillReload" && location.reload()
            } else setCurrentZipcodeFromResult(n.results, i, "CurrentZipcode");
            getAddressUsingLatLongInprogress = !1
        },
        error: function(n) {
            console.log(n.responseText)
        }
    }))
}
function getDistanceFromLatLonInKm(n, t, i, r) {
    var u = deg2rad(i - n),
        f = deg2rad(r - t),
        e = Math.sin(u / 2) * Math.sin(u / 2) + Math.cos(deg2rad(n)) * Math.cos(deg2rad(i)) * Math.sin(f / 2) * Math.sin(f / 2),
        o = 2 * Math.atan2(Math.sqrt(e), Math.sqrt(1 - e));
    return 3959 * o
}
function deg2rad(n) {
    return n * (Math.PI / 180)
}
function setDistance() {
    var t = "",
        i = "",
        n = MHO.Util.GetCookie("CustomLatLon");
    n != "" ? (n = n.split("|"), t = n[0], i = n[1]) : (n = MHO.Util.GetCookie("LatLon"), n != "" && (n = n.split("|"), t = n[0], i = n[1]));
    n != "" && ($("[data-lat]").length > 0 && ($("[data-lat]").each(function() {
        var n = $(this),
            u = $(n).data("lat"),
            f = $(n).data("lon"),
            r = getDistanceFromLatLonInKm(u, f, t, i).toFixed(2);
        isNaN(r) == !1 ? $(n).find(".distance-val").text(r) : console.log("error", r)
    }), $(".location-component-container").each(function() {
        $($(this)).find(".location-component-content").sort(asc_sort(".distance-val")).appendTo($(this))
    })), MHO.Util.setOriginForDirection())
}
function setHeightForBanner() {
    if ($(".heading-cta-banner").length > 0 && $(".heading-cta-banner .location-address").length > 0) if (window.matchMedia("(min-width: 991px)").matches) {
        var n = $(".heading-cta-banner .btn-position-right > .component-content").outerHeight() + $(".heading-cta-banner .location-address > div").outerHeight();
        $(".heading-cta-banner .field-MainImage img").outerHeight() < n && $(".heading-cta-banner .field-MainImage img").css("min-height", n)
    } else $(".heading-cta-banner .field-MainImage img").css("min-height", "auto")
}
function getLatLongFromUserDataAjax(n, t, i, r) {
    var u = "https://maps.googleapis.com/maps/api/geocode/json?address=" + t.replace(/[^a-z0-9,\s]/gi, "") + "&key=AIzaSyCKc448sNyqNBwZuYhOn2YQrPFho2bYBGc";
    $.ajax({
        type: "GET",
        url: u,
        dataType: "json",
        success: function(t) {
            var i = t.results,
                u, f;
            if (i.length > 0) {
                if (u = i[0].geometry.location.lat, f = i[0].geometry.location.lng, MHO.Util.SetCookieNeverExpire("CustomLatLon", u + "|" + f), n == "locationForm") {
                    localStorage.setItem("customeUserLocation", r);
                    setCurrentZipcodeFromResult(i, n, "PreferredZipcode");
                    location.reload();
                    return
                }
                n == "userInputBox" ? MHO.Util.SetWindowLocationHashOfLatLon(MHO.Util.GetCookie("CustomLatLon"), $(".content-search-results")) : n == "class_events_form" || (n == "Raa-locationForm" || n == "global_search") && (localStorage.setItem("customeUserLocation", r), $(".location-popup .add_loctionnclose_icon").click(), n == "global_search" && MHO.Util.SetWindowLocationHashOfLatLon(MHO.Util.GetCookie("CustomLatLon"), $(".content-search-results")));
                setCurrentZipcodeFromResult(i, n, "PreferredZipcode")
            } else n == "locationForm" ? ($(".location-popup .error-message:not('.zipcode')").addClass("show"), $(".location-popup .error-message.zipcode").text($(".location-popup .error-message.zipcode").data("errorcontent")), $(".location-popup input[name =zip_code]").focus()) : n == "userInputBox" ? $(".userAddressInputFieldError").addClass("show") : n == "class_events_form" ? $(".class-events-page .error-message").show().focus() : (n == "Raa-locationForm" || n == "global_search") && ($(".location-popup .error-message:not('.zipcode')").addClass("show"), $(".location-popup .error-message.zipcode").text($(".location-popup .error-message.zipcode").data("errorcontent")), $(".location-popup input[name =zip_code]").focus())
        },
        error: function() {
            n == "locationForm" ? ($(".location-popup .error-message:not('.zipcode')").addClass("show"), $(".location-popup .error-message.zipcode").text($(".location-popup .error-message.zipcode").data("errorcontent")), $(".location-popup input[name =zip_code]").focus()) : n == "userInputBox" ? $(".userAddressInputFieldError").addClass("show") : n == "class_events_form" ? $(".class-events-page .error-message").show().focus() : (n == "Raa-locationForm" || n == "global_search") && ($(".location-popup .error-message:not('.zipcode')").addClass("show"), $(".location-popup .error-message.zipcode").text($(".location-popup .error-message.zipcode").data("errorcontent")), $(".location-popup input[name =zip_code]").focus());
            sessionStorage.getItem("userLocationOnInputBlur") == !0 && (sessionStorage.setItem("userLocationOnInputBlur", !1), $(sessionStorage.getItem("userLocationOnInputBlurPostUpdate")).trigger("click"))
        }
    })
}
function setCurrentZipcodeFromResult(n, t, i) {
    var f, u, h;
    if (n.length > 0 && (f = n[0].address_components.filter(function(n) {
        return n.types == "postal_code"
    }), f.length > 0 && MHO.Util.SetCookieNeverExpire(i, f[0].long_name), u = n[0].formatted_address, u)) {
        var r = "",
            e = n[0].address_components.filter(function(n) {
                return n.types[0] == "locality"
            }),
            o = n[0].address_components.filter(function(n) {
                return n.types[0] == "administrative_area_level_1"
            }),
            s = n[0].address_components.filter(function(n) {
                return n.types[0] == "country"
            });
        e.length > 0 && (r = e[0].long_name);
        o.length > 0 && (r += ", " + o[0].short_name);
        MHO.Util.GetCookie(i) != "" && (r += " " + MHO.Util.GetCookie(i));
        s.length > 0 && (r += u.split(",").length > 0 ? "," + u.split(",")[u.split(",").length - 1] : ", " + s[0].short_name);
        i == "CurrentZipcode" ? (MHO.Util.SetCookieNeverExpire("CurrentFormattedAddress", u), MHO.Util.SetCookieNeverExpire("CurrentFormattedAddressShort", r)) : (MHO.Util.SetCookieNeverExpire("PreferredFormattedAddress", u), MHO.Util.SetCookieNeverExpire("PreferredFormattedAddressShort", r));
        $("#userAddressInputField").val(r);
        $("#zipCodeField").val(r);
        t == "search-current-location" || t == "class_events_form" || t == "Raa-locationForm" && ($("#current-address").html(r), $(".RequestAnAppointmentSteps .userAddressInCookie .cookieAddress").html(r), h = $(".StepBody .HospitalList li"), calculateHospitalDistanceRAA(h), sortList(document.getElementsByClassName("HospitalList")[0]))
    }
    sessionStorage.getItem("userLocationOnInputBlur") == !0 && (sessionStorage.setItem("userLocationOnInputBlur", !1), $(sessionStorage.getItem("userLocationOnInputBlurPostUpdate")).trigger("click"));
    setDistance();
    readZipCode()
}
function serviceLandingShowMoreDA(n) {
    var t = $("#DefaultPhoneNumber").attr("value"),
        i = $("#OverridePhoneNumber").attr("value"),
        r;
    r = $(".RequestAnAppointmentSteps").hasClass("from-location") ? "/api/sitecore/RequestAnAppointmentLocation/GetLocationAndServicesDetails?location=" + n + "&defaultPhoneNumber=" + t + "&overridePhoneNumber=" + i : "/api/sitecore/RequestAnAppointment/GetAppointmentDetails?specialty=" + n + "&defaultPhoneNumber=" + t + "&overridePhoneNumber=" + i;
    $.ajax({
        url: r,
        type: "POST",
        success: function(i) {
            var r, u;
            i.indexOf("li") != -1 ? $(".RequestAnAppointmentSteps").hasClass("from-location") ? (r = document.createElement("div"), $(r).html(i), $(".location-detail").html($($(r).find(".address")).html()), $(".ctm-dropdown-with-search-list ul").hide(), $(".ctm-dropdown-with-search-list ul").html($($(r).find(".services")).html()), $(".ctm-dropdown-with-search-list ul li").sort(function(n, t) {
                return $(t).text().toUpperCase() < $(n).text().toUpperCase() ? 1 : -1
            }).appendTo(".ctm-dropdown-with-search-list ul"), $(".ctm-dropdown-with-search-list ul").show()) : ($(".Step1").addClass("Step1Completed"), $(".Step2").addClass("Step2Active"), $(".Step1 .StepTitle .Selected span").html(n), $(".StepBody .HospitalList").empty().append(i), $(".Step2.Step2Active .StepBody").css("display", "block"), $(".Step3.Step3Active .StepBody").css("display", "none"), $(".Step3").removeClass("Step3Active"), $(".Step2").removeClass("Step2Completed"), $(".Step3").removeClass("Step3Completed"), $(".Step2.Step2Active .StepTitle").hasClass("Nohospital") && ($(".Step2.Step2Active .Nohospital .NoHospital").css("display", "none"), $(".Step2 .StepTitle").removeClass("Nohospital")), u = $(".StepBody .HospitalList li"), u.length <= 5 && ($(".Step2 .StepBody .show-less").css("display", "none"), $(".Step2 .StepBody .show-more").css("display", "none")), calculateHospitalDistanceRAA(u), sortList(document.getElementsByClassName("HospitalList")[0])) : ($(".Step1").addClass("Step1Completed"), $(".Step2").removeClass("Step2Active"), $(".Step2 .StepTitle").removeClass("Nohospital"), $(".Step2.Step2Active .Nohospital .NoHospital").css("display", "none"), $(".Step1 .StepTitle .Selected span").html(n), $(".Step2 .StepBody").css("display", "none"), $(".Step3").addClass("Step3Active"), $(".Step2").removeClass("Step2Completed"), $(".Step3").removeClass("Step3Completed"), $(".PhoneOnly").css("display", "block"), $(".PhoneAndForm").css("display", "none"), $(".Step .phone-no").html(t), $(".phone-no").attr("href", "tel:" + t), $(".Step2.Step2Active .StepBody").css("display", "none"), $(".Step3 .StepBody").css("display", "block"), $(".RequestAnAppointmentSteps").hasClass("from-location") && $(".RequestAnAppointmentSteps .Step1").addClass("inactive"));
            $(".Step1").css("display", "block");
            MHO.Util.titleUnderlineSection($(".RequestAnAppointmentSteps"))
        },
        error: function() {
            console.log("error occured")
        }
    })
}
function sortList(n) {
    for (var r = n.cloneNode(!1), i = [], t = n.childNodes.length; t--;) n.childNodes[t].nodeName === "LI" && i.push(n.childNodes[t]);
    for (isreverse = !1, i.sort(function(n, t) {
        var r, u, i;
        for (varaData = "", varbData = "", i = 0; i < n.childNodes.length; i++) n.childNodes[i].className == "miles" && n.childNodes[i].nodeName == "P" && (r = n.childNodes[i].innerHTML);
        for (i = 0; i < t.childNodes.length; i++) t.childNodes[i].className == "miles" && t.childNodes[i].nodeName == "P" && (u = t.childNodes[i].innerHTML);
        if (r != "" && u != "") return isreverse = !0, parseInt(u, 10) - parseInt(r, 10);
        for (varaTextData = "", varbTextData = "", i = 0; i < n.childNodes.length; i++) n.childNodes[i].nodeName == "H4" && (aTextData = n.childNodes[i].innerHTML);
        for (i = 0; i < t.childNodes.length; i++) t.childNodes[i].nodeName == "H4" && (bTextData = t.childNodes[i].innerHTML);
        return aTextData.toUpperCase() == bTextData.toUpperCase() ? 0 : aTextData.toUpperCase() > bTextData.toUpperCase() ? 1 : -1
    }), isreverse == !0 && (i = i.reverse()), t = 0; t < i.length; t++) r.appendChild(i[t]);
    n.parentNode.replaceChild(r, n)
}
function calculateHospitalDistanceRAA(n) {
    var r, t, i;
    MHO.Util.GetLatLongFromCookie() != "" ? ($(".RequestAnAppointmentSteps .userAddressInCookie").css("display", "block"), $(".RequestAnAppointmentSteps .userAddressNotInCookie").css("display", "none"), r = MHO.Util.GetCookie("CustomLatLon") != "" ? MHO.Util.GetCookie("PreferredFormattedAddressShort") : MHO.Util.GetCookie("CurrentFormattedAddressShort"), $(".RequestAnAppointmentSteps .userAddressInCookie .cookieAddress").text(r)) : ($(".RequestAnAppointmentSteps .userAddressInCookie").css("display", "none"), $(".RequestAnAppointmentSteps .userAddressNotInCookie").css("display", "block"));
    [t, i] = setDistanceDA();
    $(".StepBody .HospitalList li .miles").remove();
    n.each(function(n, r) {
        lang = $(r).attr("data-location-long");
        lat = $(r).attr("data-location-lat");
        lang != "undefined" && lat != "undefined" && t != "" && i != "" && (miles = getDistanceFromLatLonInKm(lat, lang, t, i), miles = miles.toFixed(2), text = miles > 1 ? "miles away" : "mile away", miles != "NaN" && $(r).append('<p class="miles">' + miles + " " + text + "<\/p>"))
    })
}
function setDistanceDA() {
    var t = "",
        i = "",
        n = MHO.Util.GetCookie("CustomLatLon");
    return n != "" ? (n = n.split("|"), t = n[0], i = n[1]) : (n = MHO.Util.GetCookie("LatLon"), n != "" && (n = n.split("|"), t = n[0], i = n[1])), [t, i]
}
function loadServicesForRAA() {
    $.ajax({
        url: "/api/sitecore/RequestAnAppointmentData/GetRequestAnAppointmentKeywords",
        type: "POST",
        success: function(n) {
            if (n != "") {
                var t = n.split(","),
                    i = '<ul class="RAA-services-list"><li>' + t.join("<\/li><li>") + "<\/li><\/ul>";
                $(i).appendTo($(".RequestAnAppointmentSteps .SearchBox-Blue"));
                $(".RAA-services-list li").click(function() {
                    $(".RequestAnAppointmentSteps .Step1 .search-box-input.tt-input").val($(this).text());
                    $(".RAA-services-list").css("display", "none");
                    $(".RequestAnAppointmentSteps .Step1").css("padding-bottom", "0")
                });
                $(".RAA-services-list li").on("keydown", function(n) {
                    n.which == 13 && $(this).trigger("click")
                })
            } else console.log(n)
        },
        error: function() {
            console.log("error occured")
        }
    })
}
function placeAutoFill() {
    autoLocationConfigurationEnabled = !0;
    $(".address-auto-complete input").length > 0 ? autoCompletedInputElement = document.querySelector(".address-auto-complete input") : $(".location-popup #loc-zip_code").length > 0 && $(".location-popup #loc-zip_code").parents(".address-auto-complete").length == 0 && (autoCompletedInputElement = document.querySelector(".location-popup #loc-zip_code"));
    $(autoCompletedInputElement).focus(function() {
        var n = $(autoCompletedInputElement).val().trim().length;
        n > 2 && $(autoCompletedInputElement).hasClass("initialized") == !1 && initializeListenerForAutoFillElement()
    });
    $(autoCompletedInputElement).keyup(function() {
        var n = $(this).val().trim().length;
        n > 2 ? $(this).hasClass("initialized") == !1 && (console.log("intialize google api"), initializeListenerForAutoFillElement()) : $(this).hasClass("initialized") == !0 && (google.maps.event.clearInstanceListeners(autoCompletedInputElement), autocompleteLsr.remove(), google.maps.event.clearInstanceListeners(autocomplete), $(autoCompletedInputElement).removeClass("initialized"), $(".pac-container").remove(), console.log("remove initialization google api"))
    })
}
function initializeListenerForAutoFillElement() {
    if (!$("body").hasClass("on-page-editor")) {
        $(autoCompletedInputElement).addClass("initialized");
        autocomplete = new google.maps.places.Autocomplete(autoCompletedInputElement, {
            componentRestrictions: {
                country: ["us"]
            },
            fields: ["address_components", "geometry"],
            types: ["(regions)"]
        });
        autocompleteLsr = autocomplete.addListener("place_changed", fillInAddress);
        $(autoCompletedInputElement).focus(function() {
            userInputValOnFocus = $(this).val()
        });
        google.maps.event.addDomListener(autoCompletedInputElement, "blur", function() {
            try {
                $(this).val() != "" && $(this).val() != userInputValOnFocus && google.maps.event.trigger(this, "keydown", {
                    keyCode: 40
                })
            } catch (n) {}
        });
        $(autoCompletedInputElement).hasClass("enter-evt-initialized") == !1 && (function(n) {
            function t(t, r) {
                if (t == "keydown") {
                    var u = r;
                    r = function(t) {
                        var i = $(".pac-item-selected").length > 0,
                            r;
                        addLocationPopupSelected || i && t.which == 13 ? (addLocationPopupSelected = !0, addLocationPopupFireSubmit = !0) : addLocationPopupSelected = i ? !0 : !1;
                        t.which != 13 || i || (addLocationPopupFireSubmit = !1, !addLocationPopupSelected && $(".pac-item").length > 0 && (addLocationPopupSelected = !0, addLocationPopupFireSubmit = !0), r = $.Event("keydown", {
                            keyCode: 40,
                            which: 40
                        }), u.apply(n, [r]));
                        u.apply(n, [t])
                    };
                    keydownEvtListerForAufoFill != undefined && autoCompletedInputElement.removeEventListener("keydown", keydownEvtListerForAufoFill);
                    keydownEvtListerForAufoFill = r
                }
                i.apply(n, [t, r])
            }
            var i = n.addEventListener ? n.addEventListener : n.attachEvent;
            n.addEventListener = t;
            n.attachEvent = t
        }(autoCompletedInputElement), $(autoCompletedInputElement).addClass("enter-evt-initialized"))
    }
}
function fillInAddress(n) {
    var r = "",
        i, u;
    window.location.pathname == "/doctors" ? (r += "doctors#doctorssearch_g=" + encodeURI(MHO.Util.GetLatLongFromCookie()) + "&doctorssearch_distance%20by%20miles=25000&doctorssearch_o=Distance%2CAscending", window.location.href = r) : window.location.pathname == "/locations" && (r += "locations#locationsearch_g=" + encodeURI(MHO.Util.GetLatLongFromCookie()) + "&locationsearch_distance%20by%20miles=25000&locationsearch_o=Distance%2CAscending", window.location.href = r);
    const t = autocomplete.getPlace();
    if (t != undefined) {
        if ($(".location-popup").length > 0 && $(".location-popup").css("visibility") != "hidden" && n == undefined) {
            addLocationPopupSelected = !0;
            addLocationPopupFireSubmit && (addLocationPopupFireSubmit = !1, $(".location-popup button").click());
            return
        }
        addLocationPopupFireSubmit && n != undefined || ($(".address-auto-complete input").length > 0 ? (MHO.Util.SetCookieNeverExpire("PreferredFormattedAddress", $(".address-auto-complete input").val()), MHO.Util.SetCookieNeverExpire("PreferredFormattedAddressShort", $(".address-auto-complete input").val())) : $(".location-popup #loc-zip_code").length > 0 && $(".location-popup #loc-zip_code").parents(".address-auto-complete").length == 0 && (MHO.Util.SetCookieNeverExpire("PreferredFormattedAddress", $(".location-popup #loc-zip_code").val()), MHO.Util.SetCookieNeverExpire("PreferredFormattedAddressShort", $(".location-popup #loc-zip_code").val())), MHO.Util.SetCookieNeverExpire("CustomLatLon", t.geometry.location.lat() + "|" + t.geometry.location.lng()), i = t.address_components.filter(function(n) {
            return n.types == "postal_code"
        }), i.length > 0 && MHO.Util.SetCookieNeverExpire("PreferredZipcode", i[0].long_name), MHO.Util.SetWindowLocationHashOfLatLon(MHO.Util.GetCookie("CustomLatLon"), $(".content-search-results")), n && (n == "locationForm" ? (localStorage.setItem("customeUserLocation", $(".location-popup #loc-zip_code").val()), i.length == 0 ? showPositionWithLatLon(t.geometry.location.lat(), t.geometry.location.lng(), "FromAutoFillReload") : location.reload()) : n == "Raa-locationForm" ? (localStorage.setItem("customeUserLocation", $(".location-popup #loc-zip_code").val()), $(".location-popup .add_loctionnclose_icon").click(), $("#current-address").html($(".location-popup #loc-zip_code").val()), $(".RequestAnAppointmentSteps .userAddressInCookie .cookieAddress").html($(".location-popup #loc-zip_code").val()), u = $(".StepBody .HospitalList li"), calculateHospitalDistanceRAA(u), sortList(document.getElementsByClassName("HospitalList")[0])) : n == "global_search" && (localStorage.setItem("customeUserLocation", $(".location-popup #loc-zip_code").val()), $(".location-popup .add_loctionnclose_icon").click())), i.length == 0 && showPositionWithLatLon(t.geometry.location.lat(), t.geometry.location.lng(), "FromAutoFill"), setDistance(), readZipCode())
    }
}
function asc_sort(n) {
    return function(t, i) {
        var u = $($(i).find(n)).text(),
            r;
        return u = isNaN(u) ? u : parseFloat(u), r = $($(t).find(n)).text(), r = isNaN(r) ? r : parseFloat(r), u < r ? 1 : -1
    }
}
function changeGparameValueOnClickBeforeRedirect(n) {
    var t = $(n).attr("href").indexOf("#") >= 0 ? $(n).attr("href") + "&" : $(n).attr("href") + "#";
    t += $(n).hasClass("fad-url") ? "doctorssearch_g=" + encodeURI(MHO.Util.GetLatLongFromCookie()) + "&doctorssearch_distance%20by%20miles=25000&doctorssearch_o=Distance%2CAscending" : "locationsearch_g=" + encodeURI(MHO.Util.GetLatLongFromCookie()) + "&locationsearch_distance%20by%20miles=25000&locationsearch_o=Distance%2CAscending";
    $(n).attr("href", t);
    updatePOIurlWithQueryParame(n)
}
function updatePOIurlWithQueryParame(n) {
    var t, f, e, i, h;
    if ($(n).hasClass("doctor-advanced-search-link")) {
        t = $(n).parents(".link").attr("id");
        t = t.indexOf("doctor") != -1 ? "doctorssearch_q=" : "locationsearch_q=";
        var u = $(n).attr("href"),
            r, s = window.location.href.split("#")[1],
            o = s.substring(0).split("&");
        for (f = 0; f < o.length; f++) if (e = o[f].split("="), e[0] == "q" || e[0] == "globalsearch_q") {
            r = e[1];
            break
        }
        u.indexOf(t) >= 0 ? (i = u.split("&"), $(i).each(function(n) {
            if (i[n].indexOf(t) >= 0) {
                var u = i[n].split("=");
                u[1] = r ? r : "";
                i[n] = u.join("=");
                h = n
            }
        }), r == undefined && i.length == 1 && (i[0] = i[0].replace("#locationsearch_q=", "")), $(n).attr("href", i.join("&"))) : (t = u.indexOf("#") >= 0 ? "&" + t : "#" + t, r ? $(n).attr("href", u + t + r) : "")
    }
}
function isIphone() {
    var n = navigator.platform.toLowerCase();
    return n == "iphone" ? !0 : !1
}
function getCurrentESTTime() {
    return offset = -5, currentDate = new Date, utc = currentDate.getTime() + currentDate.getTimezoneOffset() * 6e4, serverDate = new Date(utc + 36e5 * offset), serverDate.toLocaleString()
}
function getCurrentESTTime() {
    return offset = -5, currentDate = new Date, utc = currentDate.getTime() + currentDate.getTimezoneOffset() * 6e4, serverDate = new Date(utc + 36e5 * offset), serverDate.toLocaleString()
}
var blogsPageCounter, blogsPageFeaturedResultHasData, FCalendar570, hospitalData, currentUserLoc, map, calendertest, calendertestdate, defaultTitleNews, $jscomp, $jscomp$lookupPolyfilledValue, mutationObservers, videoWrappersIframes, observer, MHO, getAddressUsingLatLongInprogress, autoCompletedInputElement, keydownEvtListerForAufoFill;
(function(n, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : n.Popper = t()
})(this, function() {
    "use strict";

    function ut(n) {
        return n && "[object Function]" === {}.toString.call(n)
    }
    function e(n, t) {
        if (1 !== n.nodeType) return [];
        var i = window.getComputedStyle(n, null);
        return t ? i[t] : i
    }
    function y(n) {
        return "HTML" === n.nodeName ? n : n.parentNode || n.host
    }
    function o(n) {
        if (!n || -1 !== ["HTML", "BODY", "#document"].indexOf(n.nodeName)) return window.document.body;
        var t = e(n),
            i = t.overflow,
            r = t.overflowX,
            u = t.overflowY;
        return /(auto|scroll)/.test(i + u + r) ? n : o(y(n))
    }
    function r(n) {
        var t = n && n.offsetParent,
            i = t && t.nodeName;
        return i && "BODY" !== i && "HTML" !== i ? -1 !== ["TD", "TABLE"].indexOf(t.nodeName) && "static" === e(t, "position") ? r(t) : t : window.document.documentElement
    }
    function ri(n) {
        var t = n.nodeName;
        return "BODY" !== t && ("HTML" === t || r(n.firstElementChild) === n)
    }
    function p(n) {
        return null === n.parentNode ? n : p(n.parentNode)
    }
    function h(n, t) {
        var i, f;
        if (!n || !n.nodeType || !t || !t.nodeType) return window.document.documentElement;
        var e = n.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            o = e ? n : t,
            s = e ? t : n,
            u = document.createRange();
        return (u.setStart(o, 0), u.setEnd(s, 0), i = u.commonAncestorContainer, n !== i && t !== i || o.contains(s)) ? ri(i) ? i : r(i) : (f = p(n), f.host ? h(f.host, t) : h(n, p(t).host))
    }
    function u(n) {
        var f = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top",
            t = "top" === f ? "scrollTop" : "scrollLeft",
            i = n.nodeName,
            r, u;
        return "BODY" === i || "HTML" === i ? (r = window.document.documentElement, u = window.document.scrollingElement || r, u[t]) : n[t]
    }
    function ui(n, t) {
        var e = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            r = u(t, "top"),
            f = u(t, "left"),
            i = e ? -1 : 1;
        return n.top += r * i, n.bottom += r * i, n.left += f * i, n.right += f * i, n
    }
    function ft(n, t) {
        var i = "x" === t ? "Left" : "Top",
            r = "Left" == i ? "Right" : "Bottom";
        return +n["border" + i + "Width"].split("px")[0] + +n["border" + r + "Width"].split("px")[0]
    }
    function et(n, t, r, u) {
        return i(t["offset" + n], r["client" + n], r["offset" + n], l() ? r["offset" + n] + u["margin" + ("Height" === n ? "Top" : "Left")] + u["margin" + ("Height" === n ? "Bottom" : "Right")] : 0)
    }
    function ot() {
        var t = window.document.body,
            n = window.document.documentElement,
            i = l() && window.getComputedStyle(n);
        return {
            height: et("Height", t, n, i),
            width: et("Width", t, n, i)
        }
    }
    function t(t) {
        return n({}, t, {
            right: t.left + t.width,
            bottom: t.top + t.height
        })
    }
    function w(n) {
        var i = {}, f, o, c;
        if (l()) try {
            i = n.getBoundingClientRect();
            f = u(n, "top");
            o = u(n, "left");
            i.top += f;
            i.left += o;
            i.bottom += f;
            i.right += o
        } catch (n) {} else i = n.getBoundingClientRect();
        var r = {
            left: i.left,
            top: i.top,
            width: i.right - i.left,
            height: i.bottom - i.top
        }, a = "HTML" === n.nodeName ? ot() : {}, v = a.width || n.clientWidth || r.right - r.left,
            y = a.height || n.clientHeight || r.bottom - r.top,
            s = n.offsetWidth - v,
            h = n.offsetHeight - y;
        return (s || h) && (c = e(n), s -= ft(c, "x"), h -= ft(c, "y"), r.width -= s, r.height -= h), t(r)
    }
    function b(n, i) {
        var y = l(),
            b = "HTML" === i.nodeName,
            u = w(n),
            p = w(i),
            c = o(n),
            f = e(i),
            a = +f.borderTopWidth.split("px")[0],
            v = +f.borderLeftWidth.split("px")[0],
            r = t({
                top: u.top - p.top - a,
                left: u.left - p.left - v,
                width: u.width,
                height: u.height
            }),
            s, h;
        return (r.marginTop = 0, r.marginLeft = 0, !y && b) && (s = +f.marginTop.split("px")[0], h = +f.marginLeft.split("px")[0], r.top -= a - s, r.bottom -= a - s, r.left -= v - h, r.right -= v - h, r.marginTop = s, r.marginLeft = h), (y ? i.contains(c) : i === c && "BODY" !== c.nodeName) && (r = ui(r, i)), r
    }
    function fi(n) {
        var r = window.document.documentElement,
            f = b(n, r),
            e = i(r.clientWidth, window.innerWidth || 0),
            o = i(r.clientHeight, window.innerHeight || 0),
            s = u(r),
            h = u(r, "left"),
            c = {
                top: s - f.top + f.marginTop,
                left: h - f.left + f.marginLeft,
                width: e,
                height: o
            };
        return t(c)
    }
    function st(n) {
        var t = n.nodeName;
        return "BODY" === t || "HTML" === t ? !1 : "fixed" === e(n, "position") || st(y(n))
    }
    function k(n, t, i, r) {
        var u = {
            top: 0,
            left: 0
        }, s = h(n, t),
            e, f;
        if ("viewport" === r) u = fi(s);
        else if ("scrollParent" === r ? (e = o(y(n)), "BODY" === e.nodeName && (e = window.document.documentElement)) : e = "window" === r ? window.document.documentElement : r, f = b(e, s), "HTML" !== e.nodeName || st(s)) u = f;
        else {
            var c = ot(),
                l = c.height,
                a = c.width;
            u.top += f.top - f.marginTop;
            u.bottom = l + f.top;
            u.left += f.left - f.marginLeft;
            u.right = a + f.left
        }
        return u.left += i, u.top += i, u.right -= i, u.bottom -= i, u
    }
    function ei(n) {
        var t = n.width,
            i = n.height;
        return t * i
    }
    function ht(t, i, r, u, f) {
        var l = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === t.indexOf("auto")) return t;
        var e = k(r, u, l, f),
            o = {
                top: {
                    width: e.width,
                    height: i.top - e.top
                },
                right: {
                    width: e.right - i.right,
                    height: e.height
                },
                bottom: {
                    width: e.width,
                    height: e.bottom - i.bottom
                },
                left: {
                    width: i.left - e.left,
                    height: e.height
                }
            }, s = Object.keys(o).map(function(t) {
                return n({
                    key: t
                }, o[t], {
                    area: ei(o[t])
                })
            }).sort(function(n, t) {
                return t.area - n.area
            }),
            h = s.filter(function(n) {
                var t = n.width,
                    i = n.height;
                return t >= r.clientWidth && i >= r.clientHeight
            }),
            a = 0 < h.length ? h[0].key : s[0].key,
            c = t.split("-")[1];
        return a + (c ? "-" + c : "")
    }
    function ct(n, t, i) {
        var r = h(t, i);
        return b(i, r)
    }
    function lt(n) {
        var t = window.getComputedStyle(n),
            i = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
            r = parseFloat(t.marginLeft) + parseFloat(t.marginRight);
        return {
            width: n.offsetWidth + r,
            height: n.offsetHeight + i
        }
    }
    function c(n) {
        var t = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return n.replace(/left|right|bottom|top/g, function(n) {
            return t[n]
        })
    }
    function at(n, t, i) {
        i = i.split("-")[0];
        var r = lt(n),
            e = {
                width: r.width,
                height: r.height
            }, u = -1 !== ["right", "left"].indexOf(i),
            o = u ? "top" : "left",
            f = u ? "left" : "top",
            s = u ? "height" : "width",
            h = u ? "width" : "height";
        return e[o] = t[o] + t[s] / 2 - r[s] / 2, e[f] = i === f ? t[f] - r[h] : t[c(f)], e
    }
    function s(n, t) {
        return Array.prototype.find ? n.find(t) : n.filter(t)[0]
    }
    function oi(n, t, i) {
        if (Array.prototype.findIndex) return n.findIndex(function(n) {
            return n[t] === i
        });
        var r = s(n, function(n) {
            return n[t] === i
        });
        return n.indexOf(r)
    }
    function vt(n, i, r) {
        var u = void 0 === r ? n : n.slice(0, oi(n, "name", r));
        return u.forEach(function(n) {
            n.
            function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var r = n.
                function || n.fn;
            n.enabled && ut(r) && (i.offsets.popper = t(i.offsets.popper), i.offsets.reference = t(i.offsets.reference), i = r(i, n))
        }), i
    }
    function si() {
        if (!this.state.isDestroyed) {
            var n = {
                instance: this,
                styles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            n.offsets.reference = ct(this.state, this.popper, this.reference);
            n.placement = ht(this.options.placement, n.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);
            n.originalPlacement = n.placement;
            n.offsets.popper = at(this.popper, n.offsets.reference, n.placement);
            n.offsets.popper.position = "absolute";
            n = vt(this.modifiers, n);
            this.state.isCreated ? this.options.onUpdate(n) : (this.state.isCreated = !0, this.options.onCreate(n))
        }
    }
    function yt(n, t) {
        return n.some(function(n) {
            var i = n.name,
                r = n.enabled;
            return r && i === t
        })
    }
    function pt(n) {
        for (var i, r, u = [!1, "ms", "Webkit", "Moz", "O"], f = n.charAt(0).toUpperCase() + n.slice(1), t = 0; t < u.length - 1; t++) if (i = u[t], r = i ? "" + i + f : n, "undefined" != typeof window.document.body.style[r]) return r;
        return null
    }
    function hi() {
        return this.state.isDestroyed = !0, yt(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.left = "", this.popper.style.position = "", this.popper.style.top = "", this.popper.style[pt("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }
    function wt(n, t, i, r) {
        var f = "BODY" === n.nodeName,
            u = f ? window : n;
        u.addEventListener(t, i, {
            passive: !0
        });
        f || wt(o(u.parentNode), t, i, r);
        r.push(u)
    }
    function ci(n, t, i, r) {
        i.updateBound = r;
        window.addEventListener("resize", i.updateBound, {
            passive: !0
        });
        var u = o(n);
        return wt(u, "scroll", i.updateBound, i.scrollParents), i.scrollElement = u, i.eventsEnabled = !0, i
    }
    function li() {
        this.state.eventsEnabled || (this.state = ci(this.reference, this.options, this.state, this.scheduleUpdate))
    }
    function ai(n, t) {
        return window.removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(n) {
            n.removeEventListener("scroll", t.updateBound)
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
    }
    function vi() {
        this.state.eventsEnabled && (window.cancelAnimationFrame(this.scheduleUpdate), this.state = ai(this.reference, this.state))
    }
    function d(n) {
        return "" !== n && !isNaN(parseFloat(n)) && isFinite(n)
    }
    function g(n, t) {
        Object.keys(t).forEach(function(i) {
            var r = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(i) && d(t[i]) && (r = "px");
            n.style[i] = t[i] + r
        })
    }
    function yi(n, t) {
        Object.keys(t).forEach(function(i) {
            var r = t[i];
            !1 === r ? n.removeAttribute(i) : n.setAttribute(i, t[i])
        })
    }
    function bt(n, t, i) {
        var u = s(n, function(n) {
            var i = n.name;
            return i === t
        }),
            f = !! u && n.some(function(n) {
                return n.name === i && n.enabled && n.order < u.order
            }),
            r;
        return f || (r = "`" + t + "`", console.warn("`" + i + "` modifier is required by " + r + " modifier in order to work, be sure to include it before " + r + "!")), f
    }
    function pi(n) {
        return "end" === n ? "start" : "start" === n ? "end" : n
    }
    function kt(n) {
        var r = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            t = it.indexOf(n),
            i = it.slice(t + 1).concat(it.slice(0, t));
        return r ? i.reverse() : i
    }
    function wi(n, r, u, f) {
        var h = n.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            o = +h[1],
            e = h[2],
            s, c, l;
        if (!o) return n;
        if (0 === e.indexOf("%")) {
            switch (e) {
                case "%p":
                    s = u;
                    break;
                case "%":
                case "%r":
                default:
                    s = f
            }
            return c = t(s), c[r] / 100 * o
        }
        return "vh" === e || "vw" === e ? (l = "vh" === e ? i(document.documentElement.clientHeight, window.innerHeight || 0) : i(document.documentElement.clientWidth, window.innerWidth || 0), l / 100 * o) : o
    }
    function bi(n, t, i, r) {
        var h = [0, 0],
            c = -1 !== ["right", "left"].indexOf(r),
            u = n.split(/(\+|\-)/).map(function(n) {
                return n.trim()
            }),
            f = u.indexOf(s(u, function(n) {
                return -1 !== n.search(/,|\s/)
            })),
            o, e;
        return u[f] && -1 === u[f].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead."), o = /\s*,\s*|\s+/, e = -1 === f ? [u] : [u.slice(0, f).concat([u[f].split(o)[0]]), [u[f].split(o)[1]].concat(u.slice(f + 1))], e = e.map(function(n, r) {
            var f = (1 === r ? !c : c) ? "height" : "width",
                u = !1;
            return n.reduce(function(n, t) {
                return "" === n[n.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (n[n.length - 1] = t, u = !0, n) : u ? (n[n.length - 1] += t, u = !1, n) : n.concat(t)
            }, []).map(function(n) {
                return wi(n, f, t, i)
            })
        }), e.forEach(function(n, t) {
            n.forEach(function(i, r) {
                d(i) && (h[t] += i * ("-" === n[r - 1] ? -1 : 1))
            })
        }), h
    }
    for (var dt = Math.min, f = Math.floor, i = Math.max, ki = ["native code", "[object MutationObserverConstructor]"], di = function(n) {
        return ki.some(function(t) {
            return -1 < (n || "").toString().indexOf(t)
        })
    }, gt = "undefined" != typeof window, ni = ["Edge", "Trident", "Firefox"], ti = 0, nt = 0; nt < ni.length; nt += 1) if (gt && 0 <= navigator.userAgent.indexOf(ni[nt])) {
        ti = 1;
        break
    }
    var tt, gi = gt && di(window.MutationObserver),
        nr = gi ? function(n) {
            var t = !1,
                i = 0,
                r = document.createElement("span"),
                u = new MutationObserver(function() {
                    n();
                    t = !1
                });
            return u.observe(r, {
                attributes: !0
            }),
            function() {
                t || (t = !0, r.setAttribute("x-index", i), ++i)
            }
        } : function(n) {
            var t = !1;
            return function() {
                t || (t = !0, setTimeout(function() {
                    t = !1;
                    n()
                }, ti))
            }
        }, l = function() {
            return void 0 == tt && (tt = -1 !== navigator.appVersion.indexOf("MSIE 10")), tt
        }, tr = function(n, t) {
            if (!(n instanceof t)) throw new TypeError("Cannot call a class as a function");
        }, ir = function() {
            function n(n, t) {
                for (var i, r = 0; r < t.length; r++) i = t[r], i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(n, i.key, i)
            }
            return function(t, i, r) {
                return i && n(t.prototype, i), r && n(t, r), t
            }
        }(),
        a = function(n, t, i) {
            return t in n ? Object.defineProperty(n, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : n[t] = i, n
        }, n = Object.assign || function(n) {
            for (var t, r, i = 1; i < arguments.length; i++) for (r in t = arguments[i], t) Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
            return n
        }, ii = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        it = ii.slice(3),
        rt = {
            FLIP: "flip",
            CLOCKWISE: "clockwise",
            COUNTERCLOCKWISE: "counterclockwise"
        }, v = function() {
            function t(i, r) {
                var u = this,
                    f = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}, e;
                tr(this, t);
                this.scheduleUpdate = function() {
                    return requestAnimationFrame(u.update)
                };
                this.update = nr(this.update.bind(this));
                this.options = n({}, t.Defaults, f);
                this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                };
                this.reference = i.jquery ? i[0] : i;
                this.popper = r.jquery ? r[0] : r;
                this.options.modifiers = {};
                Object.keys(n({}, t.Defaults.modifiers, f.modifiers)).forEach(function(i) {
                    u.options.modifiers[i] = n({}, t.Defaults.modifiers[i] || {}, f.modifiers ? f.modifiers[i] : {})
                });
                this.modifiers = Object.keys(this.options.modifiers).map(function(t) {
                    return n({
                        name: t
                    }, u.options.modifiers[t])
                }).sort(function(n, t) {
                    return n.order - t.order
                });
                this.modifiers.forEach(function(n) {
                    n.enabled && ut(n.onLoad) && n.onLoad(u.reference, u.popper, u.options, n, u.state)
                });
                this.update();
                e = this.options.eventsEnabled;
                e && this.enableEventListeners();
                this.state.eventsEnabled = e
            }
            return ir(t, [{
                key: "update",
                value: function() {
                    return si.call(this)
                }
            }, {
                key: "destroy",
                value: function() {
                    return hi.call(this)
                }
            }, {
                key: "enableEventListeners",
                value: function() {
                    return li.call(this)
                }
            }, {
                key: "disableEventListeners",
                value: function() {
                    return vi.call(this)
                }
            }]), t
        }();
    return v.Utils = ("undefined" == typeof window ? global : window).PopperUtils, v.placements = ii, v.Defaults = {
        placement: "bottom",
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function() {},
        onUpdate: function() {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function(t) {
                    var u = t.placement,
                        c = u.split("-")[0],
                        f = u.split("-")[1];
                    if (f) {
                        var e = t.offsets,
                            r = e.reference,
                            o = e.popper,
                            s = -1 !== ["bottom", "top"].indexOf(c),
                            i = s ? "left" : "top",
                            h = s ? "width" : "height",
                            l = {
                                start: a({}, i, r[i]),
                                end: a({}, i, r[i] + r[h] - o[h])
                            };
                        t.offsets.popper = n({}, o, l[f])
                    }
                    return t
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: function(n, t) {
                    var r, f = t.offset,
                        o = n.placement,
                        e = n.offsets,
                        i = e.popper,
                        s = e.reference,
                        u = o.split("-")[0];
                    return r = d(+f) ? [+f, 0] : bi(f, i, s, u), "left" === u ? (i.top += r[0], i.left -= r[1]) : "right" === u ? (i.top += r[0], i.left += r[1]) : "top" === u ? (i.left += r[0], i.top -= r[1]) : "bottom" === u && (i.left += r[0], i.top += r[1]), n.popper = i, n
                },
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function(t, u) {
                    var o = u.boundariesElement || r(t.instance.popper),
                        e;
                    t.instance.reference === o && (o = r(o));
                    e = k(t.instance.popper, t.instance.reference, u.padding, o);
                    u.boundaries = e;
                    var s = u.priority,
                        f = t.offsets.popper,
                        h = {
                            primary: function(n) {
                                var t = f[n];
                                return f[n] < e[n] && !u.escapeWithReference && (t = i(f[n], e[n])), a({}, n, t)
                            },
                            secondary: function(n) {
                                var t = "right" === n ? "left" : "top",
                                    i = f[t];
                                return f[n] > e[n] && !u.escapeWithReference && (i = dt(f[t], e[n] - ("right" === n ? f.width : f.height))), a({}, t, i)
                            }
                        };
                    return s.forEach(function(t) {
                        var i = -1 === ["left", "top"].indexOf(t) ? "secondary" : "primary";
                        f = n({}, f, h[i](t))
                    }), t.offsets.popper = f, t
                },
                priority: ["left", "right", "top", "bottom"],
                padding: 5,
                boundariesElement: "scrollParent"
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function(n) {
                    var s = n.offsets,
                        u = s.popper,
                        i = s.reference,
                        h = n.placement.split("-")[0],
                        r = f,
                        e = -1 !== ["top", "bottom"].indexOf(h),
                        o = e ? "right" : "bottom",
                        t = e ? "left" : "top",
                        c = e ? "width" : "height";
                    return u[o] < r(i[t]) && (n.offsets.popper[t] = r(i[t]) - u[c]), u[t] > r(i[o]) && (n.offsets.popper[t] = r(i[o])), n
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function(n, r) {
                    var f, y, l;
                    if (!bt(n.instance.modifiers, "arrow", "keepTogether")) return n;
                    if (f = r.element, "string" == typeof f) {
                        if (f = n.instance.popper.querySelector(f), !f) return n
                    } else if (!n.instance.popper.contains(f)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), n;
                    var p = n.placement.split("-")[0],
                        v = n.offsets,
                        s = v.popper,
                        e = v.reference,
                        h = -1 !== ["left", "right"].indexOf(p),
                        a = h ? "height" : "width",
                        u = h ? "top" : "left",
                        w = h ? "left" : "top",
                        c = h ? "bottom" : "right",
                        o = lt(f)[a];
                    return e[c] - o < s[u] && (n.offsets.popper[u] -= s[u] - (e[c] - o)), e[u] + o > s[c] && (n.offsets.popper[u] += e[u] + o - s[c]), y = e[u] + e[a] / 2 - o / 2, l = y - t(n.offsets.popper)[u], l = i(dt(s[a] - o, l), 0), n.arrowElement = f, n.offsets.arrow = {}, n.offsets.arrow[u] = Math.round(l), n.offsets.arrow[w] = "", n
                },
                element: "[x-arrow]"
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function(t, i) {
                    if (yt(t.instance.modifiers, "inner") || t.flipped && t.placement === t.originalPlacement) return t;
                    var o = k(t.instance.popper, t.instance.reference, i.padding, i.boundariesElement),
                        r = t.placement.split("-")[0],
                        s = c(r),
                        u = t.placement.split("-")[1] || "",
                        e = [];
                    switch (i.behavior) {
                        case rt.FLIP:
                            e = [r, s];
                            break;
                        case rt.CLOCKWISE:
                            e = kt(r);
                            break;
                        case rt.COUNTERCLOCKWISE:
                            e = kt(r, !0);
                            break;
                        default:
                            e = i.behavior
                    }
                    return e.forEach(function(h, l) {
                        if (r !== h || e.length === l + 1) return t;
                        r = t.placement.split("-")[0];
                        s = c(r);
                        var v = t.offsets.popper,
                            y = t.offsets.reference,
                            a = f,
                            w = "left" === r && a(v.right) > a(y.left) || "right" === r && a(v.left) < a(y.right) || "top" === r && a(v.bottom) > a(y.top) || "bottom" === r && a(v.top) < a(y.bottom),
                            b = a(v.left) < a(o.left),
                            k = a(v.right) > a(o.right),
                            d = a(v.top) < a(o.top),
                            g = a(v.bottom) > a(o.bottom),
                            nt = "left" === r && b || "right" === r && k || "top" === r && d || "bottom" === r && g,
                            p = -1 !== ["top", "bottom"].indexOf(r),
                            tt = !! i.flipVariations && (p && "start" === u && b || p && "end" === u && k || !p && "start" === u && d || !p && "end" === u && g);
                        (w || nt || tt) && (t.flipped = !0, (w || nt) && (r = e[l + 1]), tt && (u = pi(u)), t.placement = r + (u ? "-" + u : ""), t.offsets.popper = n({}, t.offsets.popper, at(t.instance.popper, t.offsets.reference, t.placement)), t = vt(t.instance.modifiers, t, "flip"))
                    }), t
                },
                behavior: "flip",
                padding: 5,
                boundariesElement: "viewport"
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function(n) {
                    var i = n.placement,
                        u = i.split("-")[0],
                        f = n.offsets,
                        r = f.popper,
                        o = f.reference,
                        e = -1 !== ["left", "right"].indexOf(u),
                        s = -1 === ["top", "left"].indexOf(u);
                    return r[e ? "left" : "top"] = o[i] - (s ? r[e ? "width" : "height"] : 0), n.placement = c(i), n.offsets.popper = t(r), n
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function(n) {
                    if (!bt(n.instance.modifiers, "hide", "preventOverflow")) return n;
                    var t = n.offsets.reference,
                        i = s(n.instance.modifiers, function(n) {
                            return "preventOverflow" === n.name
                        }).boundaries;
                    if (t.bottom < i.top || t.left > i.right || t.top > i.bottom || t.right < i.left) {
                        if (!0 === n.hide) return n;
                        n.hide = !0;
                        n.attributes["x-out-of-boundaries"] = ""
                    } else {
                        if (!1 === n.hide) return n;
                        n.hide = !1;
                        n.attributes["x-out-of-boundaries"] = !1
                    }
                    return n
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function(t, i) {
                    var g = i.x,
                        nt = i.y,
                        e = t.offsets.popper,
                        l = s(t.instance.modifiers, function(n) {
                            return "applyStyle" === n.name
                        }).gpuAcceleration,
                        b, k, d;
                    void 0 !== l && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                    var a, v, tt = void 0 === l ? i.gpuAcceleration : l,
                        it = r(t.instance.popper),
                        y = w(it),
                        u = {
                            position: e.position
                        }, c = {
                            left: f(e.left),
                            top: f(e.top),
                            bottom: f(e.bottom),
                            right: f(e.right)
                        }, o = "bottom" === g ? "top" : "bottom",
                        h = "right" === nt ? "left" : "right",
                        p = pt("transform");
                    return (v = "bottom" == o ? -y.height + c.bottom : c.top, a = "right" == h ? -y.width + c.right : c.left, tt && p) ? (u[p] = "translate3d(" + a + "px, " + v + "px, 0)", u[o] = 0, u[h] = 0, u.willChange = "transform") : (b = "bottom" == o ? -1 : 1, k = "right" == h ? -1 : 1, u[o] = v * b, u[h] = a * k, u.willChange = o + ", " + h), d = {
                        "x-placement": t.placement
                    }, t.attributes = n({}, d, t.attributes), t.styles = n({}, u, t.styles), t
                },
                gpuAcceleration: !0,
                x: "bottom",
                y: "right"
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function(n) {
                    return g(n.instance.popper, n.styles), yi(n.instance.popper, n.attributes), n.offsets.arrow && g(n.arrowElement, n.offsets.arrow), n
                },
                onLoad: function(n, t, i, r, u) {
                    var f = ct(u, t, n),
                        e = ht(i.placement, f, t, n, i.modifiers.flip.boundariesElement, i.modifiers.flip.padding);
                    return t.setAttribute("x-placement", e), g(t, {
                        position: "absolute"
                    }), i
                },
                gpuAcceleration: void 0
            }
        }
    }, v
});


FCalendar570 = function(n) {
    "use strict";
    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.
    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    function u(n, t) {
        function i() {
            this.constructor = n
        }
        eo(n, t);
        n.prototype = t === null ? Object.create(t) : (i.prototype = t.prototype, new i)
    }
    function v() {
        for (var i = 0, n = 0, r = arguments.length; n < r; n++) i += arguments[n].length;
        for (var u = Array(i), f = 0, n = 0; n < r; n++) for (var e = arguments[n], t = 0, o = e.length; t < o; t++, f++) u[f] = e[t];
        return u
    }
    function wt(n, t) {
        for (var i in t) n[i] = t[i];
        return n
    }
    function ra(n) {
        var t = n.parentNode;
        t && t.removeChild(n)
    }
    function bt(n, t, i) {
        var f, e, r, o = arguments,
            u = {};
        for (r in t) "key" == r ? f = t[r] : "ref" == r ? e = t[r] : u[r] = t[r];
        if (arguments.length > 3) for (i = [i], r = 3; r < arguments.length; r++) i.push(o[r]);
        if (null != i && (u.children = i), "function" == typeof n && null != n.defaultProps) for (r in n.defaultProps) void 0 === u[r] && (u[r] = n.defaultProps[r]);
        return pu(n, u, f, e, null)
    }
    function pu(n, t, i, r, u) {
        var f = {
            type: n,
            props: t,
            key: i,
            ref: r,
            __k: null,
            __: null,
            __b: 0,
            __e: null,
            __d: void 0,
            __c: null,
            __h: null,
            constructor: void 0,
            __v: null == u ? ++e.__v : u
        };
        return null != e.vnode && e.vnode(f), f
    }
    function dg() {
        return {
            current: null
        }
    }
    function oi(n) {
        return n.children
    }
    function rt(n, t) {
        this.props = n;
        this.context = t
    }
    function or(n, t) {
        if (null == t) return n.__ ? or(n.__, n.__.__k.indexOf(n) + 1) : null;
        for (var i; t < n.__k.length; t++) if (null != (i = n.__k[t]) && null != i.__e) return i.__e;
        return "function" == typeof n.type ? or(n) : null
    }
    function ua(n) {
        var t, i;
        if (null != (n = n.__) && null != n.__c) {
            for (n.__e = n.__c.base = null, t = 0; t < n.__k.length; t++) if (null != (i = n.__k[t]) && null != i.__e) {
                n.__e = n.__c.base = i.__e;
                break
            }
            return ua(n)
        }
    }
    function ho(n) {
        (!n.__d && (n.__d = !0) && er.push(n) && !wu.__r++ || ta !== e.debounceRendering) && ((ta = e.debounceRendering) || na)(wu)
    }
    function wu() {
        for (var n; wu.__r = er.length;) n = er.sort(function(n, t) {
            return n.__v.__b - t.__v.__b
        }), er = [], n.some(function(n) {
            var r, u, e, o, t, i, f;
            n.__d && (i = (t = (r = n).__v).__e, (f = r.__P) && (u = [], (e = wt({}, t)).__v = t.__v + 1, o = lo(f, t, e, r.__n, void 0 !== f.ownerSVGElement, null != t.__h ? [i] : null, u, null == i ? or(t) : i, t.__h), ha(u, t), o != i && ua(t)))
        })
    }
    function fa(n, t, i, r, u, f, e, o, s, h) {
        var l, p, a, c, w, b, v, y = r && r.__k || so,
            k = y.length;
        for (s == pt && (s = null != e ? e[0] : k ? or(r, 0) : null), i.__k = [], l = 0; l < t.length; l++) if (null != (c = i.__k[l] = null == (c = t[l]) || "boolean" == typeof c ? null : "string" == typeof c || "number" == typeof c ? pu(null, c, null, null, c) : Array.isArray(c) ? pu(oi, {
            children: c
        }, null, null, null) : null != c.__e || null != c.__c ? pu(c.type, c.props, c.key, null, c.__v) : c)) {
            if (c.__ = i, c.__b = i.__b + 1, null === (a = y[l]) || a && c.key == a.key && c.type === a.type) y[l] = void 0;
            else for (p = 0; p < k; p++) {
                if ((a = y[p]) && c.key == a.key && c.type === a.type) {
                    y[p] = void 0;
                    break
                }
                a = null
            }
            w = lo(n, c, a = a || pt, u, f, e, o, s, h);
            (p = c.ref) && a.ref != p && (v || (v = []), a.ref && v.push(a.ref, null, c), v.push(p, c.__c || w, c));
            null != w ? (null == b && (b = w), s = ea(n, c, a, y, e, w, s), h || "option" != i.type ? "function" == typeof i.type && (i.__d = s) : n.value = "") : s && a.__e == s && s.parentNode != n && (s = or(a))
        }
        if (i.__e = b, null != e && "function" != typeof i.type) for (l = e.length; l--;) null != e[l] && ra(e[l]);
        for (l = k; l--;) null != y[l] && ao(y[l], y[l]);
        if (v) for (l = 0; l < v.length; l++) ca(v[l], v[++l], v[++l])
    }
    function co(n, t) {
        return t = t || [], null == n || "boolean" == typeof n || (Array.isArray(n) ? n.some(function(n) {
            co(n, t)
        }) : t.push(n)), t
    }
    function ea(n, t, i, r, u, f, e) {
        var o, s, h;
        if (void 0 !== t.__d) o = t.__d, t.__d = void 0;
        else if (u == i || f != e || null == f.parentNode) n: if (null == e || e.parentNode !== n) n.appendChild(f),
        o = null;
        else {
            for (s = e, h = 0;
            (s = s.nextSibling) && h < r.length; h += 2) if (s == f) break n;
            n.insertBefore(f, e);
            o = e
        }
        return void 0 !== o ? o : f.nextSibling
    }
    function gg(n, t, i, r, u) {
        for (var f in i) "children" === f || "key" === f || f in t || bu(n, f, null, i[f], r);
        for (f in t) u && "function" != typeof t[f] || "children" === f || "key" === f || "value" === f || "checked" === f || i[f] === t[f] || bu(n, f, t[f], i[f], r)
    }
    function oa(n, t, i) {
        "-" === t[0] ? n.setProperty(t, i) : n[t] = null == i ? "" : "number" != typeof i || kg.test(t) ? i : i + "px"
    }
    function bu(n, t, i, r, u) {
        var f, o, e;
        if (u && "className" == t && (t = "class"), "style" === t) if ("string" == typeof i) n.style.cssText = i;
        else {
            if ("string" == typeof r && (n.style.cssText = r = ""), r) for (t in r) i && t in i || oa(n.style, t, "");
            if (i) for (t in i) r && i[t] === r[t] || oa(n.style, t, i[t])
        } else "o" === t[0] && "n" === t[1] ? (f = t !== (t = t.replace(/Capture$/, "")), (o = t.toLowerCase()) in n && (t = o), t = t.slice(2), n.l || (n.l = {}), n.l[t + f] = i, e = f ? tn : nn, i ? r || n.addEventListener(t, e, f) : n.removeEventListener(t, e, f)) : "list" !== t && "tagName" !== t && "form" !== t && "type" !== t && "size" !== t && "download" !== t && "href" !== t && !u && t in n ? n[t] = null == i ? "" : i : "function" != typeof i && "dangerouslySetInnerHTML" !== t && (t !== (t = t.replace(/xlink:?/, "")) ? null == i || !1 === i ? n.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : n.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), i) : null == i || !1 === i && !/^ar/.test(t) ? n.removeAttribute(t) : n.setAttribute(t, i))
    }
    function nn(n) {
        this.l[n.type + !1](e.event ? e.event(n) : n)
    }
    function tn(n) {
        this.l[n.type + !0](e.event ? e.event(n) : n)
    }
    function sa(n, t, i) {
        for (var r, u = 0; u < n.__k.length; u++)(r = n.__k[u]) && (r.__ = n, r.__e && ("function" == typeof r.type && r.__k.length > 1 && sa(r, t, i), t = ea(i, r, r, n.__k, null, r.__e, t), "function" == typeof n.type && (n.__d = t)))
    }
    function lo(n, t, i, r, u, f, o, s, h) {
        var l, c, k, w, d, g, nt, a, p, y, b, v = t.type;
        if (void 0 !== t.constructor) return null;
        null != i.__h && (h = i.__h, s = t.__e = i.__e, t.__h = null, f = [s]);
        (l = e.__b) && l(t);
        try {
            n: if ("function" == typeof v) {
                if (a = t.props, p = (l = v.contextType) && r[l.__c], y = l ? p ? p.props.value : l.__ : r, i.__c ? nt = (c = t.__c = i.__c).__ = c.__E : ("prototype" in v && v.prototype.render ? t.__c = c = new v(a, y) : (t.__c = c = new rt(a, y), c.constructor = v, c.render = un), p && p.sub(c), c.props = a, c.state || (c.state = {}), c.context = y, c.__n = r, k = c.__d = !0, c.__h = []), null == c.__s && (c.__s = c.state), null != v.getDerivedStateFromProps && (c.__s == c.state && (c.__s = wt({}, c.__s)), wt(c.__s, v.getDerivedStateFromProps(a, c.__s))), w = c.props, d = c.state, k) null == v.getDerivedStateFromProps && null != c.componentWillMount && c.componentWillMount(), null != c.componentDidMount && c.__h.push(c.componentDidMount);
                else {
                    if (null == v.getDerivedStateFromProps && a !== w && null != c.componentWillReceiveProps && c.componentWillReceiveProps(a, y), !c.__e && null != c.shouldComponentUpdate && !1 === c.shouldComponentUpdate(a, c.__s, y) || t.__v === i.__v) {
                        c.props = a;
                        c.state = c.__s;
                        t.__v !== i.__v && (c.__d = !1);
                        c.__v = t;
                        t.__e = i.__e;
                        t.__k = i.__k;
                        c.__h.length && o.push(c);
                        sa(t, s, n);
                        break n
                    }
                    null != c.componentWillUpdate && c.componentWillUpdate(a, c.__s, y);
                    null != c.componentDidUpdate && c.__h.push(function() {
                        c.componentDidUpdate(w, d, g)
                    })
                }
                c.context = y;
                c.props = a;
                c.state = c.__s;
                (l = e.__r) && l(t);
                c.__d = !1;
                c.__v = t;
                c.__P = n;
                l = c.render(c.props, c.state, c.context);
                c.state = c.__s;
                null != c.getChildContext && (r = wt(wt({}, r), c.getChildContext()));
                k || null == c.getSnapshotBeforeUpdate || (g = c.getSnapshotBeforeUpdate(w, d));
                b = null != l && l.type == oi && null == l.key ? l.props.children : l;
                fa(n, Array.isArray(b) ? b : [b], t, i, r, u, f, o, s, h);
                c.base = t.__e;
                t.__h = null;
                c.__h.length && o.push(c);
                nt && (c.__E = c.__ = null);
                c.__e = !1
            } else null == f && t.__v === i.__v ? (t.__k = i.__k, t.__e = i.__e) : t.__e = rn(i.__e, t, i, r, u, f, o, h);
            (l = e.diffed) && l(t)
        } catch (n) {
            t.__v = null;
            (h || null != f) && (t.__e = s, t.__h = !! h, f[f.indexOf(s)] = null);
            e.__e(n, t, i)
        }
        return t.__e
    }
    function ha(n, t) {
        e.__c && e.__c(t, n);
        n.some(function(t) {
            try {
                n = t.__h;
                t.__h = [];
                n.some(function(n) {
                    n.call(t)
                })
            } catch (n) {
                e.__e(n, t.__v)
            }
        })
    }
    function rn(n, t, i, r, u, f, e, o) {
        var s, a, y, c, v, l = i.props,
            h = t.props;
        if (u = "svg" === t.type || u, null != f) for (s = 0; s < f.length; s++) if (null != (a = f[s]) && ((null === t.type ? 3 === a.nodeType : a.localName === t.type) || n == a)) {
            n = a;
            f[s] = null;
            break
        }
        if (null == n) {
            if (null === t.type) return document.createTextNode(h);
            n = u ? document.createElementNS("http://www.w3.org/2000/svg", t.type) : document.createElement(t.type, h.is && {
                is: h.is
            });
            f = null;
            o = !1
        }
        if (null === t.type) l === h || o && n.data === h || (n.data = h);
        else {
            if (null != f && (f = so.slice.call(n.childNodes)), y = (l = i.props || pt).dangerouslySetInnerHTML, c = h.dangerouslySetInnerHTML, !o) {
                if (null != f) for (l = {}, v = 0; v < n.attributes.length; v++) l[n.attributes[v].name] = n.attributes[v].value;
                (c || y) && (c && (y && c.__html == y.__html || c.__html === n.innerHTML) || (n.innerHTML = c && c.__html || ""))
            }
            gg(n, h, l, u, o);
            c ? t.__k = [] : (s = t.props.children, fa(n, Array.isArray(s) ? s : [s], t, i, r, "foreignObject" !== t.type && u, f, e, pt, o));
            o || ("value" in h && void 0 !== (s = h.value) && (s !== n.value || "progress" === t.type && !s) && bu(n, "value", s, l.value, !1), "checked" in h && void 0 !== (s = h.checked) && s !== n.checked && bu(n, "checked", s, l.checked, !1))
        }
        return n
    }
    function ca(n, t, i) {
        try {
            "function" == typeof n ? n(t) : n.current = t
        } catch (n) {
            e.__e(n, i)
        }
    }
    function ao(n, t, i) {
        var r, f, u;
        if (e.unmount && e.unmount(n), (r = n.ref) && (r.current && r.current !== n.__e || ca(r, null, t)), i || "function" == typeof n.type || (i = null != (f = n.__e)), n.__e = n.__d = void 0, null != (r = n.__c)) {
            if (r.componentWillUnmount) try {
                r.componentWillUnmount()
            } catch (n) {
                e.__e(n, t)
            }
            r.base = r.__P = null
        }
        if (r = n.__k) for (u = 0; u < r.length; u++) r[u] && ao(r[u], t, i);
        null != f && ra(f)
    }
    function un(n, t, i) {
        return this.constructor(n, i)
    }
    function pi(n, t, i) {
        var r, u, f;
        e.__ && e.__(n, t);
        u = (r = i === oo) ? null : i && i.__k || t.__k;
        n = bt(oi, null, [n]);
        f = [];
        lo(t, (r ? t : i || t).__k = n, u || pt, pt, void 0 !== t.ownerSVGElement, i && !r ? [i] : u ? null : t.childNodes.length ? so.slice.call(t.childNodes) : null, f, i || pt, r);
        ha(f, n)
    }
    function fn(n, t) {
        pi(n, t, oo)
    }
    function en(n, t) {
        var i = {
            __c: t = "__cC" + ia++,
            __: n,
            Consumer: function(n, t) {
                return n.children(t)
            },
            Provider: function(n, i, r) {
                return this.getChildContext || (i = [], (r = {})[t] = this, this.getChildContext = function() {
                    return r
                }, this.shouldComponentUpdate = function(n) {
                    this.props.value !== n.value && i.some(ho)
                }, this.sub = function(n) {
                    i.push(n);
                    var t = n.componentWillUnmount;
                    n.componentWillUnmount = function() {
                        i.splice(i.indexOf(n), 1);
                        t && t.call(n)
                    }
                }), n.children
            }
        };
        return i.Provider.__ = i.Consumer.contextType = i
    }
    function sn() {
        vo.forEach(function(n) {
            if (n.__P) try {
                n.__H.__h.forEach(ku);
                n.__H.__h.forEach(po);
                n.__H.__h = []
            } catch (t) {
                n.__H.__h = [];
                e.__e(t, n.__v)
            }
        });
        vo = []
    }
    function ku(n) {
        var t = si;
        "function" == typeof n.__c && n.__c();
        si = t
    }
    function po(n) {
        var t = si;
        n.__c = n.__();
        si = t
    }
    function hn(n, t) {
        for (var i in t) n[i] = t[i];
        return n
    }
    function ba(n, t) {
        var r, i;
        for (r in n) if ("__source" !== r && !(r in t)) return !0;
        for (i in t) if ("__source" !== i && n[i] !== t[i]) return !0;
        return !1
    }
    function ka(n) {
        this.props = n
    }
    function ga(n) {
        return n && (n.__c && n.__c.__H && (n.__c.__H.__.forEach(function(n) {
            "function" == typeof n.__c && n.__c()
        }), n.__c.__H = null), (n = hn({}, n)).__c = null, n.__k = n.__k && n.__k.map(ga)), n
    }
    function nv(n) {
        return n && (n.__v = null, n.__k = n.__k && n.__k.map(nv)), n
    }
    function bo() {
        this.__u = 0;
        this.t = null;
        this.__b = null
    }
    function tv(n) {
        var t = n.__.__c;
        return t && t.__e && t.__e(n)
    }
    function du() {
        this.u = null;
        this.o = null
    }
    function cn(n) {
        return this.getChildContext = function() {
            return n.context
        }, n.children
    }
    function ln(n) {
        var t = this,
            i = n.i,
            r = bt(cn, {
                context: t.context
            }, n.__v);
        t.componentWillUnmount = function() {
            var n = t.l.parentNode;
            n && n.removeChild(t.l);
            ao(t.s)
        };
        t.i && t.i !== i && (t.componentWillUnmount(), t.h = !1);
        n.__v ? t.h ? (i.__k = t.__k, pi(r, i), t.__k = i.__k) : (t.l = document.createTextNode(""), t.__k = i.__k, fn("", i), i.appendChild(t.l), t.h = !0, t.i = i, pi(r, i, t.l), i.__k = t.__k, t.__k = t.l.__k) : t.h && t.componentWillUnmount();
        t.s = r
    }
    function an(n, t) {
        return bt(ln, {
            __v: n,
            i: t
        })
    }
    function wn() {}
    function bn() {
        return this.cancelBubble
    }
    function kn() {
        return this.defaultPrevented
    }
    function gn() {
        function i(t) {
            n.push(t)
        }
        var t = e.debounceRendering,
            n = [];
        for (e.debounceRendering = i, pi(bt(iv, {}), document.createElement("div")); n.length;) n.shift()();
        e.debounceRendering = t
    }
    function ntt(n) {
        var t = en(n),
            i = t.Provider;
        return t.Provider = function() {
            var t = this,
                r = !this.getChildContext,
                u = i.apply(this, arguments),
                n;
            return r && (n = [], this.shouldComponentUpdate = function(i) {
                t.props.value !== i.value && n.forEach(function(n) {
                    n.context = i.value;
                    n.forceUpdate()
                })
            }, this.sub = function(t) {
                n.push(t);
                var i = t.componentWillUnmount;
                t.componentWillUnmount = function() {
                    n.splice(n.indexOf(t), 1);
                    i && i.call(t)
                }
            }), u
        }, t
    }
    function ttt(n) {
        pi(null, n)
    }
    function gu(n) {
        n.parentNode && n.parentNode.removeChild(n)
    }
    function w(n, t) {
        if (n.closest) return n.closest(t);
        if (!document.documentElement.contains(n)) return null;
        do {
            if (nf(n, t)) return n;
            n = n.parentElement || n.parentNode
        } while (n !== null && n.nodeType === 1);
        return null
    }
    function nf(n, t) {
        var i = n.matches || n.matchesSelector || n.msMatchesSelector;
        return i.call(n, t)
    }
    function rv(n, t) {
        for (var u, i, f = n instanceof HTMLElement ? [n] : n, e = [], r = 0; r < f.length; r += 1) for (u = f[r].querySelectorAll(t), i = 0; i < u.length; i += 1) e.push(u[i]);
        return e
    }
    function itt(n, t) {
        for (var u, i, f, e = n instanceof HTMLElement ? [n] : n, o = [], r = 0; r < e.length; r += 1) for (u = e[r].children, i = 0; i < u.length; i += 1) f = u[i], (!t || nf(f, t)) && o.push(f);
        return o
    }
    function wi(n, t) {
        for (var i in t) us(n, i, t[i])
    }
    function us(n, t, i) {
        n.style[t] = i == null ? "" : typeof i == "number" && uv.test(t) ? i + "px" : i
    }
    function rtt(n) {
        var t, i;
        return (i = (t = n.composedPath) === null || t === void 0 ? void 0 : t.call(n)[0]) !== null && i !== void 0 ? i : n.target
    }
    function sr(n) {
        n.preventDefault()
    }
    function fv(n, t) {
        return function(i) {
            var r = w(i.target, n);
            r && t.call(r, i, r)
        }
    }
    function fs(n, t, i, r) {
        var u = fv(i, r);
        return n.addEventListener(t, u),
        function() {
            n.removeEventListener(t, u)
        }
    }
    function utt(n, t, i, r) {
        var u;
        return fs(n, "mouseover", t, function(n, t) {
            if (t !== u) {
                u = t;
                i(n, t);
                var f = function(n) {
                    u = null;
                    r(n, t);
                    t.removeEventListener("mouseleave", f)
                };
                t.addEventListener("mouseleave", f)
            }
        })
    }
    function ev(n, t) {
        var i = function(r) {
            t(r);
            es.forEach(function(t) {
                n.removeEventListener(t, i)
            })
        };
        es.forEach(function(t) {
            n.addEventListener(t, i)
        })
    }
    function hi() {
        return os += 1, String(os)
    }
    function hr() {
        document.body.classList.add("fc-not-allowed")
    }
    function cr() {
        document.body.classList.remove("fc-not-allowed")
    }
    function ov(n) {
        n.classList.add("fc-unselectable");
        n.addEventListener("selectstart", sr)
    }
    function sv(n) {
        n.classList.remove("fc-unselectable");
        n.removeEventListener("selectstart", sr)
    }
    function hv(n) {
        n.addEventListener("contextmenu", sr)
    }
    function cv(n) {
        n.removeEventListener("contextmenu", sr)
    }
    function lv(n) {
        var u = [],
            i = [],
            r, t;
        for (typeof n == "string" ? i = n.split(/\s*,\s*/) : typeof n == "function" ? i = [n] : Array.isArray(n) && (i = n), r = 0; r < i.length; r += 1) t = i[r], typeof t == "string" ? u.push(t.charAt(0) === "-" ? {
            field: t.substring(1),
            order: -1
        } : {
            field: t,
            order: 1
        }) : typeof t == "function" && u.push({
            func: t
        });
        return u
    }
    function av(n, t, i) {
        for (var u, r = 0; r < i.length; r += 1) if (u = vv(n, t, i[r]), u) return u;
        return 0
    }
    function vv(n, t, i) {
        return i.func ? i.func(n, t) : yv(n[i.field], t[i.field]) * (i.order || 1)
    }
    function yv(n, t) {
        return !n && !t ? 0 : t == null ? -1 : n == null ? 1 : typeof n == "string" || typeof t == "string" ? String(n).localeCompare(String(t)) : n - t
    }
    function ci(n, t) {
        var i = String(n);
        return "000".substr(0, t - i.length) + i
    }
    function pv(n, t) {
        return n - t
    }
    function lr(n) {
        return n % 1 == 0
    }
    function wv(n) {
        var t = n.querySelector(".fc-scrollgrid-shrink-frame"),
            i = n.querySelector(".fc-scrollgrid-shrink-cushion");
        if (!t) throw new Error("needs fc-scrollgrid-shrink-frame className");
        if (!i) throw new Error("needs fc-scrollgrid-shrink-cushion className");
        return n.getBoundingClientRect().width - t.getBoundingClientRect().width + i.getBoundingClientRect().width
    }
    function hs(n, t) {
        var i = gt(n);
        return i[2] += t * 7, d(i)
    }
    function y(n, t) {
        var i = gt(n);
        return i[2] += t, d(i)
    }
    function dt(n, t) {
        var i = gt(n);
        return i[6] += t, d(i)
    }
    function bv(n, t) {
        return lt(n, t) / 7
    }
    function lt(n, t) {
        return (t.valueOf() - n.valueOf()) / 864e5
    }
    function ftt(n, t) {
        return (t.valueOf() - n.valueOf()) / 36e5
    }
    function ett(n, t) {
        return (t.valueOf() - n.valueOf()) / 6e4
    }
    function ott(n, t) {
        return (t.valueOf() - n.valueOf()) / 1e3
    }
    function kv(n, t) {
        var i = h(n),
            r = h(t);
        return {
            years: 0,
            months: 0,
            days: Math.round(lt(i, r)),
            milliseconds: t.valueOf() - r.valueOf() - (n.valueOf() - i.valueOf())
        }
    }
    function dv(n, t) {
        var i = ar(n, t);
        return i !== null && i % 7 == 0 ? i / 7 : null
    }
    function ar(n, t) {
        return ni(n) === ni(t) ? Math.round(lt(n, t)) : null
    }
    function h(n) {
        return d([n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), ])
    }
    function stt(n) {
        return d([n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), n.getUTCHours(), ])
    }
    function htt(n) {
        return d([n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), n.getUTCHours(), n.getUTCMinutes(), ])
    }
    function ctt(n) {
        return d([n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), n.getUTCHours(), n.getUTCMinutes(), n.getUTCSeconds(), ])
    }
    function ltt(n, t, i) {
        var r = n.getUTCFullYear(),
            u = cs(n, r, t, i),
            f;
        return u < 1 ? cs(n, r - 1, t, i) : (f = cs(n, r + 1, t, i), f >= 1) ? Math.min(u, f) : u
    }
    function cs(n, t, i, r) {
        var u = d([t, 0, 1 + att(t, i, r)]),
            f = h(n),
            e = Math.round(lt(u, f));
        return Math.floor(e / 7) + 1
    }
    function att(n, t, i) {
        var r = 7 + t - i,
            u = (7 + d([n, 0, r]).getUTCDay() - t) % 7;
        return -u + r - 1
    }
    function gv(n) {
        return [n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds(), ]
    }
    function ny(n) {
        return new Date(n[0], n[1] || 0, n[2] == null ? 1 : n[2], n[3] || 0, n[4] || 0, n[5] || 0)
    }
    function gt(n) {
        return [n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), n.getUTCHours(), n.getUTCMinutes(), n.getUTCSeconds(), n.getUTCMilliseconds(), ]
    }
    function d(n) {
        return n.length === 1 && (n = n.concat([0])), new Date(Date.UTC.apply(Date, n))
    }
    function ls(n) {
        return !isNaN(n.valueOf())
    }
    function ni(n) {
        return n.getUTCHours() * 36e5 + n.getUTCMinutes() * 6e4 + n.getUTCSeconds() * 1e3 + n.getUTCMilliseconds()
    }
    function vr(n, t, i, r) {
        return {
            instanceId: hi(),
            defId: n,
            range: t,
            forcedStartTzo: i == null ? null : i,
            forcedEndTzo: r == null ? null : r
        }
    }
    function as(n, t) {
        var u = {}, f, e, r, i, s, o;
        if (t) for (f in t) {
            for (e = [], i = n.length - 1; i >= 0; i -= 1) if (r = n[i][f], typeof r == "object" && r) e.unshift(r);
            else if (r !== undefined) {
                u[f] = r;
                break
            }
            e.length && (u[f] = as(e))
        }
        for (i = n.length - 1; i >= 0; i -= 1) {
            s = n[i];
            for (o in s) o in u || (u[o] = s[o])
        }
        return u
    }
    function ti(n, t) {
        var r = {};
        for (var i in n) t(n[i], i) && (r[i] = n[i]);
        return r
    }
    function ut(n, t) {
        var r = {};
        for (var i in n) r[i] = t(n[i], i);
        return r
    }
    function ty(n) {
        for (var u, i = {}, t = 0, r = n; t < r.length; t++) u = r[t], i[u] = !0;
        return i
    }
    function vtt(n, t) {
        for (var r, u = {}, i = 0; i < n.length; i += 1) r = t(n[i], i), u[r[0]] = r[1];
        return u
    }
    function vs(n) {
        var t = [];
        for (var i in n) t.push(n[i]);
        return t
    }
    function ft(n, t) {
        var i;
        if (n === t) return !0;
        for (i in n) if (yr.call(n, i) && !(i in t)) return !1;
        for (i in t) if (yr.call(t, i) && n[i] !== t[i]) return !1;
        return !0
    }
    function ys(n, t) {
        var r = [];
        for (var i in n) yr.call(n, i) && (i in t || r.push(i));
        for (i in t) yr.call(t, i) && n[i] !== t[i] && r.push(i);
        return r
    }
    function ps(n, t, i) {
        var r;
        if (i === void 0 && (i = {}), n === t) return !0;
        for (r in t) if (!(r in n) || !ytt(n[r], t[r], i[r])) return !1;
        for (r in n) if (!(r in t)) return !1;
        return !0
    }
    function ytt(n, t, i) {
        return n === t || i === !0 ? !0 : i ? i(n, t) : !1
    }
    function iy(n, t, i, r) {
        var f, u, e;
        for (t === void 0 && (t = 0), r === void 0 && (r = 1), f = [], i == null && (i = Object.keys(n).length), u = t; u < i; u += r) e = n[u], e !== undefined && f.push(e);
        return f
    }
    function ptt(n, t, i, r) {
        for (var e, u, f = 0; f < r.length; f += 1) if (e = r[f].parse(n, i), e) return u = n.allDay, u == null && (u = t, u == null && (u = e.allDayGuess, u == null && (u = !1))), {
            allDay: u,
            duration: e.duration,
            typeData: e.typeData,
            typeId: f
        };
        return null
    }
    function bi(n, t, i) {
        var a = i.dateEnv,
            p = i.pluginHooks,
            v = i.options,
            f = n.defs,
            e = n.instances,
            s, r, u, y, o, h, c, l;
        e = ti(e, function(n) {
            return !f[n.defId].recurringDef
        });
        for (s in f) if (r = f[s], r.recurringDef) for (u = r.recurringDef.duration, u || (u = r.allDay ? v.defaultAllDayEventDuration : v.defaultTimedEventDuration), y = wtt(r, u, t, a, p.recurringTypes), o = 0, h = y; o < h.length; o++) c = h[o], l = vr(s, {
            start: c,
            end: a.add(c, u)
        }), e[l.instanceId] = l;
        return {
            defs: f,
            instances: e
        }
    }
    function wtt(n, t, i, r, u) {
        var e = u[n.recurringDef.typeId],
            f = e.expand(n.recurringDef.typeData, {
                start: r.subtract(i.start, t),
                end: i.end
            }, r);
        return n.allDay && (f = f.map(h)), f
    }
    function o(n, t) {
        var i;
        return typeof n == "string" ? btt(n) : typeof n == "object" && n ? uy(n) : typeof n == "number" ? uy((i = {}, i[t || "milliseconds"] = n, i)) : null
    }
    function btt(n) {
        var t = ry.exec(n),
            i;
        return t ? (i = t[1] ? -1 : 1, {
            years: 0,
            months: 0,
            days: i * (t[2] ? parseInt(t[2], 10) : 0),
            milliseconds: i * ((t[3] ? parseInt(t[3], 10) : 0) * 36e5 + (t[4] ? parseInt(t[4], 10) : 0) * 6e4 + (t[5] ? parseInt(t[5], 10) : 0) * 1e3 + (t[6] ? parseInt(t[6], 10) : 0))
        }) : null
    }
    function uy(n) {
        var t = {
            years: n.years || n.year || 0,
            months: n.months || n.month || 0,
            days: n.days || n.day || 0,
            milliseconds: (n.hours || n.hour || 0) * 36e5 + (n.minutes || n.minute || 0) * 6e4 + (n.seconds || n.second || 0) * 1e3 + (n.milliseconds || n.millisecond || n.ms || 0)
        }, i = n.weeks || n.week;
        return i && (t.days += i * 7, t.specifiedWeeks = !0), t
    }
    function ktt(n, t) {
        return n.years === t.years && n.months === t.months && n.days === t.days && n.milliseconds === t.milliseconds
    }
    function dtt(n) {
        return !n.years && !n.months && !n.milliseconds ? n.days : 0
    }
    function tf(n, t) {
        return {
            years: n.years + t.years,
            months: n.months + t.months,
            days: n.days + t.days,
            milliseconds: n.milliseconds + t.milliseconds
        }
    }
    function gtt(n, t) {
        return {
            years: n.years - t.years,
            months: n.months - t.months,
            days: n.days - t.days,
            milliseconds: n.milliseconds - t.milliseconds
        }
    }
    function fy(n, t) {
        return {
            years: n.years * t,
            months: n.months * t,
            days: n.days * t,
            milliseconds: n.milliseconds * t
        }
    }
    function nit(n) {
        return ki(n) / 365
    }
    function tit(n) {
        return ki(n) / 30
    }
    function ki(n) {
        return g(n) / 864e5
    }
    function iit(n) {
        return g(n) / 6e4
    }
    function rit(n) {
        return g(n) / 1e3
    }
    function g(n) {
        return n.years * 31536e6 + n.months * 2592e6 + n.days * 864e5 + n.milliseconds
    }
    function rf(n, t) {
        for (var i, u, r = null, f = 0; f < ws.length; f += 1) if (i = ws[f], t[i]) {
            if (u = n[i] / t[i], !lr(u) || r !== null && r !== u) return null;
            r = u
        } else if (n[i]) return null;
        return r
    }
    function uf(n) {
        var t = n.milliseconds;
        if (t) {
            if (t % 1e3 != 0) return {
                unit: "millisecond",
                value: t
            };
            if (t % 6e4 != 0) return {
                unit: "second",
                value: t / 1e3
            };
            if (t % 36e5 != 0) return {
                unit: "minute",
                value: t / 6e4
            };
            if (t) return {
                unit: "hour",
                value: t / 36e5
            }
        }
        return n.days ? n.specifiedWeeks && n.days % 7 == 0 ? {
            unit: "week",
            value: n.days / 7
        } : {
            unit: "day",
            value: n.days
        } : n.months ? {
            unit: "month",
            value: n.months
        } : n.years ? {
            unit: "year",
            value: n.years
        } : {
            unit: "millisecond",
            value: 0
        }
    }
    function bs(n, t, i) {
        i === void 0 && (i = !1);
        var r = n.toISOString();
        return r = r.replace(".000", ""), i && (r = r.replace("T00:00:00Z", "")), r.length > 10 && (t == null ? r = r.replace("Z", "") : t !== 0 && (r = r.replace("Z", ks(t, !0)))), r
    }
    function pr(n) {
        return n.toISOString().replace(/T.*$/, "")
    }
    function ey(n) {
        return ci(n.getUTCHours(), 2) + ":" + ci(n.getUTCMinutes(), 2) + ":" + ci(n.getUTCSeconds(), 2)
    }
    function ks(n, t) {
        t === void 0 && (t = !1);
        var r = n < 0 ? "-" : "+",
            u = Math.abs(n),
            f = Math.floor(u / 60),
            i = Math.round(u % 60);
        return t ? r + ci(f, 2) + ":" + ci(i, 2) : "GMT" + r + f + (i ? ":" + ci(i, 2) : "")
    }
    function uit(n, t) {
        for (var r = 0, i = 0; i < n.length;) n[i] === t ? (n.splice(i, 1), r += 1) : i += 1;
        return r
    }
    function at(n, t, i) {
        if (n === t) return !0;
        var u = n.length,
            r;
        if (u !== t.length) return !1;
        for (r = 0; r < u; r += 1) if (!(i ? i(n[r], t[r]) : n[r] === t[r])) return !1;
        return !0
    }
    function f(n, t, i) {
        var u, r;
        return function() {
            for (var o, f = [], e = 0; e < arguments.length; e++) f[e] = arguments[e];
            return u ? at(u, f) || (i && i(r), o = n.apply(this, f), t && t(o, r) || (r = o)) : r = n.apply(this, f), u = f, r
        }
    }
    function wr(n, t, i) {
        var f = this,
            u, r;
        return function(e) {
            if (u) {
                if (!ft(u, e)) {
                    i && i(r);
                    var o = n.call(f, e);
                    t && t(o, r) || (r = o)
                }
            } else r = n.call(f, e);
            return u = e, r
        }
    }
    function fit(n, t, i) {
        var f = this,
            u = [],
            r = [];
        return function(e) {
            for (var c = u.length, h = e.length, o = 0, s; o < c; o += 1) e[o] ? at(u[o], e[o]) || (i && i(r[o]), s = n.apply(f, e[o]), t && t(s, r[o]) || (r[o] = s)) : i && i(r[o]);
            for (; o < h; o += 1) r[o] = n.apply(f, e[o]);
            return u = e, r.splice(h), r
        }
    }
    function eit(n, t, i) {
        var u = this,
            f = {}, r = {};
        return function(e) {
            var s = {}, o, h;
            for (o in e) r[o] ? at(f[o], e[o]) ? s[o] = r[o] : (i && i(r[o]), h = n.apply(u, e[o]), s[o] = t && t(h, r[o]) ? r[o] : h) : s[o] = n.apply(u, e[o]);
            return f = e, r = s, s
        }
    }
    function sy(n, t, i) {
        var r = Object.keys(n).length;
        return r === 1 && n.timeZoneName === "short" ? function(n) {
            return ks(n.timeZoneOffset)
        } : r === 0 && t.week ? function(n) {
            return wit(i.computeWeekNumber(n.marker), i.weekText, i.locale, t.week)
        } : ait(n, t, i)
    }
    function ait(n, t, r) {
        var e, u, f;
        return n = i({}, n), t = i({}, t), vit(n, t), n.timeZone = "UTC", e = new Intl.DateTimeFormat(r.locale.codes, n), t.omitZeroMinute && (f = i({}, n), delete f.minute, u = new Intl.DateTimeFormat(r.locale.codes, f)),
        function(i) {
            var f = i.marker,
                o, s;
            return o = u && !f.getUTCMinutes() ? u : e, s = o.format(f), yit(s, i, n, t, r)
        }
    }
    function vit(n, t) {
        n.timeZoneName && (n.hour || (n.hour = "2-digit"), n.minute || (n.minute = "2-digit"));
        n.timeZoneName === "long" && (n.timeZoneName = "short");
        t.omitZeroMinute && (n.second || n.millisecond) && delete t.omitZeroMinute
    }
    function yit(n, t, i, r, u) {
        return n = n.replace(hit, ""), i.timeZoneName === "short" && (n = pit(n, u.timeZone === "UTC" || t.timeZoneOffset == null ? "UTC" : ks(t.timeZoneOffset))), r.omitCommas && (n = n.replace(oit, "").trim()), r.omitZeroMinute && (n = n.replace(":00", "")), r.meridiem === !1 ? n = n.replace(ef, "").trim() : r.meridiem === "narrow" ? n = n.replace(ef, function(n, t) {
            return t.toLocaleLowerCase()
        }) : r.meridiem === "short" ? n = n.replace(ef, function(n, t) {
            return t.toLocaleLowerCase() + "m"
        }) : r.meridiem === "lowercase" && (n = n.replace(ef, function(n) {
            return n.toLocaleLowerCase()
        })), n = n.replace(sit, " "), n.trim()
    }
    function pit(n, t) {
        var i = !1;
        return n = n.replace(cit, function() {
            return i = !0, t
        }), i || (n += " " + t), n
    }
    function wit(n, t, i, r) {
        var u = [];
        return r === "narrow" ? u.push(t) : r === "short" && u.push(t, " "), u.push(i.simpleNumberFormat.format(n)), i.options.direction === "rtl" && u.reverse(), u.join("")
    }
    function bit(n, t, i) {
        return i.getMarkerYear(n) !== i.getMarkerYear(t) ? 5 : i.getMarkerMonth(n) !== i.getMarkerMonth(t) ? 4 : i.getMarkerDay(n) !== i.getMarkerDay(t) ? 2 : ni(n) !== ni(t) ? 1 : 0
    }
    function kit(n, t) {
        var r = {};
        for (var i in n)(!(i in ff) || ff[i] <= t) && (r[i] = n[i]);
        return r
    }
    function dit(n, t, i, r) {
        for (var f = 0, e, s, h, u, o, c, l; f < n.length;) {
            if (e = n.indexOf(t, f), e === -1) break;
            for (s = n.substr(0, e), f = e + t.length, h = n.substr(f), u = 0; u < i.length;) {
                if (o = i.indexOf(r, u), o === -1) break;
                if (c = i.substr(0, o), u = o + r.length, l = i.substr(u), s === c && h === l) return {
                    before: s,
                    after: h
                }
            }
        }
        return null
    }
    function hy(n, t) {
        var i = t.markerToArray(n.marker);
        return {
            marker: n.marker,
            timeZoneOffset: n.timeZoneOffset,
            array: i,
            year: i[0],
            month: i[1],
            day: i[2],
            hour: i[3],
            minute: i[4],
            second: i[5],
            millisecond: i[6]
        }
    }
    function of(n, t, i, r) {
        var u = hy(n, i.calendarSystem),
            f = t ? hy(t, i.calendarSystem) : null;
        return {
            date: u,
            start: u,
            end: f,
            timeZone: i.timeZone,
            localeCodes: i.locale.codes,
            defaultSeparator: r || i.defaultSeparator
        }
    }
    function c(n) {
        return typeof n == "object" && n ? new lit(n) : typeof n == "string" ? new cy(n) : typeof n == "function" ? new ly(n) : null
    }
    function sf(n, t) {
        return typeof n == "object" && typeof t == "object" && n && t ? ft(n, t) : n === t
    }
    function nh(n) {
        return as(n, gs)
    }
    function br(n, t) {
        var r = {}, u = {};
        for (var i in t) i in n && (r[i] = t[i](n[i]));
        for (i in n) i in t || (u[i] = n[i]);
        return r.extra = u, {
            refined: r,
            extra: u
        }
    }
    function r(n) {
        return n
    }
    function hf(n, t, i, r) {
        for (var s, f, e = b(), h = ih(i), u = 0, o = n; u < o.length; u++) s = o[u], f = by(s, t, i, r, h), f && di(f, e);
        return e
    }
    function di(n, t) {
        return t === void 0 && (t = b()), t.defs[n.def.defId] = n.def, n.instance && (t.instances[n.instance.instanceId] = n.instance), t
    }
    function cf(n, t) {
        var i = n.instances[t],
            r, u;
        return i ? (r = n.defs[i.defId], u = kr(n, function(n) {
            return git(r, n)
        }), u.defs[r.defId] = r, u.instances[i.instanceId] = i, u) : b()
    }
    function git(n, t) {
        return Boolean(n.groupId && n.groupId === t.groupId)
    }
    function b() {
        return {
            defs: {},
            instances: {}
        }
    }
    function lf(n, t) {
        return {
            defs: i(i({}, n.defs), t.defs),
            instances: i(i({}, n.instances), t.instances)
        }
    }
    function kr(n, t) {
        var i = ti(n.defs, t),
            r = ti(n.instances, function(n) {
                return i[n.defId]
            });
        return {
            defs: i,
            instances: r
        }
    }
    function nrt(n, t) {
        var e = n.defs,
            u = n.instances,
            f = {}, o = {}, r, i;
        for (r in e) t.defs[r] || (f[r] = e[r]);
        for (i in u)!t.instances[i] && f[u[i].defId] && (o[i] = u[i]);
        return {
            defs: f,
            instances: o
        }
    }
    function trt(n, t) {
        return Array.isArray(n) ? hf(n, null, t, !0) : typeof n == "object" && n ? hf([n], null, t, !0) : n != null ? String(n) : null
    }
    function af(n) {
        return Array.isArray(n) ? n : typeof n == "string" ? n.split(/\s+/) : []
    }
    function gr(n, t) {
        var i = trt(n.constraint, t);
        return {
            display: n.display || null,
            startEditable: n.startEditable != null ? n.startEditable : n.editable,
            durationEditable: n.durationEditable != null ? n.durationEditable : n.editable,
            constraints: i != null ? [i] : [],
            overlap: n.overlap != null ? n.overlap : null,
            allows: n.allow != null ? [n.allow] : [],
            backgroundColor: n.backgroundColor || n.color || "",
            borderColor: n.borderColor || n.color || "",
            textColor: n.textColor || "",
            classNames: (n.className || []).concat(n.classNames || [])
        }
    }
    function th(n) {
        return n.reduce(irt, py)
    }
    function irt(n, t) {
        return {
            display: t.display != null ? t.display : n.display,
            startEditable: t.startEditable != null ? t.startEditable : n.startEditable,
            durationEditable: t.durationEditable != null ? t.durationEditable : n.durationEditable,
            constraints: n.constraints.concat(t.constraints),
            overlap: typeof t.overlap == "boolean" ? t.overlap : n.overlap,
            allows: n.allows.concat(t.allows),
            backgroundColor: t.backgroundColor || n.backgroundColor,
            borderColor: t.borderColor || n.borderColor,
            textColor: t.textColor || n.textColor,
            classNames: n.classNames.concat(t.classNames)
        }
    }
    function by(n, t, i, r, u) {
        var f, o, a;
        u === void 0 && (u = ih(i));
        var h = yf(n, i, u),
            s = h.refined,
            c = h.extra,
            l = frt(t, i),
            e = ptt(s, l, i.dateEnv, i.pluginHooks.recurringTypes);
        return e ? (o = nu(s, c, t ? t.sourceId : "", e.allDay, Boolean(e.duration), i), o.recurringDef = {
            typeId: e.typeId,
            typeData: e.typeData,
            duration: e.duration
        }, {
            def: o,
            instance: null
        }) : (f = urt(s, l, i, r), f) ? (o = nu(s, c, t ? t.sourceId : "", f.allDay, f.hasEnd, i), a = vr(o.defId, f.range, f.forcedStartTzo, f.forcedEndTzo), {
            def: o,
            instance: a
        }) : null
    }
    function yf(n, t, i) {
        return i === void 0 && (i = ih(t)), br(n, i)
    }
    function ih(n) {
        return i(i(i({}, dr), rrt), n.pluginHooks.eventRefiners)
    }
    function nu(n, t, r, u, f, e) {
        for (var c, o = {
            title: n.title || "",
            groupId: n.groupId || "",
            publicId: n.id || "",
            url: n.url || "",
            recurringDef: null,
            defId: hi(),
            sourceId: r,
            allDay: u,
            hasEnd: f,
            ui: gr(n, e),
            extendedProps: i(i({}, n.extendedProps || {}), t)
        }, s = 0, h = e.pluginHooks.eventDefMemberAdders; s < h.length; s++) c = h[s], i(o, c(n));
        return Object.freeze(o.ui.classNames), Object.freeze(o.extendedProps), o
    }
    function urt(n, t, i, r) {
        var s = n.allDay,
            e, u = null,
            c = !1,
            o, f = null,
            l = n.start != null ? n.start : n.date;
        if (e = i.dateEnv.createMarkerMeta(l), e) u = e.marker;
        else if (!r) return null;
        return n.end != null && (o = i.dateEnv.createMarkerMeta(n.end)), s == null && (s = t != null ? t : (!e || e.isTimeUnspecified) && (!o || o.isTimeUnspecified)), s && u && (u = h(u)), o && (f = o.marker, s && (f = h(f)), u && f <= u && (f = null)), f ? c = !0 : r || (c = i.options.forceEventDuration || !1, f = i.dateEnv.add(u, s ? i.options.defaultAllDayEventDuration : i.options.defaultTimedEventDuration)), {
            allDay: s,
            hasEnd: c,
            range: {
                start: u,
                end: f
            },
            forcedStartTzo: e ? e.forcedTzo : null,
            forcedEndTzo: o ? o.forcedTzo : null
        }
    }
    function frt(n, t) {
        var i = null;
        return n && (i = n.defaultAllDay), i == null && (i = t.options.defaultAllDay), i
    }
    function ky(n) {
        var i = Math.floor(lt(n.start, n.end)) || 1,
            t = h(n.start),
            r = y(t, i);
        return {
            start: t,
            end: r
        }
    }
    function pf(n, t) {
        var r, i, u;
        return t === void 0 && (t = o(0)), r = null, i = null, n.end && (i = h(n.end), u = n.end.valueOf() - i.valueOf(), u && u >= g(t) && (i = y(i, 1))), n.start && (r = h(n.start), i && i <= r && (i = y(r, 1))), {
            start: r,
            end: i
        }
    }
    function dy(n) {
        var t = pf(n);
        return lt(t.start, t.end) > 1
    }
    function li(n, t, i, r) {
        return r === "year" ? o(i.diffWholeYears(n, t), "year") : r === "month" ? o(i.diffWholeMonths(n, t), "month") : kv(n, t)
    }
    function ert(n, t) {
        var i = null,
            r = null;
        return (n.start && (i = t.createMarker(n.start)), n.end && (r = t.createMarker(n.end)), !i && !r) ? null : i && r && r < i ? null : {
            start: i,
            end: r
        }
    }
    function gy(n, t) {
        var f = [],
            i = t.start,
            u, r;
        for (n.sort(ort), u = 0; u < n.length; u += 1) r = n[u], r.start > i && f.push({
            start: i,
            end: r.start
        }), r.end > i && (i = r.end);
        return i < t.end && f.push({
            start: i,
            end: t.end
        }), f
    }
    function ort(n, t) {
        return n.start.valueOf() - t.start.valueOf()
    }
    function ii(n, t) {
        var i = n.start,
            r = n.end,
            u = null;
        return t.start !== null && (i = i === null ? t.start : new Date(Math.max(i.valueOf(), t.start.valueOf()))), t.end != null && (r = r === null ? t.end : new Date(Math.min(r.valueOf(), t.end.valueOf()))), (i === null || r === null || i < r) && (u = {
            start: i,
            end: r
        }), u
    }
    function np(n, t) {
        return (n.start === null ? null : n.start.valueOf()) === (t.start === null ? null : t.start.valueOf()) && (n.end === null ? null : n.end.valueOf()) === (t.end === null ? null : t.end.valueOf())
    }
    function wf(n, t) {
        return (n.end === null || t.start === null || n.end > t.start) && (n.start === null || t.end === null || n.start < t.end)
    }
    function tu(n, t) {
        return (n.start === null || t.start !== null && t.start >= n.start) && (n.end === null || t.end !== null && t.end <= n.end)
    }
    function et(n, t) {
        return (n.start === null || t >= n.start) && (n.end === null || t < n.end)
    }
    function srt(n, t) {
        return t.start != null && n < t.start ? t.start : t.end != null && n >= t.end ? new Date(t.end.valueOf() - 1) : n
    }
    function iu(n, t, i, r) {
        var h = {}, c = {}, k = {}, l = [],
            it = [],
            a = bf(n.defs, t),
            u, e, rt, d, w, g, f, y, p, b, tt, nt;
        for (f in n.defs) u = n.defs[f], e = a[u.defId], e.display === "inverse-background" && (u.groupId ? (h[u.groupId] = [], k[u.groupId] || (k[u.groupId] = u)) : c[f] = []);
        for (rt in n.instances) {
            var v = n.instances[rt],
                u = n.defs[v.defId],
                e = a[u.defId],
                ut = v.range,
                s = !u.allDay && r ? pf(ut, r) : ut,
                o = ii(s, i);
            o && (e.display === "inverse-background" ? u.groupId ? h[u.groupId].push(o) : c[v.defId].push(o) : e.display !== "none" && (e.display === "background" ? l : it).push({
                def: u,
                ui: e,
                instance: v,
                range: o,
                isStart: s.start && s.start.valueOf() === o.start.valueOf(),
                isEnd: s.end && s.end.valueOf() === o.end.valueOf()
            }))
        }
        for (d in h) for (y = h[d], p = gy(y, i), w = 0, g = p; w < g.length; w++) {
            var nt = g[w],
                u = k[d],
                e = a[u.defId];
            l.push({
                def: u,
                ui: e,
                instance: null,
                range: nt,
                isStart: !1,
                isEnd: !1
            })
        }
        for (f in c) for (y = c[f], p = gy(y, i), b = 0, tt = p; b < tt.length; b++) nt = tt[b], l.push({
            def: n.defs[f],
            ui: a[f],
            instance: null,
            range: nt,
            isStart: !1,
            isEnd: !1
        });
        return {
            bg: l,
            fg: it
        }
    }
    function tp(n) {
        return n.ui.display === "background" || n.ui.display === "inverse-background"
    }
    function rh(n, t) {
        n.fcSeg = t
    }
    function ai(n) {
        return n.fcSeg || n.parentNode.fcSeg || null
    }
    function bf(n, t) {
        return ut(n, function(n) {
            return ip(n, t)
        })
    }
    function ip(n, t) {
        var i = [];
        return t[""] && i.push(t[""]), t[n.defId] && i.push(t[n.defId]), i.push(n.ui), th(i)
    }
    function kf(n, t) {
        var i = n.map(rp);
        return i.sort(function(n, i) {
            return av(n, i, t)
        }), i.map(function(n) {
            return n._seg
        })
    }
    function rp(n) {
        var t = n.eventRange,
            r = t.def,
            u = t.instance ? t.instance.range : t.range,
            f = u.start ? u.start.valueOf() : 0,
            e = u.end ? u.end.valueOf() : 0;
        return i(i(i({}, r.extendedProps), r), {
            id: r.publicId,
            start: f,
            end: e,
            duration: e - f,
            allDay: Number(r.allDay),
            _seg: n
        })
    }
    function up(n, t) {
        for (var o, s = t.pluginHooks, h = s.isDraggableTransformers, u = n.eventRange, c = u.def, f = u.ui, i = f.startEditable, r = 0, e = h; r < e.length; r++) o = e[r], i = o(i, c, f, t);
        return i
    }
    function fp(n, t) {
        return n.isStart && n.eventRange.ui.durationEditable && t.options.eventResizableFromStart
    }
    function ep(n) {
        return n.isEnd && n.eventRange.ui.durationEditable
    }
    function gi(n, t, i, r, u, f, e) {
        var v = i.dateEnv,
            y = i.options,
            l = y.displayEventTime,
            a = y.displayEventEnd,
            p = n.eventRange.def,
            o = n.eventRange.instance;
        l == null && (l = r !== !1);
        a == null && (a = u !== !1);
        var w = o.range.start,
            b = o.range.end,
            s = f || n.start || n.eventRange.range.start,
            c = e || n.end || n.eventRange.range.end,
            k = h(w).valueOf() === h(s).valueOf(),
            d = h(dt(b, -1)).valueOf() === h(dt(c, -1)).valueOf();
        return l && !p.allDay && (k || d) ? (s = k ? w : s, c = d ? b : c, a && p.hasEnd) ? v.formatRange(s, c, t, {
            forcedStartTzo: f ? null : o.forcedStartTzo,
            forcedEndTzo: e ? null : o.forcedEndTzo
        }) : v.format(s, t, {
            forcedTzo: f ? null : o.forcedStartTzo
        }) : ""
    }
    function ot(n, t, i) {
        var r = n.eventRange.range;
        return {
            isPast: r.end < (i || t.start),
            isFuture: r.start >= (i || t.end),
            isToday: t && et(t, r.start)
        }
    }
    function op(n) {
        var t = ["fc-event"];
        return n.isMirror && t.push("fc-event-mirror"), n.isDraggable && t.push("fc-event-draggable"), (n.isStartResizable || n.isEndResizable) && t.push("fc-event-resizable"), n.isDragging && t.push("fc-event-dragging"), n.isResizing && t.push("fc-event-resizing"), n.isSelected && t.push("fc-event-selected"), n.isStart && t.push("fc-event-start"), n.isEnd && t.push("fc-event-end"), n.isPast && t.push("fc-event-past"), n.isToday && t.push("fc-event-today"), n.isFuture && t.push("fc-event-future"), t
    }
    function uh(n) {
        return n.instance ? n.instance.instanceId : n.def.defId + ":" + n.range.start.toISOString()
    }
    function hrt(n, t, i) {
        var u = crt(n, t),
            r = u.range;
        if (!r.start) return null;
        if (!r.end) {
            if (i == null) return null;
            r.end = t.add(r.start, i)
        }
        return u
    }
    function crt(n, t) {
        var o = br(n, sp),
            r = o.refined,
            s = o.extra,
            u = r.start ? t.createMarkerMeta(r.start) : null,
            f = r.end ? t.createMarkerMeta(r.end) : null,
            e = r.allDay;
        return e == null && (e = u && u.isTimeUnspecified && (!f || f.isTimeUnspecified)), i({
            range: {
                start: u ? u.marker : null,
                end: f ? f.marker : null
            },
            allDay: e
        }, s)
    }
    function hp(n, t) {
        return np(n.range, t.range) && n.allDay === t.allDay && lrt(n, t)
    }
    function lrt(n, t) {
        for (var i in t) if (i !== "range" && i !== "allDay" && n[i] !== t[i]) return !1;
        for (i in n) if (!(i in t)) return !1;
        return !0
    }
    function art(n, t) {
        return i(i({}, lp(n.range, t, n.allDay)), {
            allDay: n.allDay
        })
    }
    function cp(n, t, r) {
        return i(i({}, lp(n, t, r)), {
            timeZone: t.timeZone
        })
    }
    function lp(n, t, i) {
        return {
            start: t.toDate(n.start),
            end: t.toDate(n.end),
            startStr: t.formatIso(n.start, {
                omitTime: i
            }),
            endStr: t.formatIso(n.end, {
                omitTime: i
            })
        }
    }
    function vrt(n, t, i) {
        var u = yf({
            editable: !1
        }, i),
            r = nu(u.refined, u.extra, "", n.allDay, !0, i);
        return {
            def: r,
            ui: ip(r, t),
            instance: vr(r.defId, n.range),
            range: n.range,
            isStart: !0,
            isEnd: !0
        }
    }
    function fh(n, t, r) {
        r.emitter.trigger("select", i(i({}, eh(n, r)), {
            jsEvent: t ? t.origEvent : null,
            view: r.viewApi || r.calendarApi.view
        }))
    }
    function yrt(n, t) {
        t.emitter.trigger("unselect", {
            jsEvent: n ? n.origEvent : null,
            view: t.viewApi || t.calendarApi.view
        })
    }
    function eh(n, t) {
        for (var e, r = {}, u = 0, f = t.pluginHooks.dateSpanTransforms; u < f.length; u++) e = f[u], i(r, e(n, t));
        return i(r, art(n, t.dateEnv)), r
    }
    function df(n, t, i) {
        var u = i.dateEnv,
            f = i.options,
            r = t;
        return n ? (r = h(r), r = u.add(r, f.defaultAllDayEventDuration)) : r = u.add(r, f.defaultTimedEventDuration), r
    }
    function gf(n, t, i, r) {
        var h = bf(n.defs, t),
            u = b(),
            f, s, o, e;
        for (f in n.defs) e = n.defs[f], u.defs[f] = prt(e, h[f], i, r);
        for (s in n.instances) o = n.instances[s], e = u.defs[o.defId], u.instances[s] = wrt(o, e, h[o.defId], i, r);
        return u
    }
    function prt(n, t, r, u) {
        var e = r.standardProps || {}, f, o, s, h;
        for (e.hasEnd == null && t.durationEditable && (r.startDelta || r.endDelta) && (e.hasEnd = !0), f = i(i(i({}, n), e), {
            ui: i(i({}, n.ui), e.ui)
        }), r.extendedProps && (f.extendedProps = i(i({}, f.extendedProps), r.extendedProps)), o = 0, s = u.pluginHooks.eventDefMutationAppliers; o < s.length; o++) h = s[o], h(f, r, u);
        return !f.hasEnd && u.options.forceEventDuration && (f.hasEnd = !0), f
    }
    function wrt(n, t, r, u, f) {
        var o = f.dateEnv,
            s = u.standardProps && u.standardProps.allDay === !0,
            c = u.standardProps && u.standardProps.hasEnd === !1,
            e = i({}, n);
        return s && (e.range = ky(e.range)), u.datesDelta && r.startEditable && (e.range = {
            start: o.add(e.range.start, u.datesDelta),
            end: o.add(e.range.end, u.datesDelta)
        }), u.startDelta && r.durationEditable && (e.range = {
            start: o.add(e.range.start, u.startDelta),
            end: e.range.end
        }), u.endDelta && r.durationEditable && (e.range = {
            start: e.range.start,
            end: o.add(e.range.end, u.endDelta)
        }), c && (e.range = {
            start: e.range.start,
            end: df(t.allDay, e.range.start, f)
        }), t.allDay && (e.range = {
            start: h(e.range.start),
            end: h(e.range.end)
        }), e.range.end < e.range.start && (e.range.end = df(t.allDay, e.range.start, f)), e
    }
    function vp(n, t, i) {
        var u;
        if (i === void 0 && (i = yp(t)), typeof n == "string" ? u = {
            url: n
        } : typeof n == "function" || Array.isArray(n) ? u = {
            events: n
        } : typeof n == "object" && n && (u = n), u) {
            var e = br(u, i),
                r = e.refined,
                o = e.extra,
                f = brt(r, t);
            if (f) return {
                _raw: n,
                isFetching: !1,
                latestFetchId: "",
                fetchRange: null,
                defaultAllDay: r.defaultAllDay,
                eventDataTransform: r.eventDataTransform,
                success: r.success,
                failure: r.failure,
                publicId: r.id || "",
                sourceId: hi(),
                sourceDefId: f.sourceDefId,
                meta: f.meta,
                ui: gr(r, t),
                extendedProps: o
            }
        }
        return null
    }
    function yp(n) {
        return i(i(i({}, dr), ap), n.pluginHooks.eventSourceRefiners)
    }
    function brt(n, t) {
        for (var f, r, u = t.pluginHooks.eventSourceDefs, i = u.length - 1; i >= 0; i -= 1) if (f = u[i], r = f.parseMeta(n), r) return {
            sourceDefId: i,
            meta: r
        };
        return null
    }
    function krt(n, t) {
        switch (t.type) {
            case "CHANGE_DATE":
                return t.dateMarker;
            default:
                return n
        }
    }
    function drt(n, t) {
        var i = n.initialDate;
        return i != null ? t.createMarker(i) : ru(n.now, t)
    }
    function ru(n, t) {
        return (typeof n == "function" && (n = n()), n == null) ? t.createNowMarker() : t.createMarker(n)
    }
    function pp(n) {
        var t, i, u = n._def,
            r = n._instance;
        return {
            defs: (t = {}, t[u.defId] = u, t),
            instances: r ? (i = {}, i[r.instanceId] = r, i) : {}
        }
    }
    function ri(n, t, i) {
        var s = n.defs,
            u = n.instances,
            f = [],
            h = i ? i.instanceId : "",
            e, r, o;
        for (e in u) r = u[e], o = s[r.defId], r.instanceId !== h && f.push(new l(t, o, r));
        return f
    }
    function grt(n, t) {
        hh[n] = t
    }
    function nut(n) {
        return new hh[n]
    }
    function kp(n) {
        var t = bp.exec(n),
            i, r;
        return t && (i = new Date(Date.UTC(Number(t[1]), t[3] ? Number(t[3]) - 1 : 0, Number(t[5] || 1), Number(t[7] || 0), Number(t[8] || 0), Number(t[10] || 0), t[12] ? Number("0." + t[12]) * 1e3 : 0)), ls(i)) ? (r = null, t[13] && (r = (t[15] === "-" ? -1 : 1) * (Number(t[16] || 0) * 60 + Number(t[18] || 0))), {
            marker: i,
            isTimeUnspecified: !t[6],
            timeZoneOffset: r
        }) : null
    }
    function gp(n) {
        for (var i, f = n.length > 0 ? n[0].code : "en", e = dp.concat(n), r = {
            en: lh
        }, t = 0, u = e; t < u.length; t++) i = u[t], r[i.code] = i;
        return {
            map: r,
            defaultCode: f
        }
    }
    function ah(n, t) {
        return typeof n == "object" && !Array.isArray(n) ? nw(n.code, [n.code], n) : tut(n, t)
    }
    function tut(n, t) {
        var i = [].concat(n || []),
            r = iut(i, t) || lh;
        return nw(n, i, r)
    }
    function iut(n, t) {
        for (var u, r, f, i = 0; i < n.length; i += 1) for (u = n[i].toLocaleLowerCase().split("-"), r = u.length; r > 0; r -= 1) if (f = u.slice(0, r).join("-"), t[f]) return t[f];
        return null
    }
    function nw(n, t, i) {
        var r = as([lh, i], ["buttonText"]),
            u;
        return delete r.code, u = r.week, delete r.week, {
            codeArg: n,
            codes: t,
            week: u,
            simpleNumberFormat: new Intl.NumberFormat(n),
            options: r
        }
    }
    function rut(n, t) {
        t === void 0 && (t = {});
        var r = tw(t),
            u = c(t),
            i = r.createMarkerMeta(n);
        return i ? r.format(i.marker, u, {
            forcedTzo: i.forcedTzo
        }) : ""
    }
    function uut(n, t, i) {
        var r = tw(typeof i == "object" && i ? i : {}),
            e = c(i),
            u = r.createMarkerMeta(n),
            f = r.createMarkerMeta(t);
        return !u || !f ? "" : r.formatRange(u.marker, f.marker, e, {
            forcedStartTzo: u.forcedTzo,
            forcedEndTzo: f.forcedTzo,
            isEndExclusive: i.isEndExclusive,
            defaultSeparator: vt.defaultRangeSeparator
        })
    }
    function tw(n) {
        var t = ah(n.locale || "en", gp([]).map);
        return new ch(i(i({
            timeZone: vt.timeZone,
            calendarSystem: "gregory"
        }, n), {
            locale: t
        }))
    }
    function rw(n, t) {
        return hf(fut(n), null, t)
    }
    function fut(n) {
        var t;
        return t = n === !0 ? [{}] : Array.isArray(n) ? n.filter(function(n) {
            return n.daysOfWeek
        }) : typeof n == "object" && n ? [n] : [], t.map(function(n) {
            return i(i({}, iw), n)
        })
    }
    function uw(n, t) {
        return n.left >= t.left && n.left < t.right && n.top >= t.top && n.top < t.bottom
    }
    function vh(n, t) {
        var i = {
            left: Math.max(n.left, t.left),
            right: Math.min(n.right, t.right),
            top: Math.max(n.top, t.top),
            bottom: Math.min(n.bottom, t.bottom)
        };
        return i.left < i.right && i.top < i.bottom ? i : !1
    }
    function eut(n, t, i) {
        return {
            left: n.left + t,
            right: n.right + t,
            top: n.top + i,
            bottom: n.bottom + i
        }
    }
    function fw(n, t) {
        return {
            left: Math.min(Math.max(n.left, t.left), t.right),
            top: Math.min(Math.max(n.top, t.top), t.bottom)
        }
    }
    function ew(n) {
        return {
            left: (n.left + n.right) / 2,
            top: (n.top + n.bottom) / 2
        }
    }
    function ow(n, t) {
        return {
            left: n.left - t.left,
            top: n.top - t.top
        }
    }
    function ph() {
        return yh == null && (yh = out()), yh
    }
    function out() {
        var n, t, i;
        return typeof document == "undefined" ? !0 : (n = document.createElement("div"), n.style.position = "absolute", n.style.top = "0px", n.style.left = "0px", n.innerHTML = "<table><tr><td><div><\/div><\/td><\/tr><\/table>", n.querySelector("table").style.height = "100px", n.querySelector("div").style.height = "100%", document.body.appendChild(n), t = n.querySelector("div"), i = t.offsetHeight > 0, document.body.removeChild(n), i)
    }
    function sut(n, t, r) {
        var u = [],
            f;
        return n && u.push(n), t && u.push(t), f = {
            "": th(u)
        }, r && i(f, r), f
    }
    function te(n, t, i, r) {
        return {
            dow: n.getUTCDay(),
            isDisabled: Boolean(r && !et(r.activeRange, n)),
            isOther: Boolean(r && !et(r.currentRange, n)),
            isToday: Boolean(t && et(t, n)),
            isPast: Boolean(i ? n < i : t ? n < t.start : !1),
            isFuture: Boolean(i ? n > i : t ? n >= t.end : !1)
        }
    }
    function uu(n, t) {
        var i = ["fc-day", "fc-day-" + ss[n.dow], ];
        return n.isDisabled ? i.push("fc-day-disabled") : (n.isToday && (i.push("fc-day-today"), i.push(t.getClass("today"))), n.isPast && i.push("fc-day-past"), n.isFuture && i.push("fc-day-future"), n.isOther && i.push("fc-day-other")), i
    }
    function hut(n, t) {
        var i = ["fc-slot", "fc-slot-" + ss[n.dow], ];
        return n.isDisabled ? i.push("fc-slot-disabled") : (n.isToday && (i.push("fc-slot-today"), i.push(t.getClass("today"))), n.isPast && i.push("fc-slot-past"), n.isFuture && i.push("fc-slot-future")), i
    }
    function nr(n, t) {
        return t === void 0 && (t = "day"), JSON.stringify({
            date: pr(n),
            type: t
        })
    }
    function sw() {
        return ie === null && (ie = cut()), ie
    }
    function cut() {
        var n = document.createElement("div"),
            t, i;
        return wi(n, {
            position: "absolute",
            top: -1e3,
            left: 0,
            border: 0,
            padding: 0,
            overflow: "scroll",
            direction: "rtl"
        }), n.innerHTML = "<div><\/div>", document.body.appendChild(n), t = n.firstChild, i = t.getBoundingClientRect().left > n.getBoundingClientRect().left, gu(n), i
    }
    function hw() {
        return bh || (bh = lut()), bh
    }
    function lut() {
        var n = document.createElement("div"),
            t;
        return n.style.overflow = "scroll", n.style.position = "absolute", n.style.top = "-9999px", n.style.left = "-9999px", document.body.appendChild(n), t = cw(n), document.body.removeChild(n), t
    }
    function cw(n) {
        return {
            x: n.offsetHeight - n.clientHeight,
            y: n.offsetWidth - n.clientWidth
        }
    }
    function lw(n, t) {
        t === void 0 && (t = !1);
        var i = window.getComputedStyle(n),
            u = parseInt(i.borderLeftWidth, 10) || 0,
            f = parseInt(i.borderRightWidth, 10) || 0,
            e = parseInt(i.borderTopWidth, 10) || 0,
            o = parseInt(i.borderBottomWidth, 10) || 0,
            s = cw(n),
            h = s.y - u - f,
            c = s.x - e - o,
            r = {
                borderLeft: u,
                borderRight: f,
                borderTop: e,
                borderBottom: o,
                scrollbarBottom: c,
                scrollbarLeft: 0,
                scrollbarRight: 0
            };
        return sw() && i.direction === "rtl" ? r.scrollbarLeft = h : r.scrollbarRight = h, t && (r.paddingLeft = parseInt(i.paddingLeft, 10) || 0, r.paddingRight = parseInt(i.paddingRight, 10) || 0, r.paddingTop = parseInt(i.paddingTop, 10) || 0, r.paddingBottom = parseInt(i.paddingBottom, 10) || 0), r
    }
    function aw(n, t, i) {
        t === void 0 && (t = !1);
        var f = i ? n.getBoundingClientRect() : re(n),
            r = lw(n, t),
            u = {
                left: f.left + r.borderLeft + r.scrollbarLeft,
                right: f.right - r.borderRight - r.scrollbarRight,
                top: f.top + r.borderTop,
                bottom: f.bottom - r.borderBottom - r.scrollbarBottom
            };
        return t && (u.left += r.paddingLeft, u.right -= r.paddingRight, u.top += r.paddingTop, u.bottom -= r.paddingBottom), u
    }
    function re(n) {
        var t = n.getBoundingClientRect();
        return {
            left: t.left + window.pageXOffset,
            top: t.top + window.pageYOffset,
            right: t.right + window.pageXOffset,
            bottom: t.bottom + window.pageYOffset
        }
    }
    function aut(n) {
        for (var f, r, e = kh(n), t = n.getBoundingClientRect(), i = 0, u = e; i < u.length; i++) if (f = u[i], r = vh(t, f.getBoundingClientRect()), r) t = r;
        else return null;
        return t
    }
    function vut(n) {
        return n.getBoundingClientRect().height + yut(n)
    }
    function yut(n) {
        var t = window.getComputedStyle(n);
        return parseInt(t.marginTop, 10) + parseInt(t.marginBottom, 10)
    }
    function kh(n) {
        for (var i = [], t; n instanceof HTMLElement;) {
            if (t = window.getComputedStyle(n), t.position === "fixed") break;
            /(auto|scroll)/.test(t.overflow + t.overflowY + t.overflowX) && i.push(n);
            n = n.parentNode
        }
        return i
    }
    function vw(n, t, i) {
        var r = !1,
            f = function() {
                r || (r = !0, t.apply(this, arguments))
            }, e = function() {
                r || (r = !0, i && i.apply(this, arguments))
            }, u = n(f, e);
        u && typeof u.then == "function" && u.then(f, e)
    }
    function put(n, t, i) {
        (n[t] || (n[t] = [])).push(i)
    }
    function wut(n, t, i) {
        i ? n[t] && (n[t] = n[t].filter(function(n) {
            return n !== i
        })) : delete n[t]
    }
    function but(n, t, i, r, u, f, e, s, h, c, l, a, v) {
        return {
            dateEnv: u,
            options: i,
            pluginHooks: e,
            emitter: c,
            dispatch: s,
            getCurrentData: h,
            calendarApi: l,
            viewSpec: n,
            viewApi: t,
            dateProfileGenerator: r,
            theme: f,
            isRtl: i.direction === "rtl",
            addResizeHandler: function(n) {
                c.on("_resize", n)
            },
            removeResizeHandler: function(n) {
                c.off("_resize", n)
            },
            createScrollResponder: function(n) {
                return new dw(n, c, o(i.scrollTime), i.scrollTimeReset)
            },
            registerInteractiveComponent: a,
            unregisterInteractiveComponent: v
        }
    }
    function kut(n) {
        var t = Object.create(this.prototype.propEquality);
        i(t, n);
        this.prototype.propEquality = t
    }
    function dut(n) {
        var t = Object.create(this.prototype.stateEquality);
        i(t, n);
        this.prototype.stateEquality = t
    }
    function tt(n, t) {
        typeof n == "function" ? n(t) : n && (n.current = t)
    }
    function nt(n) {
        return {
            id: hi(),
            deps: n.deps || [],
            reducers: n.reducers || [],
            isLoadingFuncs: n.isLoadingFuncs || [],
            contextInit: [].concat(n.contextInit || []),
            eventRefiners: n.eventRefiners || {},
            eventDefMemberAdders: n.eventDefMemberAdders || [],
            eventSourceRefiners: n.eventSourceRefiners || {},
            isDraggableTransformers: n.isDraggableTransformers || [],
            eventDragMutationMassagers: n.eventDragMutationMassagers || [],
            eventDefMutationAppliers: n.eventDefMutationAppliers || [],
            dateSelectionTransformers: n.dateSelectionTransformers || [],
            datePointTransforms: n.datePointTransforms || [],
            dateSpanTransforms: n.dateSpanTransforms || [],
            views: n.views || {},
            viewPropsTransformers: n.viewPropsTransformers || [],
            isPropsValid: n.isPropsValid || null,
            externalDefTransforms: n.externalDefTransforms || [],
            viewContainerAppends: n.viewContainerAppends || [],
            eventDropTransformers: n.eventDropTransformers || [],
            componentInteractions: n.componentInteractions || [],
            calendarInteractions: n.calendarInteractions || [],
            themeClasses: n.themeClasses || {},
            eventSourceDefs: n.eventSourceDefs || [],
            cmdFormatter: n.cmdFormatter,
            recurringTypes: n.recurringTypes || [],
            namedTimeZonedImpl: n.namedTimeZonedImpl,
            initialView: n.initialView || "",
            elementDraggingImpl: n.elementDraggingImpl,
            optionChangeHandlers: n.optionChangeHandlers || {},
            scrollGridImpl: n.scrollGridImpl || null,
            contentTypeHandlers: n.contentTypeHandlers || {},
            listenerRefiners: n.listenerRefiners || {},
            optionRefiners: n.optionRefiners || {},
            propSetHandlers: n.propSetHandlers || {}
        }
    }
    function gut(n, t) {
        function r(n) {
            for (var t, f = 0, e = n; f < e.length; f++) t = e[f], u[t.id] || (u[t.id] = !0, r(t.deps), i = tft(i, t))
        }
        var u = {}, i = {
            reducers: [],
            isLoadingFuncs: [],
            contextInit: [],
            eventRefiners: {},
            eventDefMemberAdders: [],
            eventSourceRefiners: {},
            isDraggableTransformers: [],
            eventDragMutationMassagers: [],
            eventDefMutationAppliers: [],
            dateSelectionTransformers: [],
            datePointTransforms: [],
            dateSpanTransforms: [],
            views: {},
            viewPropsTransformers: [],
            isPropsValid: null,
            externalDefTransforms: [],
            viewContainerAppends: [],
            eventDropTransformers: [],
            componentInteractions: [],
            calendarInteractions: [],
            themeClasses: {},
            eventSourceDefs: [],
            cmdFormatter: null,
            recurringTypes: [],
            namedTimeZonedImpl: null,
            initialView: "",
            elementDraggingImpl: null,
            optionChangeHandlers: {},
            scrollGridImpl: null,
            contentTypeHandlers: {},
            listenerRefiners: {},
            optionRefiners: {},
            propSetHandlers: {}
        };
        return n && r(n), r(t), i
    }
    function nft() {
        var t = [],
            i = [],
            n;
        return function(r, u) {
            return n && at(r, t) && at(u, i) || (n = gut(r, u)), t = r, i = u, n
        }
    }
    function tft(n, t) {
        return {
            reducers: n.reducers.concat(t.reducers),
            isLoadingFuncs: n.isLoadingFuncs.concat(t.isLoadingFuncs),
            contextInit: n.contextInit.concat(t.contextInit),
            eventRefiners: i(i({}, n.eventRefiners), t.eventRefiners),
            eventDefMemberAdders: n.eventDefMemberAdders.concat(t.eventDefMemberAdders),
            eventSourceRefiners: i(i({}, n.eventSourceRefiners), t.eventSourceRefiners),
            isDraggableTransformers: n.isDraggableTransformers.concat(t.isDraggableTransformers),
            eventDragMutationMassagers: n.eventDragMutationMassagers.concat(t.eventDragMutationMassagers),
            eventDefMutationAppliers: n.eventDefMutationAppliers.concat(t.eventDefMutationAppliers),
            dateSelectionTransformers: n.dateSelectionTransformers.concat(t.dateSelectionTransformers),
            datePointTransforms: n.datePointTransforms.concat(t.datePointTransforms),
            dateSpanTransforms: n.dateSpanTransforms.concat(t.dateSpanTransforms),
            views: i(i({}, n.views), t.views),
            viewPropsTransformers: n.viewPropsTransformers.concat(t.viewPropsTransformers),
            isPropsValid: t.isPropsValid || n.isPropsValid,
            externalDefTransforms: n.externalDefTransforms.concat(t.externalDefTransforms),
            viewContainerAppends: n.viewContainerAppends.concat(t.viewContainerAppends),
            eventDropTransformers: n.eventDropTransformers.concat(t.eventDropTransformers),
            calendarInteractions: n.calendarInteractions.concat(t.calendarInteractions),
            componentInteractions: n.componentInteractions.concat(t.componentInteractions),
            themeClasses: i(i({}, n.themeClasses), t.themeClasses),
            eventSourceDefs: n.eventSourceDefs.concat(t.eventSourceDefs),
            cmdFormatter: t.cmdFormatter || n.cmdFormatter,
            recurringTypes: n.recurringTypes.concat(t.recurringTypes),
            namedTimeZonedImpl: t.namedTimeZonedImpl || n.namedTimeZonedImpl,
            initialView: n.initialView || t.initialView,
            elementDraggingImpl: n.elementDraggingImpl || t.elementDraggingImpl,
            optionChangeHandlers: i(i({}, n.optionChangeHandlers), t.optionChangeHandlers),
            scrollGridImpl: t.scrollGridImpl || n.scrollGridImpl,
            contentTypeHandlers: i(i({}, n.contentTypeHandlers), t.contentTypeHandlers),
            listenerRefiners: i(i({}, n.listenerRefiners), t.listenerRefiners),
            optionRefiners: i(i({}, n.optionRefiners), t.optionRefiners),
            propSetHandlers: i(i({}, n.propSetHandlers), t.propSetHandlers)
        }
    }
    function ift(n, t) {
        var i = {};
        for (var r in n) nc(r, i, n, t);
        for (r in t) nc(r, i, n, t);
        return i
    }
    function nc(n, t, i, r) {
        if (t[n]) return t[n];
        var u = rft(n, t, i, r);
        return u && (t[n] = u), u
    }
    function rft(n, t, r, u) {
        var e = r[n],
            o = u[n],
            c = function(n) {
                return e && e[n] !== null ? e[n] : o && o[n] !== null ? o[n] : null
            }, s = c("component"),
            h = c("superType"),
            f = null;
        if (h) {
            if (h === n) throw new Error("Can't have a custom view type that references itself");
            f = nc(h, t, r, u)
        }
        return (!s && f && (s = f.component), !s) ? null : {
            type: n,
            component: s,
            defaults: i(i({}, f ? f.defaults : {}), e ? e.rawOptions : {}),
            overrides: i(i({}, f ? f.overrides : {}), o ? o.rawOptions : {})
        }
    }
    function tc(n) {
        return t(ee.Consumer, null, function(r) {
            return t(gw, i({
                renderId: r
            }, n))
        })
    }
    function ic() {
        var t, n, i = [];
        return function(r, u) {
            return n && ft(n, u) && r === t || (t = r, n = u, i = nb(r, u)), i
        }
    }
    function nb(n, t) {
        return typeof n == "function" && (n = n(t)), af(n)
    }
    function tb(n, i) {
        return typeof n == "function" ? n(i, t) : n
    }
    function ib(n) {
        return ut(n, uft)
    }
    function uft(n) {
        var t = typeof n == "function" ? {
            component: n
        } : n,
            i = t.component;
        return t.content && (i = fft(t)), {
            superType: t.type,
            component: i,
            rawOptions: t
        }
    }
    function fft(n) {
        return function(r) {
            return t(st.Consumer, null, function(u) {
                return t(ui, {
                    viewSpec: u.viewSpec
                }, function(f, e) {
                    var o = i(i({}, r), {
                        nextDayThreshold: u.options.nextDayThreshold
                    });
                    return t(k, {
                        hookProps: o,
                        classNames: n.classNames,
                        content: n.content,
                        didMount: n.didMount,
                        willUnmount: n.willUnmount,
                        elRef: f
                    }, function(n, i, r, u) {
                        return t("div", {
                            className: e.concat(i).join(" "),
                            ref: n
                        }, u)
                    })
                })
            })
        }
    }
    function eft(n, t, i, r) {
        var f = ib(n),
            u = ib(t.views),
            e = ift(f, u);
        return ut(e, function(n) {
            return oft(n, u, t, i, r)
        })
    }
    function oft(n, t, r, u, f) {
        var l = n.overrides.duration || n.defaults.duration || u.duration || r.duration,
            s = null,
            e = "",
            h = "",
            a = {}, c, o;
        return l && (s = sft(l), s && (c = uf(s), e = c.unit, c.value === 1 && (h = e, a = t[e] ? t[e].rawOptions : {}))), o = function(t) {
            var i = t.buttonText || {}, r = n.defaults.buttonTextKey;
            return r != null && i[r] != null ? i[r] : i[n.type] != null ? i[n.type] : i[h] != null ? i[h] : null
        }, {
            type: n.type,
            component: n.component,
            duration: s,
            durationUnit: e,
            singleUnit: h,
            optionDefaults: n.defaults,
            optionOverrides: i(i({}, a), n.overrides),
            buttonTextOverride: o(u) || o(r) || n.overrides.buttonText,
            buttonTextDefault: o(f) || n.defaults.buttonText || o(vt) || n.type
        }
    }
    function sft(n) {
        var i = JSON.stringify(n),
            t = rc[i];
        return t === undefined && (t = o(n), rc[i] = t), t
    }
    function hft(n, t) {
        switch (t.type) {
            case "CHANGE_VIEW_TYPE":
                n = t.viewType
        }
        return n
    }
    function cft(n, t) {
        var r;
        switch (t.type) {
            case "SET_OPTION":
                return i(i({}, n), (r = {}, r[t.optionName] = t.rawOptionValue, r));
            default:
                return n
        }
    }
    function lft(n, t, i, r) {
        var u;
        switch (t.type) {
            case "CHANGE_VIEW_TYPE":
                return r.build(t.dateMarker || i);
            case "CHANGE_DATE":
                if (!n.activeRange || !et(n.currentRange, t.dateMarker)) return r.build(t.dateMarker);
                break;
            case "PREV":
                if (u = r.buildPrev(n, i), u.isValid) return u;
                break;
            case "NEXT":
                if (u = r.buildNext(n, i), u.isValid) return u
        }
        return n
    }
    function aft(n, t, i) {
        var r = t ? t.activeRange : null;
        return ub({}, dft(n, i), r, i)
    }
    function vft(n, t, i, r) {
        var u = i ? i.activeRange : null;
        switch (t.type) {
            case "ADD_EVENT_SOURCES":
                return ub(n, t.sources, u, r);
            case "REMOVE_EVENT_SOURCE":
                return pft(n, t.sourceId);
            case "PREV":
            case "NEXT":
            case "CHANGE_DATE":
            case "CHANGE_VIEW_TYPE":
                return i ? fb(n, u, r):
                    n;
                case "FETCH_EVENT_SOURCES":
                    return uc(n, t.sourceIds ? ty(t.sourceIds) : eb(n, r), u, t.isRefetch || !1, r);
                case "RECEIVE_EVENTS":
                case "RECEIVE_EVENT_ERROR":
                    return kft(n, t.sourceId, t.fetchId, t.fetchRange);
                case "REMOVE_ALL_EVENT_SOURCES":
                    return {};
                default:
                    return n
        }
    }
    function yft(n, t, i) {
        var r = t ? t.activeRange : null;
        return uc(n, eb(n, i), r, !0, i)
    }
    function rb(n) {
        for (var t in n) if (n[t].isFetching) return !0;
        return !1
    }
    function ub(n, t, r, u) {
        for (var o, f = {}, e = 0, s = t; e < s.length; e++) o = s[e], f[o.sourceId] = o;
        return r && (f = fb(f, r, u)), i(i({}, n), f)
    }
    function pft(n, t) {
        return ti(n, function(n) {
            return n.sourceId !== t
        })
    }
    function fb(n, t, i) {
        return uc(n, ti(n, function(n) {
            return wft(n, t, i)
        }), t, !1, i)
    }
    function wft(n, t, i) {
        return ob(n, i) ? !i.options.lazyFetching || !n.fetchRange || n.isFetching || t.start < n.fetchRange.start || t.end > n.fetchRange.end : !n.latestFetchId
    }
    function uc(n, t, i, r, u) {
        var o = {}, f, e;
        for (f in n) e = n[f], o[f] = t[f] ? bft(e, i, r, u) : e;
        return o
    }
    function bft(n, t, r, u) {
        var f = u.options,
            e = u.calendarApi,
            s = u.pluginHooks.eventSourceDefs[n.sourceDefId],
            o = hi();
        return s.fetch({
            eventSource: n,
            range: t,
            isRefetch: r,
            context: u
        }, function(i) {
            var r = i.rawEvents;
            f.eventSourceSuccess && (r = f.eventSourceSuccess.call(e, r, i.xhr) || r);
            n.success && (r = n.success.call(e, r, i.xhr) || r);
            u.dispatch({
                type: "RECEIVE_EVENTS",
                sourceId: n.sourceId,
                fetchId: o,
                fetchRange: t,
                rawEvents: r
            })
        }, function(i) {
            console.warn(i.message, i);
            f.eventSourceFailure && f.eventSourceFailure.call(e, i);
            n.failure && n.failure(i);
            u.dispatch({
                type: "RECEIVE_EVENT_ERROR",
                sourceId: n.sourceId,
                fetchId: o,
                fetchRange: t,
                error: i
            })
        }), i(i({}, n), {
            isFetching: !0,
            latestFetchId: o
        })
    }
    function kft(n, t, r, u) {
        var f, e = n[t];
        return e && r === e.latestFetchId ? i(i({}, n), (f = {}, f[t] = i(i({}, e), {
            isFetching: !1,
            fetchRange: u
        }), f)) : n
    }
    function eb(n, t) {
        return ti(n, function(n) {
            return ob(n, t)
        })
    }
    function dft(n, t) {
        var s = yp(t),
            r = [].concat(n.eventSources || []),
            e = [],
            i, u, o, f;
        for (n.initialEvents && r.unshift(n.initialEvents), n.events && r.unshift(n.events), i = 0, u = r; i < u.length; i++) o = u[i], f = vp(o, t, s), f && e.push(f);
        return e
    }
    function ob(n, t) {
        var i = t.pluginHooks.eventSourceDefs;
        return !i[n.sourceDefId].ignoreRange
    }
    function gft(n, t, i, r, u) {
        switch (t.type) {
            case "RECEIVE_EVENTS":
                return net(n, i[t.sourceId], t.fetchId, t.fetchRange, t.rawEvents, u);
            case "ADD_EVENTS":
                return iet(n, t.eventStore, r ? r.activeRange : null, u);
            case "RESET_EVENTS":
                return t.eventStore;
            case "MERGE_EVENTS":
                return lf(n, t.eventStore);
            case "PREV":
            case "NEXT":
            case "CHANGE_DATE":
            case "CHANGE_VIEW_TYPE":
                return r ? bi(n, r.activeRange, u):
                    n;
                case "REMOVE_EVENTS":
                    return nrt(n, t.eventStore);
                case "REMOVE_EVENT_SOURCE":
                    return hb(n, t.sourceId);
                case "REMOVE_ALL_EVENT_SOURCES":
                    return kr(n, function(n) {
                        return !n.sourceId
                    });
                case "REMOVE_ALL_EVENTS":
                    return b();
                default:
                    return n
        }
    }
    function net(n, t, i, r, u, f) {
        if (t && i === t.latestFetchId) {
            var e = hf(tet(u, t, f), t, f);
            return r && (e = bi(e, r, f)), lf(hb(n, t.sourceId), e)
        }
        return n
    }
    function tet(n, t, i) {
        var r = i.options.eventDataTransform,
            u = t ? t.eventDataTransform : null;
        return u && (n = sb(n, u)), r && (n = sb(n, r)), n
    }
    function sb(n, t) {
        var i, r, f, e, u;
        if (t) for (i = [], r = 0, f = n; r < f.length; r++) e = f[r], u = t(e), u ? i.push(u) : u == null && i.push(e);
        else i = n;
        return i
    }
    function iet(n, t, i, r) {
        return i && (t = bi(t, i, r)), lf(n, t)
    }
    function ret(n, t, r) {
        var u = n.defs,
            f = ut(n.instances, function(n) {
                var f = u[n.defId];
                return f.allDay || f.recurringDef ? n : i(i({}, n), {
                    range: {
                        start: r.createMarker(t.toDate(n.range.start, n.forcedStartTzo)),
                        end: r.createMarker(t.toDate(n.range.end, n.forcedEndTzo))
                    },
                    forcedStartTzo: r.canComputeOffset ? null : n.forcedStartTzo,
                    forcedEndTzo: r.canComputeOffset ? null : n.forcedEndTzo
                })
            });
        return {
            defs: u,
            instances: f
        }
    }
    function hb(n, t) {
        return kr(n, function(n) {
            return n.sourceId !== t
        })
    }
    function uet(n, t) {
        return {
            defs: n.defs,
            instances: ti(n.instances, function(n) {
                return !t[n.instanceId]
            })
        }
    }
    function fet(n, t) {
        switch (t.type) {
            case "UNSELECT_DATES":
                return null;
            case "SELECT_DATES":
                return t.selection;
            default:
                return n
        }
    }
    function eet(n, t) {
        switch (t.type) {
            case "UNSELECT_EVENT":
                return "";
            case "SELECT_EVENT":
                return t.eventInstanceId;
            default:
                return n
        }
    }
    function oet(n, t) {
        var i;
        switch (t.type) {
            case "UNSET_EVENT_DRAG":
                return null;
            case "SET_EVENT_DRAG":
                return i = t.state, {
                    affectedEvents: i.affectedEvents,
                    mutatedEvents: i.mutatedEvents,
                    isEvent: i.isEvent
                };
            default:
                return n
        }
    }
    function set(n, t) {
        var i;
        switch (t.type) {
            case "UNSET_EVENT_RESIZE":
                return null;
            case "SET_EVENT_RESIZE":
                return i = t.state, {
                    affectedEvents: i.affectedEvents,
                    mutatedEvents: i.mutatedEvents,
                    isEvent: i.isEvent
                };
            default:
                return n
        }
    }
    function het(n, t, i, r, u) {
        var f = [],
            e = n.headerToolbar ? cb(n.headerToolbar, n, t, i, r, u, f) : null,
            o = n.footerToolbar ? cb(n.footerToolbar, n, t, i, r, u, f) : null;
        return {
            headerToolbar: e,
            footerToolbar: o,
            viewsWithButtons: f
        }
    }
    function cb(n, t, i, r, u, f, e) {
        return ut(n, function(n) {
            return cet(n, t, i, r, u, f, e)
        })
    }
    function cet(n, t, i, r, u, f, e) {
        var o = t.direction === "rtl",
            s = t.customButtons || {}, h = i.buttonText || {}, c = t.buttonText || {}, l = n ? n.split(" ") : [];
        return l.map(function(n) {
            return n.split(",").map(function(n) {
                if (n === "title") return {
                    buttonName: n
                };
                var i, v, a, l, t;
                return (i = s[n]) ? (a = function(n) {
                    i.click && i.click.call(n.target, n, n.target)
                }, (l = r.getCustomButtonIconClass(i)) || (l = r.getIconClass(n, o)) || (t = i.text)) : (v = u[n]) ? (e.push(n), a = function() {
                    f.changeView(n)
                }, (t = v.buttonTextOverride) || (l = r.getIconClass(n, o)) || (t = v.buttonTextDefault)) : f[n] && (a = function() {
                    f[n]()
                }, (t = h[n]) || (l = r.getIconClass(n, o)) || (t = c[n])), {
                    buttonName: n,
                    buttonClick: a,
                    buttonIcon: l,
                    buttonText: t
                }
            })
        })
    }
    function fc(n, t, i, r, u) {
        var e, f;
        n = n.toUpperCase();
        e = null;
        n === "GET" ? t = wet(t, i) : e = lb(i);
        f = new XMLHttpRequest;
        f.open(n, t, !0);
        n !== "GET" && f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        f.onload = function() {
            if (f.status >= 200 && f.status < 400) {
                var n = !1,
                    t = void 0;
                try {
                    t = JSON.parse(f.responseText);
                    n = !0
                } catch (i) {}
                n ? r(t, f) : u("Failure parsing JSON", f)
            } else u("Request failed", f)
        };
        f.onerror = function() {
            u("Request failed", f)
        };
        f.send(e)
    }
    function wet(n, t) {
        return n + (n.indexOf("?") === -1 ? "?" : "&") + lb(t)
    }
    function lb(n) {
        var t = [];
        for (var i in n) t.push(encodeURIComponent(i) + "=" + encodeURIComponent(n[i]));
        return t.join("&")
    }
    function get(n, t, r) {
        var f = r.dateEnv,
            h = r.options,
            e, o, s, c, u = {};
        return e = n.startParam, e == null && (e = h.startParam), o = n.endParam, o == null && (o = h.endParam), s = n.timeZoneParam, s == null && (s = h.timeZoneParam), c = typeof n.extraParams == "function" ? n.extraParams() : n.extraParams || {}, i(u, c), u[e] = f.formatIso(t.start), u[o] = f.formatIso(t.end), f.timeZone !== "local" && (u[s] = f.timeZone), u
    }
    function rot(n, t, i, r) {
        for (var e = n ? ty(n) : null, u = h(i.start), s = i.end, o = [], f; u < s;) f = void 0, (!e || e[u.getUTCDay()]) && (f = t ? r.add(u, t) : u, o.push(f)), u = y(u, 1);
        return o
    }
    function vb(n, t) {
        for (var o, s, i, u, h, v, f, c, y, r = vs(t.getCurrentData().eventSources), l = [], e = 0, a = n; e < a.length; e++) {
            for (o = a[e], s = !1, i = 0; i < r.length; i += 1) if (r[i]._raw === o) {
                r.splice(i, 1);
                s = !0;
                break
            }
            s || l.push(o)
        }
        for (u = 0, h = r; u < h.length; u++) v = h[u], t.dispatch({
            type: "REMOVE_EVENT_SOURCE",
            sourceId: v.sourceId
        });
        for (f = 0, c = l; f < c.length; f++) y = c[f], t.calendarApi.addEventSource(y)
    }
    function uot(n, t) {
        t.emitter.trigger("datesSet", i(i({}, cp(n.activeRange, t.dateEnv)), {
            view: t.viewApi
        }))
    }
    function fot(n, t) {
        var i = t.emitter;
        i.hasHandlers("eventsSet") && i.trigger("eventsSet", ri(n, t))
    }
    function eot(n, t) {
        n.innerHTML = t
    }
    function oot(n, t) {
        var u = Array.prototype.slice.call(n.childNodes),
            f = Array.prototype.slice.call(t),
            i, r, e;
        if (!at(u, f)) {
            for (i = 0, r = f; i < r.length; i++) e = r[i], n.appendChild(e);
            u.forEach(gu)
        }
    }
    function sot(n, t, i) {
        var r;
        return r = /^(year|month)$/.test(n.currentRangeUnit) ? n.currentRange : n.activeRange, i.formatRange(r.start, r.end, c(t.titleFormat || hot(n)), {
            isEndExclusive: n.isRangeAllDay,
            defaultSeparator: t.titleRangeSeparator
        })
    }
    function hot(n) {
        var i = n.currentRangeUnit,
            t;
        return i === "year" ? {
            year: "numeric"
        } : i === "month" ? {
            year: "numeric",
            month: "long"
        } : (t = ar(n.currentRange.start, n.currentRange.end), t !== null && t > 1) ? {
            year: "numeric",
            month: "short",
            day: "numeric"
        } : {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    }
    function cot(n, t, i, r, u, f, e, o) {
        var s = ah(t || e.defaultCode, e.map);
        return new ch({
            calendarSystem: "gregory",
            timeZone: n,
            namedTimeZoneImpl: f.namedTimeZonedImpl,
            locale: s,
            weekNumberCalculation: i,
            firstDay: r,
            weekText: u,
            cmdFormatter: f.cmdFormatter,
            defaultSeparator: o
        })
    }
    function lot(n, t) {
        var i = t.themeClasses[n.themeSystem] || yt;
        return new i(n)
    }
    function aot(n) {
        var t = n.dateProfileGeneratorClass || oe;
        return new t(n)
    }
    function vot(n, t, i) {
        return new oh(n, t, i)
    }
    function yot(n) {
        return ut(n, function(n) {
            return n.ui
        })
    }
    function pot(n, t, i) {
        var f = {
            "": t
        }, u, r;
        for (u in n) r = n[u], r.sourceId && i[r.sourceId] && (f[u] = i[r.sourceId]);
        return f
    }
    function wot(n) {
        var t = n.options;
        return {
            eventUiSingleBase: gr({
                display: t.eventDisplay,
                editable: t.editable,
                startEditable: t.eventStartEditable,
                durationEditable: t.eventDurationEditable,
                constraint: t.eventConstraint,
                overlap: typeof t.eventOverlap == "boolean" ? t.eventOverlap : undefined,
                allow: t.eventAllow,
                backgroundColor: t.eventBackgroundColor,
                borderColor: t.eventBorderColor,
                textColor: t.eventTextColor,
                color: t.eventColor
            }, n),
            selectionConfig: gr({
                constraint: t.selectConstraint,
                overlap: typeof t.selectOverlap == "boolean" ? t.selectOverlap : undefined,
                allow: t.selectAllow
            }, n)
        }
    }
    function ec(n, t) {
        for (var u, i = 0, r = t.pluginHooks.isLoadingFuncs; i < r.length; i++) if (u = r[i], u(n)) return !0;
        return !1
    }
    function bot(n) {
        return rw(n.options.businessHours, n)
    }
    function pb(n, t) {
        for (var i in n) console.warn("Unknown option '" + i + "'" + (t ? " for view '" + t + "'" : ""))
    }
    function kot(n, t) {
        return iu(n.eventStore, n.eventUiBases, n.dateProfile.activeRange, t ? n.nextDayThreshold : null).fg
    }
    function oc(n) {
        return n.spanEnd
    }
    function fi(n) {
        return n.segInput.index + ":" + n.spanStart
    }
    function kb(n) {
        for (var r, s, i, u = [], f = 0, h = n; f < h.length; f++) {
            var e = h[f],
                o = [],
                t = {
                    spanStart: e.spanStart,
                    spanEnd: e.spanEnd,
                    entries: [e]
                };
            for (r = 0, s = u; r < s.length; r++) i = s[r], i.spanStart < t.spanEnd && i.spanEnd > t.spanStart ? t = {
                spanStart: Math.min(i.spanStart, t.spanStart),
                spanEnd: Math.max(i.spanEnd, t.spanEnd),
                entries: i.entries.concat(t.entries)
            } : o.push(i);
            o.push(t);
            u = o
        }
        return u
    }
    function sc(n, t, i) {
        n.splice(t, 0, i)
    }
    function hc(n, t, i) {
        var r = 0,
            u = n.length,
            f, e;
        if (!u || t < i(n[r])) return [0, 0];
        if (t > i(n[u - 1])) return [u, 0];
        while (r < u) if (f = Math.floor(r + (u - r) / 2), e = i(n[f]), t < e) u = f;
        else if (t > e) r = f + 1;
        else return [f, 1];
        return [r, 0]
    }
    function dot(n, t) {
        return {
            component: n,
            el: t.el,
            useEventCenter: t.useEventCenter != null ? t.useEventCenter : !0,
            isHitComboAllowed: t.isHitComboAllowed || null
        }
    }
    function le(n) {
        var t;
        return t = {}, t[n.component.uid] = n, t
    }
    function ae(n) {
        var i = br(n, got),
            t = i.refined,
            r = i.extra;
        return {
            startTime: t.startTime || null,
            duration: t.duration || null,
            create: t.create != null ? t.create : !0,
            sourceId: t.sourceId,
            leftoverProps: r
        }
    }
    function ust(n, t, i, r, u, f) {
        var e = i.build(u, undefined, !1),
            o = i.buildPrev(t, r, !1),
            s = i.buildNext(t, r, !1);
        return {
            title: f,
            activeButton: n.type,
            isTodayEnabled: e.isValid && !et(t.currentRange, u),
            isPrevEnabled: o.isValid,
            isNextEnabled: s.isValid
        }
    }
    function fst(n) {
        return n.map(function(n) {
            return new n
        })
    }
    function nk(n, t) {
        return !n || t > 10 ? c({
            weekday: "short"
        }) : t > 1 ? c({
            weekday: "short",
            month: "numeric",
            day: "numeric",
            omitCommas: !0
        }) : c({
            weekday: "long"
        })
    }
    function tk(n) {
        return n.text
    }
    function uk(n) {
        var t = h(n),
            i = y(t, 1);
        return {
            start: t,
            end: i
        }
    }
    function est(n, t, i) {
        return n || nk(t, i)
    }
    function wc(n, t) {
        var i = n.activeRange;
        return t ? i : {
            start: dt(i.start, n.slotMinTime.milliseconds),
            end: dt(i.end, n.slotMaxTime.milliseconds - 864e5)
        }
    }
    function ye(n, t, i) {
        var r = n.mutatedEvents.instances;
        for (var u in r) if (!tu(t.validRange, r[u].range)) return !1;
        return ek({
            eventDrag: n
        }, i)
    }
    function fk(n, t, i) {
        return tu(t.validRange, n.range) ? ek({
            dateSelection: n
        }, i) : !1
    }
    function ek(n, t) {
        var r = t.getCurrentData(),
            u = i({
                businessHours: r.businessHours,
                dateSelection: "",
                eventStore: r.eventStore,
                eventUiBases: r.eventUiBases,
                eventSelection: "",
                eventDrag: null,
                eventResize: null
            }, n);
        return (t.pluginHooks.isPropsValid || ok)(u, t)
    }
    function ok(n, t, i, r) {
        return (i === void 0 && (i = {}), n.eventDrag && !ost(n, t, i, r)) ? !1 : n.dateSelection && !sst(n, t, i, r) ? !1 : !0
    }
    function ost(n, t, r, u) {
        var d = t.getCurrentData(),
            o = n.eventDrag,
            g = o.mutatedEvents,
            nt = g.defs,
            tt = g.instances,
            c = bf(nt, o.isEvent ? n.eventUiBases : {
                "": d.selectionConfig
            }),
            v, p, w, et, e, ot, b, h, k;
        u && (c = ut(c, u));
        var a = uet(n.eventStore, o.affectedEvents.instances),
            it = a.defs,
            rt = a.instances,
            ct = bf(it, n.eventUiBases);
        for (v in tt) {
            var f = tt[v],
                ft = f.range,
                y = c[f.defId],
                s = nt[f.defId];
            if (!sk(y.constraints, ft, a, n.businessHours, t)) return !1;
            p = t.options.eventOverlap;
            w = typeof p == "function" ? p : null;
            for (et in rt) if (e = rt[et], wf(ft, e.range) && ((ot = ct[e.defId].overlap, ot === !1 && o.isEvent) || y.overlap === !1 || w && !w(new l(t, it[e.defId], e), new l(t, s, f)))) return !1;
            for (b = d.eventStore, h = 0, k = y.allows; h < k.length; h++) {
                var lt = k[h],
                    at = i(i({}, r), {
                        range: f.range,
                        allDay: s.allDay
                    }),
                    st = b.defs[s.defId],
                    vt = b.instances[v],
                    ht = void 0;
                if (ht = st ? new l(t, st, vt) : new l(t, s), !lt(eh(at, t), ht)) return !1
            }
        }
        return !0
    }
    function sst(n, t, r, u) {
        var s = n.eventStore,
            d = s.defs,
            v = s.instances,
            y = n.dateSelection,
            p = y.range,
            f = t.getCurrentData().selectionConfig,
            h, c, w, e, o, a, b, k;
        if (u && (f = u(f)), !sk(f.constraints, p, s, n.businessHours, t)) return !1;
        h = t.options.selectOverlap;
        c = typeof h == "function" ? h : null;
        for (w in v) if (e = v[w], wf(p, e.range) && (f.overlap === !1 || c && !c(new l(t, d[e.defId], e), null))) return !1;
        for (o = 0, a = f.allows; o < a.length; o++) if (b = a[o], k = i(i({}, r), y), !b(eh(k, t), null)) return !1;
        return !0
    }
    function sk(n, t, i, r, u) {
        for (var o, f = 0, e = n; f < e.length; f++) if (o = e[f], !cst(hst(o, t, i, r, u), t)) return !1;
        return !0
    }
    function hst(n, t, i, r, u) {
        return n === "businessHours" ? bc(bi(r, t, u)) : typeof n == "string" ? bc(kr(i, function(t) {
            return t.groupId === n
        })) : typeof n == "object" && n ? bc(bi(n, t, u)) : []
    }
    function bc(n) {
        var t = n.instances,
            i = [];
        for (var r in t) i.push(t[r].range);
        return i
    }
    function cst(n, t) {
        for (var u, i = 0, r = n; i < r.length; i++) if (u = r[i], tu(u, t)) return !0;
        return !1
    }
    function hk(n) {
        for (var u, f = rv(n, ".fc-scrollgrid-shrink"), t = 0, i = 0, r = f; i < r.length; i++) u = r[i], t = Math.max(t, wv(u));
        return Math.ceil(t)
    }
    function dc(n, t) {
        return n.liquid && t.liquid
    }
    function ck(n, t) {
        return t.maxHeight != null || dc(n, t)
    }
    function lk(n, i, r) {
        var u = r.expandRows;
        return typeof i.content == "function" ? i.content(r) : t("table", {
            className: [i.tableClassName, n.syncRowHeights ? "fc-scrollgrid-sync-table" : "", ].join(" "),
            style: {
                minWidth: r.tableMinWidth,
                width: r.clientWidth,
                height: u ? r.clientHeight : ""
            }
        }, r.tableColGroupNode, t("tbody", {}, typeof i.rowContent == "function" ? i.rowContent(r) : i.rowContent))
    }
    function ak(n, t) {
        return at(n, t, ft)
    }
    function vk(n, i) {
        for (var r, s, f, e = [], u = 0, o = n; u < o.length; u++) for (r = o[u], s = r.span || 1, f = 0; f < s; f += 1) e.push(t("col", {
            style: {
                width: r.width === "shrink" ? yk(i) : r.width || "",
                minWidth: r.minWidth || ""
            }
        }));
        return t.apply(void 0, v(["colgroup", {}], e))
    }
    function yk(n) {
        return n == null ? 4 : n
    }
    function pk(n) {
        for (var r, t = 0, i = n; t < i.length; t++) if (r = i[t], r.width === "shrink") return !0;
        return !1
    }
    function wk(n, t) {
        var i = ["fc-scrollgrid", t.theme.getClass("table"), ];
        return n && i.push("fc-scrollgrid-liquid"), i
    }
    function bk(n, t) {
        var i = ["fc-scrollgrid-section", "fc-scrollgrid-section-" + n.type, n.className, ];
        return t && n.liquid && n.maxHeight == null && i.push("fc-scrollgrid-section-liquid"), n.isSticky && i.push("fc-scrollgrid-section-sticky"), i
    }
    function we(n) {
        return t("div", {
            className: "fc-scrollgrid-sticky-shim",
            style: {
                width: n.clientWidth,
                minWidth: n.tableMinWidth
            }
        })
    }
    function cu(n) {
        var t = n.stickyHeaderDates;
        return (t == null || t === "auto") && (t = n.height === "auto" || n.viewHeight === "auto"), t
    }
    function gc(n) {
        var t = n.stickyFooterScrollbar;
        return (t == null || t === "auto") && (t = n.height === "auto" || n.viewHeight === "auto"), t
    }
    function lst(n, t) {
        for (var u, i = 0, r = n; i < r.length; i++) if (u = r[i], u.key === t) return u;
        return null
    }
    function ast(n) {
        return t("div", {
            className: "fc-event-main-frame"
        }, n.event._def && n.event._def.extendedProps && t("div", {
            className: "fc-event-type"
        }, n.event._def.extendedProps.eventType), t("div", {
            className: "fc-event-title-container"
        }, t("div", {
            className: "fc-event-title fc-sticky"
        }, n.event.title || t(a, null, " "))))
    }
    function vst(n) {
        var t = n.eventRange.def.url;
        return t ? {
            href: t
        } : {}
    }
    function kk(n) {
        var t = n.date,
            r = n.dateEnv,
            u = te(t, n.todayRange, null, n.dateProfile);
        return i(i(i({
            date: r.toDate(t),
            view: n.viewApi
        }, u), {
            dayNumberText: n.showDayNumber ? r.format(t, yst) : ""
        }), n.extraProps)
    }
    function nl(n) {
        return t("div", {
            className: "fc-" + n
        })
    }
    function pst(n) {
        var i = n.event.title;
        return i && t("div", {
            className: "fc-event-title"
        }, n.event.title)
    }
    function wst(n) {
        return n.text
    }
    function dst(n) {
        return n.text
    }
    function dk(n) {
        if (n.allDayDate) return {
            start: n.allDayDate,
            end: y(n.allDayDate, 1)
        };
        var t = n.hiddenSegs;
        return {
            start: rl(t),
            end: nht(t)
        }
    }
    function rl(n) {
        return n.reduce(gst).eventRange.range.start
    }
    function gst(n, t) {
        return n.eventRange.range.start < t.eventRange.range.start ? n : t
    }
    function nht(n) {
        return n.reduce(tht).eventRange.range.end
    }
    function tht(n, t) {
        return n.eventRange.range.end > t.eventRange.range.end ? n : t
    }
    function iht(n) {
        return n.button === 0 && !n.ctrlKey
    }
    function rht() {
        ul += 1;
        setTimeout(function() {
            ul -= 1
        }, hu.touchMouseIgnoreWait)
    }
    function uht() {
        to += 1;
        to === 1 && window.addEventListener("touchmove", td, {
            passive: !1
        })
    }
    function fht() {
        to -= 1;
        to || window.removeEventListener("touchmove", td, {
            passive: !1
        })
    }
    function td(n) {
        fl && n.preventDefault()
    }
    function cht(n) {
        var t = n.tagName;
        return t === "HTML" || t === "BODY"
    }
    function ro(n, t) {
        return !n && !t ? !0 : Boolean(n) !== Boolean(t) ? !1 : hp(n.dateSpan, t.dateSpan)
    }
    function el(n, t) {
        for (var e, r = {}, u = 0, f = t.pluginHooks.datePointTransforms; u < f.length; u++) e = f[u], i(r, e(n, t));
        return i(r, lht(n, t.dateEnv)), r
    }
    function lht(n, t) {
        return {
            date: t.toDate(n.range.start),
            dateStr: t.formatIso(n.range.start, {
                omitTime: n.allDay
            }),
            allDay: n.allDay
        }
    }
    function aht(n) {
        var i = n.context.options,
            t = i.selectLongPressDelay;
        return t == null && (t = i.longPressDelay), t
    }
    function vht(n, t, r) {
        var o = n.dateSpan,
            c = t.dateSpan,
            s = [o.range.start, o.range.end, c.range.start, c.range.end, ],
            u, f, h, l, e;
        for (s.sort(pv), u = {}, f = 0, h = r; f < h.length; f++) {
            if (l = h[f], e = l(n, t), e === !1) return null;
            e && i(u, e)
        }
        return u.range = {
            start: s[0],
            end: s[3]
        }, u.allDay = o.allDay, u
    }
    function yht(n, t, i) {
        var l = n.dateSpan,
            r = t.dateSpan,
            e = l.range.start,
            v = r.range.start,
            u = {}, o, s, f, c, a;
        for (l.allDay !== r.allDay && (u.allDay = r.allDay, u.hasEnd = t.context.options.allDayMaintainDuration, r.allDay && (e = h(e))), o = li(e, v, n.context.dateEnv, n.componentId === t.componentId ? n.largeUnit : null), o.milliseconds && (u.allDay = !1), s = {
            datesDelta: o,
            standardProps: u
        }, f = 0, c = i; f < c.length; f++) a = c[f], a(s, n, t);
        return s
    }
    function pht(n) {
        var i = n.context.options,
            t = i.eventLongPressDelay;
        return t == null && (t = i.longPressDelay), t
    }
    function wht(n, t, i, r) {
        var f = n.context.dateEnv,
            e = n.dateSpan.range.start,
            o = t.dateSpan.range.start,
            u = li(e, o, f, n.largeUnit);
        if (i) {
            if (f.add(r.start, u) < r.end) return {
                startDelta: u
            }
        } else if (f.add(r.end, u) > r.start) return {
            endDelta: u
        };
        return null
    }
    function ght(n, t, r) {
        for (var s, l, a, e = i({}, t.leftoverProps), f = 0, o = r.pluginHooks.externalDefTransforms; f < o.length; f++) s = o[f], i(e, s(n, t));
        var h = yf(e, r),
            v = h.refined,
            y = h.extra,
            c = nu(v, y, t.sourceId, n.allDay, r.options.forceEventDuration || Boolean(t.duration), r),
            u = n.range.start;
        return n.allDay && t.startTime && (u = r.dateEnv.add(u, t.startTime)), l = t.duration ? r.dateEnv.add(u, t.duration) : df(n.allDay, u, r), a = vr(c.defId, {
            start: u,
            end: l
        }), {
            def: c,
            instance: a
        }
    }
    function nct(n) {
        var t = tct(n, "event"),
            i = t ? JSON.parse(t) : {
                create: !1
            };
        return ae(i)
    }
    function tct(n, t) {
        var i = hu.dataAttrPrefix,
            r = (i ? i + "-" : "") + t;
        return n.getAttribute("data-" + r) || ""
    }
    function uo(n, t) {
        for (var i, f, e, r = [], u = 0; u < t; u += 1) r[u] = [];
        for (i = 0, f = n; i < f.length; i++) e = f[i], r[e.row].push(e);
        return r
    }
    function fo(n, t) {
        for (var i, f, e, r = [], u = 0; u < t; u += 1) r[u] = [];
        for (i = 0, f = n; i < f.length; i++) e = f[i], r[e.firstCol].push(e);
        return r
    }
    function cd(n, t) {
        var r = [],
            i, u, f, e;
        if (n) {
            for (i = 0; i < t; i += 1) r[i] = {
                affectedInstances: n.affectedInstances,
                isEvent: n.isEvent,
                segs: []
            };
            for (u = 0, f = n.segs; u < f.length; u++) e = f[u], r[e.row].segs.push(e)
        } else for (i = 0; i < t; i += 1) r[i] = null;
        return r
    }
    function ect(n) {
        return n.dayNumberText
    }
    function ad(n) {
        var t = n.eventRange.ui.display;
        return t === "list-item" || t === "auto" && !n.eventRange.def.allDay && n.firstCol === n.lastCol && n.isStart && n.isEnd
    }
    function oct(n) {
        return jQuery(window).width() < 768 ? t(a, null, t("div", {
            className: "fc-daygrid-event-dot",
            style: {
                borderColor: n.borderColor || n.backgroundColor
            }
        }), null && t("div", {
            className: "fc-event-time"
        }, n.timeText)) : t(a, null, n.event._def && n.event._def.extendedProps && t("div", {
            className: "fc-event-type"
        }, n.event._def.extendedProps.eventType), t("div", {
            className: "fc-event-title"
        }, n.event.title || t(a, null, " ")))
    }
    function sct(n) {
        var t = n.eventRange.def.url;
        return t ? {
            href: t
        } : {}
    }
    function hct(n) {
        for (var t, r = [], u = [], i = 0, f = n; i < f.length; i++) t = f[i], r.push(t.seg), t.isVisible || u.push(t.seg);
        return {
            allSegs: r,
            invisibleSegs: u
        }
    }
    function cct(n, t, i, r, u, f, e) {
        var h = new wd,
            y, p, c, a, g, v, nt, l, s, o;
        for (h.allowReslicing = !0, h.strictOrder = r, t === !0 || i === !0 ? (h.maxCoord = f, h.hiddenConsumes = !0) : typeof t == "number" ? h.maxStackCnt = t : typeof i == "number" && (h.maxStackCnt = i, h.hiddenConsumes = !0), y = [], p = [], c = 0; c < n.length; c += 1) {
            var s = n[c],
                rt = s.eventRange.instance.instanceId,
                tt = u[rt];
            tt != null ? y.push({
                index: c,
                spanStart: s.firstCol,
                spanEnd: s.lastCol + 1,
                thickness: tt
            }) : p.push(s)
        }
        var ut = h.addSegs(y),
            ft = h.toRects(),
            w = lct(ft, n, e),
            b = w.singleColPlacements,
            k = w.multiColPlacements,
            et = w.leftoverMargins,
            d = [],
            it = [];
        for (a = 0, g = p; a < g.length; a++) for (s = g[a], k[s.firstCol].push({
            seg: s,
            isVisible: !1,
            isAbsolute: !0,
            absoluteTop: 0,
            marginTop: 0
        }), o = s.firstCol; o <= s.lastCol; o += 1) b[o].push({
            seg: vu(s, o, o + 1, e),
            isVisible: !1,
            isAbsolute: !1,
            absoluteTop: 0,
            marginTop: 0
        });
        for (o = 0; o < e.length; o += 1) d.push(0);
        for (v = 0, nt = ut; v < nt.length; v++) for (l = nt[v], s = n[l.segInput.index], k[l.spanStart].push({
            seg: s,
            isVisible: !1,
            isAbsolute: !0,
            absoluteTop: 0,
            marginTop: 0
        }), o = l.spanStart; o < l.spanEnd; o += 1) d[o] += 1, b[o].push({
            seg: vu(s, o, o + 1, e),
            isVisible: !1,
            isAbsolute: !1,
            absoluteTop: 0,
            marginTop: 0
        });
        for (o = 0; o < e.length; o += 1) it.push(et[o]);
        return {
            singleColPlacements: b,
            multiColPlacements: k,
            moreCnts: d,
            moreMarginTops: it
        }
    }
    function lct(n, t, i) {
        for (var o, l, r, s, h, c, a, d = act(n, i.length), v = [], y = [], p = [], u = 0; u < i.length; u += 1) {
            var w = d[u],
                b = [],
                e = 0,
                f = 0;
            for (o = 0, l = w; o < l.length; o++) r = l[o], s = t[r.segInput.index], b.push({
                seg: vu(s, u, u + 1, i),
                isVisible: !0,
                isAbsolute: !1,
                absoluteTop: 0,
                marginTop: r.levelCoord - e
            }), e = r.levelCoord + r.thickness;
            for (h = [], e = 0, f = 0, c = 0, a = w; c < a.length; c++) {
                var r = a[c],
                    s = t[r.segInput.index],
                    g = r.spanEnd - r.spanStart > 1,
                    k = r.spanStart === u;
                f += r.levelCoord - e;
                e = r.levelCoord + r.thickness;
                g ? (f += r.thickness, k && h.push({
                    seg: vu(s, r.spanStart, r.spanEnd, i),
                    isVisible: !0,
                    isAbsolute: !0,
                    absoluteTop: r.levelCoord,
                    marginTop: 0
                })) : k && (h.push({
                    seg: vu(s, r.spanStart, r.spanEnd, i),
                    isVisible: !0,
                    isAbsolute: !1,
                    absoluteTop: 0,
                    marginTop: f
                }), f = 0)
            }
            v.push(b);
            y.push(h);
            p.push(f)
        }
        return {
            singleColPlacements: v,
            multiColPlacements: y,
            leftoverMargins: p
        }
    }
    function act(n, t) {
        for (var r, e, u, f = [], i = 0; i < t; i += 1) f.push([]);
        for (r = 0, e = n; r < e.length; r++) for (u = e[r], i = u.spanStart; i < u.spanEnd; i += 1) f[i].push(u);
        return f
    }
    function vu(n, t, r, u) {
        if (n.firstCol === t && n.lastCol === r - 1) return n;
        var f = n.eventRange,
            e = f.range,
            o = ii(e, {
                start: u[t].date,
                end: y(u[r - 1].date, 1)
            });
        return i(i({}, n), {
            firstCol: t,
            lastCol: r - 1,
            eventRange: {
                def: f.def,
                ui: i(i({}, f.ui), {
                    durationEditable: !1
                }),
                instance: f.instance,
                range: o
            },
            isStart: n.isStart && o.start.valueOf() === e.start.valueOf(),
            isEnd: n.isEnd && o.end.valueOf() === e.end.valueOf()
        })
    }
    function vct(n, t) {
        if (!n.length) return [];
        var i = yct(t);
        return n.map(function(n) {
            return {
                seg: n,
                isVisible: !0,
                isAbsolute: !0,
                absoluteTop: i[n.eventRange.instance.instanceId],
                marginTop: 0
            }
        })
    }
    function yct(n) {
        for (var e, t, r, u, o = {}, i = 0, f = n; i < f.length; i++) for (e = f[i], t = 0, r = e; t < r.length; t++) u = r[t], o[u.seg.eventRange.instance.instanceId] = u.absoluteTop;
        return n
    }
    function pct(n) {
        return n.eventRange.def.allDay
    }
    function dd(n, t) {
        var i = new vc(n.renderRange, t);
        return new yc(i, /year|month|week/.test(n.currentRangeUnit))
    }
    function gd(n) {
        var i = ["fc-timegrid-slot", "fc-timegrid-slot-label", n.isLabeled ? "fc-scrollgrid-shrink" : "fc-timegrid-slot-minor", ];
        return t(st.Consumer, null, function(r) {
            if (!n.isLabeled) return t("td", {
                className: i.join(" "),
                "data-time": n.isoTimeStr
            });
            var f = r.dateEnv,
                u = r.options,
                e = r.viewApi,
                o = u.slotLabelFormat == null ? dct : Array.isArray(u.slotLabelFormat) ? c(u.slotLabelFormat[0]) : c(u.slotLabelFormat),
                s = {
                    level: 0,
                    time: n.time,
                    date: f.toDate(n.date),
                    view: e,
                    text: f.format(n.date, o)
                };
            return t(k, {
                hookProps: s,
                classNames: u.slotLabelClassNames,
                content: u.slotLabelContent,
                defaultContent: gct,
                didMount: u.slotLabelDidMount,
                willUnmount: u.slotLabelWillUnmount
            }, function(r, u, f, e) {
                return t("td", {
                    ref: r,
                    className: i.concat(u).join(" "),
                    "data-time": n.isoTimeStr
                }, t("div", {
                    className: "fc-timegrid-slot-label-frame fc-scrollgrid-shrink-frame"
                }, t("div", {
                    className: "fc-timegrid-slot-label-cushion fc-scrollgrid-shrink-cushion",
                    ref: f
                }, e)))
            })
        })
    }
    function gct(n) {
        return n.text
    }
    function rlt(n) {
        return n.text
    }
    function elt(n, t) {
        return t.map(function(t) {
            return n[t.key]
        })
    }
    function yu(n, t) {
        for (var r = [], i = 0; i < t; i += 1) r.push([]);
        if (n) for (i = 0; i < n.length; i += 1) r[n[i].col].push(n[i]);
        return r
    }
    function ig(n, t) {
        var r = [],
            i, u, f, e;
        if (n) {
            for (i = 0; i < t; i += 1) r[i] = {
                affectedInstances: n.affectedInstances,
                isEvent: n.isEvent,
                segs: []
            };
            for (u = 0, f = n.segs; u < f.length; u++) e = f[u], r[e.col].segs.push(e)
        } else for (i = 0; i < t; i += 1) r[i] = null;
        return r
    }
    function olt(n) {
        return n.shortText
    }
    function ug(n, t, i) {
        var r = new ce,
            f;
        t != null && (r.strictOrder = t);
        i != null && (r.maxStackCnt = i);
        var e = r.addSegs(n),
            o = kb(e),
            u = slt(r);
        return u = alt(u, 1), f = vlt(u), {
            segRects: f,
            hiddenGroups: o
        }
    }
    function slt(n) {
        var t = n.entriesByLevel,
            r = yl(function(n, t) {
                return n + ":" + t
            }, function(u, f) {
                var s = llt(n, u, f),
                    e = fg(s, r),
                    o = t[u][f];
                return [i(i({}, o), {
                    nextLevelNodes: e[0]
                }), o.thickness + e[1], ]
            });
        return fg(t.length ? {
            level: 0,
            lateralStart: 0,
            lateralEnd: t[0].length
        } : null, r)[0]
    }
    function fg(n, t) {
        if (!n) return [[], 0];
        for (var u = n.level, f = n.lateralStart, e = n.lateralEnd, r = f, i = []; r < e;) i.push(t(u, r)), r += 1;
        return i.sort(hlt), [i.map(clt), i[0][1], ]
    }
    function hlt(n, t) {
        return t[1] - n[1]
    }
    function clt(n) {
        return n[0]
    }
    function llt(n, t, i) {
        for (var f = n.levelCoords, s = n.entriesByLevel, e = s[t][i], v = f[t] + e.thickness, h = f.length, r = t; r < h && f[r] < v; r += 1);
        for (; r < h; r += 1) {
            for (var c = s[r], l = void 0, a = hc(c, e.spanStart, oc), o = a[0] + a[1], u = o;
            (l = c[u]) && l.spanStart < e.spanEnd;) u += 1;
            if (o < u) return {
                level: r,
                lateralStart: o,
                lateralEnd: u
            }
        }
        return null
    }
    function alt(n, t) {
        var r = yl(function(n) {
            return fi(n)
        }, function(n, u, f) {
            var v = n.nextLevelNodes,
                y = n.thickness,
                p = y + f,
                w = y / p,
                e, h = [],
                s, c, l, o, a;
            if (v.length) for (s = 0, c = v; s < c.length; s++) l = c[s], e === undefined ? (o = r(l, u, p), e = o[0], h.push(o[1])) : (o = r(l, e, 0), h.push(o[1]));
            else e = t;
            return a = (e - u) * w, [e - a, i(i({}, n), {
                thickness: a,
                nextLevelNodes: h
            })]
        });
        return n.map(function(n) {
            return r(n, 0, 0)[1]
        })
    }
    function vlt(n) {
        function r(n, t, i) {
            for (var o, r = 0, f = 0, e = n; f < e.length; f++) o = e[f], r = Math.max(u(o, t, i), r);
            return r
        }
        var t = [],
            u = yl(function(n) {
                return fi(n)
            }, function(n, u, f) {
                var e = i(i({}, n), {
                    levelCoord: u,
                    stackDepth: f,
                    stackForward: 0
                });
                return t.push(e), e.stackForward = r(n.nextLevelNodes, u + n.thickness, f + 1) + 1
            });
        return r(n, 0, 0), t
    }
    function yl(n, t) {
        var i = {};
        return function() {
            for (var u, f = [], r = 0; r < arguments.length; r++) f[r] = arguments[r];
            return u = n.apply(void 0, f), u in i ? i[u] : i[u] = t.apply(void 0, f)
        }
    }
    function og(n, r) {
        var e = r.todayRange,
            o = r.nowDate,
            s = r.eventSelection,
            u = r.eventDrag,
            f = r.eventResize,
            h = (u ? u.affectedInstances : null) || (f ? f.affectedInstances : null) || {};
        return t(a, null, n.map(function(n) {
            var r = n.eventRange.instance.instanceId;
            return t("div", {
                key: r,
                style: {
                    visibility: h[r] ? "hidden" : ""
                }
            }, t(eg, i({
                seg: n,
                isDragging: !1,
                isResizing: !1,
                isDateSelecting: !1,
                isSelected: r === s,
                isShort: !1
            }, ot(n, e, o))))
        }))
    }
    function blt(n, t) {
        return n.map(function(n) {
            return t[n.segInput.index]
        })
    }
    function klt(n, t) {
        return t.map(function(t) {
            return n[t.key]
        })
    }
    function dlt(n, t) {
        var i = t || n,
            r = rf(n, i);
        return r === null && (i = n, r = 1), {
            snapDuration: i,
            snapsPerSlot: r
        }
    }
    function hg(n, t, i) {
        for (var u, f = [], r = 0, e = n.headerDates; r < e.length; r++) u = e[r], f.push({
            start: i.add(u, t.slotMinTime),
            end: i.add(u, t.slotMaxTime)
        });
        return f
    }
    function cg(n, t, i, r, u) {
        for (var l = new Date(0), f = n, s = o(0), a = i || glt(r), h = [], e, c; g(f) < g(t);) e = u.add(l, f), c = rf(s, a) !== null, h.push({
            date: e,
            time: f,
            key: e.toISOString(),
            isoTimeStr: ey(e),
            isLabeled: c
        }), f = tf(f, r), s = tf(s, r);
        return h
    }
    function glt(n) {
        for (var i, r, t = kl.length - 1; t >= 0; t -= 1) if (i = o(kl[t]), r = rf(i, n), r !== null && r > 1) return i;
        return n
    }
    function lg(n, t) {
        var i = new vc(n.renderRange, t);
        return new yc(i, !1)
    }
    function rat(n) {
        var r = n.navLinkData ? {
            "data-navlink": n.navLinkData,
            tabIndex: 0
        } : {};
        return t(a, null, n.text && t("a", i({
            className: "fc-list-day-text"
        }, r), n.text), n.sideText && t("a", i({
            className: "fc-list-day-side-text"
        }, r), n.sideText))
    }
    function uat(n) {
        var r = n.event,
            u = r.url,
            f = u ? {
                href: u
            } : {};
        return t("a", i({}, f), r.title)
    }
    function fat(n, i, r) {
        var u = r.options,
            s;
        if (u.displayEventTime !== !1) {
            var h = n.eventRange.def,
                o = n.eventRange.instance,
                e = !1,
                f = void 0;
            return (h.allDay ? e = !0 : dy(n.eventRange.range) ? n.isStart ? f = gi(n, i, r, null, null, o.range.start, n.end) : n.isEnd ? f = gi(n, i, r, null, null, n.start, o.range.end) : e = !0 : f = gi(n, i, r), e) ? (s = {
                text: r.options.allDayText,
                view: r.viewApi
            }, t(k, {
                hookProps: s,
                classNames: u.allDayClassNames,
                content: u.allDayContent,
                defaultContent: eat,
                didMount: u.allDayDidMount,
                willUnmount: u.allDayWillUnmount
            }, function(n, i, r, u) {
                return t("td", {
                    className: ["fc-list-event-time"].concat(i).join(" "),
                    ref: n
                }, u)
            })) : t("td", {
                className: "fc-list-event-time"
            }, f)
        }
        return null
    }
    function eat(n) {
        return n.text
    }
    function oat(n) {
        return n.text
    }
    function sat(n) {
        for (var t = h(n.renderRange.start), u = n.renderRange.end, i = [], r = []; t < u;) i.push(t), r.push({
            start: t,
            end: y(t, 1)
        }), t = y(t, 1);
        return {
            dayDates: i,
            dayRanges: r
        }
    }
    function hat(n) {
        for (var r = [], i, t = 0; t < n.length; t += 1) i = n[t], (r[i.dayIndex] || (r[i.dayIndex] = [])).push(i);
        return r
    }
    function pg(n) {
        return n === !1 ? null : c(n)
    }
    function pat(n) {
        var t;
        return /^[^/]+@([^/.]+\.)*(google|googlemail|gmail)\.com$/.test(n) ? n : (t = /^https:\/\/www.googleapis.com\/calendar\/v3\/calendars\/([^/]*)/.exec(n)) || (t = /^https?:\/\/www.google.com\/calendar\/feeds\/([^/]*)/.exec(n)) ? decodeURIComponent(t[1]) : null
    }
    function wat(n) {
        var t = n.googleCalendarApiBase;
        return t || (t = vat), t + "/" + encodeURIComponent(n.googleCalendarId) + "/events"
    }
    function bat(n, t, r, u) {
        var f, e, o;
        return u.canComputeOffset ? (e = u.formatIso(n.start), o = u.formatIso(n.end)) : (e = y(n.start, -1).toISOString(), o = y(n.end, 1).toISOString()), f = i(i({}, r || {}), {
            key: t,
            timeMin: e,
            timeMax: o,
            singleEvents: !0,
            maxResults: 9999
        }), u.timeZone !== "local" && (f.timeZone = u.timeZone), f
    }
    function kat(n, t) {
        return n.map(function(n) {
            return dat(n, t)
        })
    }
    function dat(n, t) {
        var i = n.htmlLink || null;
        return i && t && (i = gat(i, "ctz=" + t)), {
            id: n.id,
            title: n.summary,
            start: n.start.dateTime || n.start.date,
            end: n.end.dateTime || n.end.date,
            url: i,
            location: n.location,
            description: n.description,
            attachments: n.attachments || [],
            extendedProps: (n.extendedProperties || {}).shared || {}
        }
    }
    function gat(n, t) {
        return n.replace(/(\?.*?)?(#|$)/, function(n, i, r) {
            return (i ? i + "&" : "?") + t + r
        })
    }
    var eo = function(n, t) {
        return eo = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function(n, t) {
            n.__proto__ = t
        } || function(n, t) {
            for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i])
        }, eo(n, t)
    }, i = function() {
        return i = Object.assign || function(n) {
            for (var t, r, i = 1, u = arguments.length; i < u; i++) {
                t = arguments[i];
                for (r in t) Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r])
            }
            return n
        }, i.apply(this, arguments)
    }, e, er, na, ta, oo, ia, pt = {}, so = [],
        kg = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
        yo, wo, da, ko, go, dn, ns, ts, is, rs, iv, kt, uv, es, os, ss, yr, ws, ry, cy, ly, yy, dr, py, sp, oh, ap, sh, l, hh, wp, bp, iw, yh, ne, wh, ie, bh, tr, fu, s, it, yt, k, ee, gw, eu, ui, rc, oe, ab, se, ou, yb, he, wb, bb, ce, ei, lc, ac, ve, lu, ur, be, au, ge, no, gk, nd, fr, fd, ed, ol, od, ld, sl, hl, cl, vd, yd, pd, wd, ll, al, rg, sg, pl, wl, bl, kl, dl, ag, vg, gl, yg, wg, ct, bg;
    e = {
        __e: function(n, t) {
            for (var i, r, u, f = t.__h; t = t.__;) if ((i = t.__c) && !i.__) try {
                if ((r = i.constructor) && null != r.getDerivedStateFromError && (i.setState(r.getDerivedStateFromError(n)), u = i.__d), null != i.componentDidCatch && (i.componentDidCatch(n), u = i.__d), u) return t.__h = f, i.__E = i
            } catch (t) {
                n = t
            }
            throw n;
        },
        __v: 0
    };
    rt.prototype.setState = function(n, t) {
        var i;
        i = null != this.__s && this.__s !== this.state ? this.__s : this.__s = wt({}, this.state);
        "function" == typeof n && (n = n(wt({}, i), this.props));
        n && wt(i, n);
        null != n && this.__v && (t && this.__h.push(t), ho(this))
    };
    rt.prototype.forceUpdate = function(n) {
        this.__v && (this.__e = !0, n && this.__h.push(n), ho(this))
    };
    rt.prototype.render = oi;
    er = [];
    na = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;
    wu.__r = 0;
    oo = pt;
    ia = 0;
    var on, si, la, vo = [],
        aa = e.__b,
        va = e.__r,
        ya = e.diffed,
        pa = e.__c,
        wa = e.unmount;
    e.__b = function(n) {
        si = null;
        aa && aa(n)
    };
    e.__r = function(n) {
        va && va(n);
        on = 0;
        var t = (si = n.__c).__H;
        t && (t.__h.forEach(ku), t.__h.forEach(po), t.__h = [])
    };
    e.diffed = function(n) {
        ya && ya(n);
        var t = n.__c;
        t && t.__H && t.__H.__h.length && (1 !== vo.push(t) && la === e.requestAnimationFrame || ((la = e.requestAnimationFrame) || function(n) {
            var t, i = function() {
                clearTimeout(r);
                yo && cancelAnimationFrame(t);
                setTimeout(n)
            }, r = setTimeout(i, 100);
            yo && (t = requestAnimationFrame(i))
        })(sn));
        si = void 0
    };
    e.__c = function(n, t) {
        t.some(function(n) {
            try {
                n.__h.forEach(ku);
                n.__h = n.__h.filter(function(n) {
                    return !n.__ || po(n)
                })
            } catch (i) {
                t.some(function(n) {
                    n.__h && (n.__h = [])
                });
                t = [];
                e.__e(i, n.__v)
            }
        });
        pa && pa(n, t)
    };
    e.unmount = function(n) {
        wa && wa(n);
        var t = n.__c;
        if (t && t.__H) try {
            t.__H.__.forEach(ku)
        } catch (n) {
            e.__e(n, t.__v)
        }
    };
    yo = "function" == typeof requestAnimationFrame;
    (ka.prototype = new rt).isPureReactComponent = !0;
    ka.prototype.shouldComponentUpdate = function(n, t) {
        return ba(this.props, n) || ba(this.state, t)
    };
    wo = e.__b;
    e.__b = function(n) {
        n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null);
        wo && wo(n)
    };
    da = e.__e;
    e.__e = function(n, t, i) {
        if (n.then) for (var r, u = t; u = u.__;) if ((r = u.__c) && r.__c) return null == t.__e && (t.__e = i.__e, t.__k = i.__k), r.__c(n, t);
        da(n, t, i)
    };
    (bo.prototype = new rt).__c = function(n, t) {
        var r = t.__c,
            i = this,
            f;
        null == i.t && (i.t = []);
        i.t.push(r);
        var e = tv(i.__v),
            o = !1,
            u = function() {
                o || (o = !0, r.componentWillUnmount = r.__c, e ? e(f) : f())
            };
        r.__c = r.componentWillUnmount;
        r.componentWillUnmount = function() {
            u();
            r.__c && r.__c()
        };
        f = function() {
            var n;
            if (!--i.__u) for (i.__v.__k[0] = nv(i.state.__e), i.setState({
                __e: i.__b = null
            }); n = i.t.pop();) n.forceUpdate()
        };
        !0 === t.__h || i.__u++ || i.setState({
            __e: i.__b = i.__v.__k[0]
        });
        n.then(u, u)
    };
    bo.prototype.componentWillUnmount = function() {
        this.t = []
    };
    bo.prototype.render = function(n, t) {
        this.__b && (this.__v.__k && (this.__v.__k[0] = ga(this.__b)), this.__b = null);
        var i = t.__e && bt(oi, null, n.fallback);
        return i && (i.__h = null), [bt(oi, null, t.__e ? null : n.children), i]
    };
    ko = function(n, t, i) {
        if (++i[1] === i[0] && n.o.delete(t), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.o.size)) for (i = n.u; i;) {
            for (; i.length > 3;) i.pop()();
            if (i[1] < i[0]) break;
            n.u = i = i[2]
        }
    };
    (du.prototype = new rt).__e = function(n) {
        var t = this,
            r = tv(t.__v),
            i = t.o.get(n);
        return i[0]++,
        function(u) {
            var f = function() {
                t.props.revealOrder ? (i.push(u), ko(t, n, i)) : u()
            };
            r ? r(f) : f()
        }
    };
    du.prototype.render = function(n) {
        var t, i;
        for (this.u = null, this.o = new Map, t = co(n.children), n.revealOrder && "b" === n.revealOrder[0] && t.reverse(), i = t.length; i--;) this.o.set(t[i], this.u = [1, 0, this.u]);
        return n.children
    };
    du.prototype.componentDidUpdate = du.prototype.componentDidMount = function() {
        var n = this;
        this.o.forEach(function(t, i) {
            ko(n, i, t)
        })
    };
    var vn = "undefined" != typeof Symbol && Symbol.
    for && Symbol.
    for ("react.element") || 60103, yn = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, pn = "undefined" != typeof Symbol ? /fil|che|rad/i : /fil|che|ra/i;
    rt.prototype.isReactComponent = {};
    ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(n) {
        Object.defineProperty(rt.prototype, n, {
            configurable: !0,
            get: function() {
                return this["UNSAFE_" + n]
            },
            set: function(t) {
                Object.defineProperty(this, n, {
                    configurable: !0,
                    writable: !0,
                    value: t
                })
            }
        })
    });
    go = e.event;
    e.event = function(n) {
        return go && (n = go(n)), n.persist = wn, n.isPropagationStopped = bn, n.isDefaultPrevented = kn, n.nativeEvent = n
    };
    ns = {
        configurable: !0,
        get: function() {
            return this.class
        }
    };
    ts = e.vnode;
    e.vnode = function(n) {
        var f = n.type,
            i = n.props,
            r = i,
            t, u;
        if ("string" == typeof f) {
            for (t in r = {}, i) u = i[t], "defaultValue" === t && "value" in i && null == i.value ? t = "value" : "download" === t && !0 === u ? u = "" : /ondoubleclick/i.test(t) ? t = "ondblclick" : /^onchange(textarea|input)/i.test(t + f) && !pn.test(i.type) ? t = "oninput" : /^on(Ani|Tra|Tou|BeforeInp)/.test(t) ? t = t.toLowerCase() : yn.test(t) ? t = t.replace(/[A-Z0-9]/, "-$&").toLowerCase() : null === u && (u = void 0), r[t] = u;
            "select" == f && r.multiple && Array.isArray(r.value) && (r.value = co(i.children).forEach(function(n) {
                n.props.selected = -1 != r.value.indexOf(n.props.value)
            }));
            n.props = r
        }
        f && i.class != i.className && (ns.enumerable = "className" in i, null != i.className && (r.class = i.className), Object.defineProperty(r, "className", ns));
        n.$$typeof = vn;
        ts && ts(n)
    };
    is = e.__r;
    e.__r = function(n) {
        is && is(n);
        dn = n.__c
    };
    rs = typeof globalThis != "undefined" ? globalThis : window;
    rs.FCalendar570VDom ? console.warn("FCalendar570 VDOM already loaded") : rs.FCalendar570VDom = {
        Component: rt,
        createElement: bt,
        render: pi,
        createRef: dg,
        Fragment: oi,
        createContext: ntt,
        createPortal: an,
        flushToDom: gn,
        unmountComponentAtNode: ttt
    };
    iv = function(n) {
        function t() {
            return n !== null && n.apply(this, arguments) || this
        }
        return u(t, n), t.prototype.render = function() {
            return bt("div", {})
        }, t.prototype.componentDidMount = function() {
            this.setState({})
        }, t
    }(rt);
    kt = function() {
        function n(n, t) {
            this.context = n;
            this.internalEventSource = t
        }
        return n.prototype.remove = function() {
            this.context.dispatch({
                type: "REMOVE_EVENT_SOURCE",
                sourceId: this.internalEventSource.sourceId
            })
        }, n.prototype.refetch = function() {
            this.context.dispatch({
                type: "FETCH_EVENT_SOURCES",
                sourceIds: [this.internalEventSource.sourceId],
                isRefetch: !0
            })
        }, Object.defineProperty(n.prototype, "id", {
            get: function() {
                return this.internalEventSource.publicId
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "url", {
            get: function() {
                return this.internalEventSource.meta.url
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "format", {
            get: function() {
                return this.internalEventSource.meta.format
            },
            enumerable: !1,
            configurable: !0
        }), n
    }();
    uv = /(top|left|right|bottom|width|height)$/i;
    es = ["webkitTransitionEnd", "otransitionend", "oTransitionEnd", "msTransitionEnd", "transitionend", ];
    os = 0;
    ss = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    yr = Object.prototype.hasOwnProperty;
    ws = ["years", "months", "days", "milliseconds"];
    ry = /^(-?)(?:(\d+)\.)?(\d+):(\d\d)(?::(\d\d)(?:\.(\d\d\d))?)?/;
    var oy = {
        week: 3,
        separator: 0,
        omitZeroMinute: 0,
        meridiem: 0,
        omitCommas: 0
    }, ff = {
        timeZoneName: 7,
        era: 6,
        year: 5,
        month: 4,
        day: 2,
        weekday: 2,
        hour: 1,
        minute: 1,
        second: 1
    }, ef = /\s*([ap])\.?m\.?/i,
        oit = /,/g,
        sit = /\s+/g,
        hit = /\u200e/g,
        cit = /UTC|GMT/,
        lit = function() {
            function n(n) {
                var r = {}, u = {}, i = 0;
                for (var t in n) t in oy ? (u[t] = n[t], i = Math.max(oy[t], i)) : (r[t] = n[t], t in ff && (i = Math.max(ff[t], i)));
                this.standardDateProps = r;
                this.extendedSettings = u;
                this.severity = i;
                this.buildFormattingFunc = f(sy)
            }
            return n.prototype.format = function(n, t) {
                return this.buildFormattingFunc(this.standardDateProps, this.extendedSettings, t)(n)
            }, n.prototype.formatRange = function(n, t, i, r) {
                var h = this,
                    u = h.standardDateProps,
                    c = h.extendedSettings,
                    l = bit(n.marker, t.marker, i.calendarSystem),
                    e, f, o;
                if (!l) return this.format(n, i);
                if (e = l, e > 1 && (u.year === "numeric" || u.year === "2-digit") && (u.month === "numeric" || u.month === "2-digit") && (u.day === "numeric" || u.day === "2-digit") && (e = 1), f = this.format(n, i), o = this.format(t, i), f === o) return f;
                var w = kit(u, e),
                    a = sy(w, c, i),
                    v = a(n),
                    y = a(t),
                    s = dit(f, v, o, y),
                    p = c.separator || r || i.defaultSeparator || "";
                return s ? s.before + v + p + y + s.after : f + p + o
            }, n.prototype.getLargestUnit = function() {
                switch (this.severity) {
                    case 7:
                    case 6:
                    case 5:
                        return "year";
                    case 4:
                        return "month";
                    case 3:
                        return "week";
                    case 2:
                        return "day";
                    default:
                        return "time"
                }
            }, n
        }();
    cy = function() {
        function n(n) {
            this.cmdStr = n
        }
        return n.prototype.format = function(n, t, i) {
            return t.cmdFormatter(this.cmdStr, of(n, null, t, i))
        }, n.prototype.formatRange = function(n, t, i, r) {
            return i.cmdFormatter(this.cmdStr, of(n, t, i, r))
        }, n
    }();
    ly = function() {
        function n(n) {
            this.func = n
        }
        return n.prototype.format = function(n, t, i) {
            return this.func(of(n, null, t, i))
        }, n.prototype.formatRange = function(n, t, i, r) {
            return this.func(of(n, t, i, r))
        }, n
    }();
    var ds = {
        navLinkDayClick: r,
        navLinkWeekClick: r,
        duration: o,
        bootstrapFontAwesome: r,
        buttonIcons: r,
        customButtons: r,
        defaultAllDayEventDuration: o,
        defaultTimedEventDuration: o,
        nextDayThreshold: o,
        scrollTime: o,
        scrollTimeReset: Boolean,
        slotMinTime: o,
        slotMaxTime: o,
        dayPopoverFormat: c,
        slotDuration: o,
        snapDuration: o,
        headerToolbar: r,
        footerToolbar: r,
        defaultRangeSeparator: String,
        titleRangeSeparator: String,
        forceEventDuration: Boolean,
        dayHeaders: Boolean,
        dayHeaderFormat: c,
        dayHeaderClassNames: r,
        dayHeaderContent: r,
        dayHeaderDidMount: r,
        dayHeaderWillUnmount: r,
        dayCellClassNames: r,
        dayCellContent: r,
        dayCellDidMount: r,
        dayCellWillUnmount: r,
        initialView: String,
        aspectRatio: Number,
        weekends: Boolean,
        weekNumberCalculation: r,
        weekNumbers: Boolean,
        weekNumberClassNames: r,
        weekNumberContent: r,
        weekNumberDidMount: r,
        weekNumberWillUnmount: r,
        editable: Boolean,
        viewClassNames: r,
        viewDidMount: r,
        viewWillUnmount: r,
        nowIndicator: Boolean,
        nowIndicatorClassNames: r,
        nowIndicatorContent: r,
        nowIndicatorDidMount: r,
        nowIndicatorWillUnmount: r,
        showNonCurrentDates: Boolean,
        lazyFetching: Boolean,
        startParam: String,
        endParam: String,
        timeZoneParam: String,
        timeZone: String,
        locales: r,
        locale: r,
        themeSystem: String,
        dragRevertDuration: Number,
        dragScroll: Boolean,
        allDayMaintainDuration: Boolean,
        unselectAuto: Boolean,
        dropAccept: r,
        eventOrder: lv,
        eventOrderStrict: Boolean,
        handleWindowResize: Boolean,
        windowResizeDelay: Number,
        longPressDelay: Number,
        eventDragMinDistance: Number,
        expandRows: Boolean,
        height: r,
        contentHeight: r,
        direction: String,
        weekNumberFormat: c,
        eventResizableFromStart: Boolean,
        displayEventTime: Boolean,
        displayEventEnd: Boolean,
        weekText: String,
        progressiveEventRendering: Boolean,
        businessHours: r,
        initialDate: r,
        now: r,
        eventDataTransform: r,
        stickyHeaderDates: r,
        stickyFooterScrollbar: r,
        viewHeight: r,
        defaultAllDay: Boolean,
        eventSourceFailure: r,
        eventSourceSuccess: r,
        eventDisplay: String,
        eventStartEditable: Boolean,
        eventDurationEditable: Boolean,
        eventOverlap: r,
        eventConstraint: r,
        eventAllow: r,
        eventBackgroundColor: String,
        eventBorderColor: String,
        eventTextColor: String,
        eventColor: String,
        eventClassNames: r,
        eventContent: r,
        eventDidMount: r,
        eventWillUnmount: r,
        selectConstraint: r,
        selectOverlap: r,
        selectAllow: r,
        droppable: Boolean,
        unselectCancel: String,
        slotLabelFormat: r,
        slotLaneClassNames: r,
        slotLaneContent: r,
        slotLaneDidMount: r,
        slotLaneWillUnmount: r,
        slotLabelClassNames: r,
        slotLabelContent: r,
        slotLabelDidMount: r,
        slotLabelWillUnmount: r,
        dayMaxEvents: r,
        dayMaxEventRows: r,
        dayMinWidth: Number,
        slotLabelInterval: o,
        allDayText: String,
        allDayClassNames: r,
        allDayContent: r,
        allDayDidMount: r,
        allDayWillUnmount: r,
        slotMinWidth: Number,
        navLinks: Boolean,
        eventTimeFormat: c,
        rerenderDelay: Number,
        moreLinkText: r,
        selectMinDistance: Number,
        selectable: Boolean,
        selectLongPressDelay: Number,
        eventLongPressDelay: Number,
        selectMirror: Boolean,
        eventMaxStack: Number,
        eventMinHeight: Number,
        eventMinWidth: Number,
        eventShortHeight: Number,
        slotEventOverlap: Boolean,
        plugins: r,
        firstDay: Number,
        dayCount: Number,
        dateAlignment: String,
        dateIncrement: o,
        hiddenDays: r,
        monthMode: Boolean,
        fixedWeekCount: Boolean,
        validRange: r,
        visibleRange: r,
        titleFormat: r,
        noEventsText: String,
        moreLinkClick: r,
        moreLinkClassNames: r,
        moreLinkContent: r,
        moreLinkDidMount: r,
        moreLinkWillUnmount: r
    }, vt = {
        eventDisplay: "auto",
        defaultRangeSeparator: " - ",
        titleRangeSeparator: " – ",
        defaultTimedEventDuration: "01:00:00",
        defaultAllDayEventDuration: {
            day: 1
        },
        forceEventDuration: !1,
        nextDayThreshold: "00:00:00",
        dayHeaders: !0,
        initialView: "",
        aspectRatio: 1.35,
        headerToolbar: {
            start: "title",
            center: "",
            end: "today prev,next"
        },
        weekends: !0,
        weekNumbers: !1,
        weekNumberCalculation: "local",
        editable: !1,
        nowIndicator: !1,
        scrollTime: "06:00:00",
        scrollTimeReset: !0,
        slotMinTime: "00:00:00",
        slotMaxTime: "24:00:00",
        showNonCurrentDates: !0,
        lazyFetching: !0,
        startParam: "start",
        endParam: "end",
        timeZoneParam: "timeZone",
        timeZone: "local",
        locales: [],
        locale: "",
        themeSystem: "standard",
        dragRevertDuration: 500,
        dragScroll: !0,
        allDayMaintainDuration: !1,
        unselectAuto: !0,
        dropAccept: "*",
        eventOrder: "start,-duration,allDay,title",
        dayPopoverFormat: {
            month: "long",
            day: "numeric",
            year: "numeric"
        },
        handleWindowResize: !0,
        windowResizeDelay: 100,
        longPressDelay: 1e3,
        eventDragMinDistance: 5,
        expandRows: !1,
        navLinks: !1,
        selectable: !1,
        eventMinHeight: 15,
        eventMinWidth: 30,
        eventShortHeight: 30
    }, ay = {
        datesSet: r,
        eventsSet: r,
        eventAdd: r,
        eventChange: r,
        eventRemove: r,
        windowResize: r,
        eventClick: r,
        eventMouseEnter: r,
        eventMouseLeave: r,
        select: r,
        unselect: r,
        loading: r,
        _unmount: r,
        _beforeprint: r,
        _afterprint: r,
        _noEventDrop: r,
        _noEventResize: r,
        _resize: r,
        _scrollRequest: r
    }, vy = {
        buttonText: r,
        views: r,
        plugins: r,
        initialEvents: r,
        events: r,
        eventSources: r
    }, gs = {
        headerToolbar: sf,
        footerToolbar: sf,
        buttonText: sf,
        buttonIcons: sf
    };
    yy = {
        type: String,
        component: r,
        buttonText: String,
        buttonTextKey: String,
        dateProfileGeneratorClass: r,
        usesMinMaxTime: Boolean,
        classNames: r,
        content: r,
        didMount: r,
        willUnmount: r
    };
    dr = {
        display: String,
        editable: Boolean,
        startEditable: Boolean,
        durationEditable: Boolean,
        constraint: r,
        overlap: r,
        allow: r,
        className: af,
        classNames: af,
        color: String,
        backgroundColor: String,
        borderColor: String,
        textColor: String
    };
    py = {
        display: null,
        startEditable: null,
        durationEditable: null,
        constraints: [],
        overlap: null,
        allows: [],
        backgroundColor: "",
        borderColor: "",
        textColor: "",
        classNames: []
    };
    var vf = {
        id: String,
        groupId: String,
        title: String,
        url: String
    }, wy = {
        start: r,
        end: r,
        date: r,
        allDay: Boolean
    }, rrt = i(i(i({}, vf), wy), {
        extendedProps: r
    });
    sp = {
        start: r,
        end: r,
        allDay: Boolean
    };
    oh = function() {
        function n(n, t, i) {
            this.type = n;
            this.getCurrentData = t;
            this.dateEnv = i
        }
        return Object.defineProperty(n.prototype, "calendar", {
            get: function() {
                return this.getCurrentData().calendarApi
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "title", {
            get: function() {
                return this.getCurrentData().viewTitle
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "activeStart", {
            get: function() {
                return this.dateEnv.toDate(this.getCurrentData().dateProfile.activeRange.start)
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "activeEnd", {
            get: function() {
                return this.dateEnv.toDate(this.getCurrentData().dateProfile.activeRange.end)
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "currentStart", {
            get: function() {
                return this.dateEnv.toDate(this.getCurrentData().dateProfile.currentRange.start)
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "currentEnd", {
            get: function() {
                return this.dateEnv.toDate(this.getCurrentData().dateProfile.currentRange.end)
            },
            enumerable: !1,
            configurable: !0
        }), n.prototype.getOption = function(n) {
            return this.getCurrentData().options[n]
        }, n
    }();
    ap = {
        id: String,
        defaultAllDay: Boolean,
        url: String,
        format: String,
        events: r,
        eventDataTransform: r,
        success: r,
        failure: r
    };
    sh = function() {
        function n() {}
        return n.prototype.getCurrentData = function() {
            return this.currentDataManager.getCurrentData()
        }, n.prototype.dispatch = function(n) {
            return this.currentDataManager.dispatch(n)
        }, Object.defineProperty(n.prototype, "view", {
            get: function() {
                return this.getCurrentData().viewApi
            },
            enumerable: !1,
            configurable: !0
        }), n.prototype.batchRendering = function(n) {
            n()
        }, n.prototype.updateSize = function() {
            this.trigger("_resize", !0)
        }, n.prototype.setOption = function(n, t) {
            this.dispatch({
                type: "SET_OPTION",
                optionName: n,
                rawOptionValue: t
            })
        }, n.prototype.getOption = function(n) {
            return this.currentDataManager.currentCalendarOptionsInput[n]
        }, n.prototype.getAvailableLocaleCodes = function() {
            return Object.keys(this.getCurrentData().availableRawLocales)
        }, n.prototype.on = function(n, t) {
            var i = this.currentDataManager;
            if (i.currentCalendarOptionsRefiners[n]) i.emitter.on(n, t);
            else console.warn("Unknown listener name '" + n + "'")
        }, n.prototype.off = function(n, t) {
            this.currentDataManager.emitter.off(n, t)
        }, n.prototype.trigger = function(n) {
            for (var i, r = [], t = 1; t < arguments.length; t++) r[t - 1] = arguments[t];
            (i = this.currentDataManager.emitter).trigger.apply(i, v([n], r))
        }, n.prototype.changeView = function(n, t) {
            var i = this;
            this.batchRendering(function() {
                if (i.unselect(), t) if (t.start && t.end) i.dispatch({
                    type: "CHANGE_VIEW_TYPE",
                    viewType: n
                }), i.dispatch({
                    type: "SET_OPTION",
                    optionName: "visibleRange",
                    rawOptionValue: t
                });
                else {
                    var r = i.getCurrentData().dateEnv;
                    i.dispatch({
                        type: "CHANGE_VIEW_TYPE",
                        viewType: n,
                        dateMarker: r.createMarker(t)
                    })
                } else i.dispatch({
                    type: "CHANGE_VIEW_TYPE",
                    viewType: n
                })
            })
        }, n.prototype.zoomTo = function(n, t) {
            var r = this.getCurrentData(),
                i;
            t = t || "day";
            i = r.viewSpecs[t] || this.getUnitViewSpec(t);
            this.unselect();
            i ? this.dispatch({
                type: "CHANGE_VIEW_TYPE",
                viewType: i.type,
                dateMarker: n
            }) : this.dispatch({
                type: "CHANGE_DATE",
                dateMarker: n
            })
        }, n.prototype.getUnitViewSpec = function(n) {
            var u = this.getCurrentData(),
                f = u.viewSpecs,
                e = u.toolbarConfig,
                r = [].concat(e.viewsWithButtons),
                t, i;
            for (var o in f) r.push(o);
            for (t = 0; t < r.length; t += 1) if (i = f[r[t]], i && i.singleUnit === n) return i;
            return null
        }, n.prototype.prev = function() {
            this.unselect();
            this.dispatch({
                type: "PREV"
            })
        }, n.prototype.next = function() {
            this.unselect();
            this.dispatch({
                type: "NEXT"
            })
        }, n.prototype.prevYear = function() {
            var n = this.getCurrentData();
            this.unselect();
            this.dispatch({
                type: "CHANGE_DATE",
                dateMarker: n.dateEnv.addYears(n.currentDate, -1)
            })
        }, n.prototype.nextYear = function() {
            var n = this.getCurrentData();
            this.unselect();
            this.dispatch({
                type: "CHANGE_DATE",
                dateMarker: n.dateEnv.addYears(n.currentDate, 1)
            })
        }, n.prototype.today = function() {
            var n = this.getCurrentData();
            this.unselect();
            this.dispatch({
                type: "CHANGE_DATE",
                dateMarker: ru(n.calendarOptions.now, n.dateEnv)
            })
        }, n.prototype.gotoDate = function(n) {
            var t = this.getCurrentData();
            this.unselect();
            this.dispatch({
                type: "CHANGE_DATE",
                dateMarker: t.dateEnv.createMarker(n)
            })
        }, n.prototype.incrementDate = function(n) {
            var t = this.getCurrentData(),
                i = o(n);
            i && (this.unselect(), this.dispatch({
                type: "CHANGE_DATE",
                dateMarker: t.dateEnv.add(t.currentDate, i)
            }))
        }, n.prototype.getDate = function() {
            var n = this.getCurrentData();
            return n.dateEnv.toDate(n.currentDate)
        }, n.prototype.formatDate = function(n, t) {
            var i = this.getCurrentData().dateEnv;
            return i.format(i.createMarker(n), c(t))
        }, n.prototype.formatRange = function(n, t, i) {
            var r = this.getCurrentData().dateEnv;
            return r.formatRange(r.createMarker(n), r.createMarker(t), c(i), i)
        }, n.prototype.formatIso = function(n, t) {
            var i = this.getCurrentData().dateEnv;
            return i.formatIso(i.createMarker(n), {
                omitTime: t
            })
        }, n.prototype.select = function(n, t) {
            var u, r, i;
            u = t == null ? n.start != null ? n : {
                start: n,
                end: null
            } : {
                start: n,
                end: t
            };
            r = this.getCurrentData();
            i = hrt(u, r.dateEnv, o({
                days: 1
            }));
            i && (this.dispatch({
                type: "SELECT_DATES",
                selection: i
            }), fh(i, null, r))
        }, n.prototype.unselect = function(n) {
            var t = this.getCurrentData();
            t.dateSelection && (this.dispatch({
                type: "UNSELECT_DATES"
            }), yrt(n, t))
        }, n.prototype.addEvent = function(n, t) {
            var r, u, f, i, e;
            if (n instanceof l) {
                var o = n._def,
                    s = n._instance,
                    h = this.getCurrentData();
                return h.eventStore.defs[o.defId] || (this.dispatch({
                    type: "ADD_EVENTS",
                    eventStore: di({
                        def: o,
                        instance: s
                    })
                }), this.triggerEventAdd(n)), n
            }
            if (r = this.getCurrentData(), t instanceof kt) u = t.internalEventSource;
            else if (typeof t == "boolean") t && (u = vs(r.eventSources)[0]);
            else if (t != null) {
                if (f = this.getEventSourceById(t), !f) return console.warn('Could not find an event source with ID "' + t + '"'), null;
                u = f.internalEventSource
            }
            return (i = by(n, u, r, !1), i) ? (e = new l(r, i.def, i.def.recurringDef ? null : i.instance), this.dispatch({
                type: "ADD_EVENTS",
                eventStore: di(i)
            }), this.triggerEventAdd(e), e) : null
        }, n.prototype.triggerEventAdd = function(n) {
            var t = this,
                i = this.getCurrentData().emitter;
            i.trigger("eventAdd", {
                event: n,
                relatedEvents: [],
                revert: function() {
                    t.dispatch({
                        type: "REMOVE_EVENTS",
                        eventStore: pp(n)
                    })
                }
            })
        }, n.prototype.getEventById = function(n) {
            var i = this.getCurrentData(),
                u = i.eventStore,
                f = u.defs,
                e = u.instances,
                o, t, s, r;
            n = String(n);
            for (o in f) if (t = f[o], t.publicId === n) {
                if (t.recurringDef) return new l(i, t, null);
                for (s in e) if (r = e[s], r.defId === t.defId) return new l(i, t, r)
            }
            return null
        }, n.prototype.getEvents = function() {
            var n = this.getCurrentData();
            return ri(n.eventStore, n)
        }, n.prototype.removeAllEvents = function() {
            this.dispatch({
                type: "REMOVE_ALL_EVENTS"
            })
        }, n.prototype.getEventSources = function() {
            var n = this.getCurrentData(),
                t = n.eventSources,
                i = [];
            for (var r in t) i.push(new kt(n, t[r]));
            return i
        }, n.prototype.getEventSourceById = function(n) {
            var r = this.getCurrentData(),
                t = r.eventSources,
                i;
            n = String(n);
            for (i in t) if (t[i].publicId === n) return new kt(r, t[i]);
            return null
        }, n.prototype.addEventSource = function(n) {
            var i = this.getCurrentData(),
                t;
            return n instanceof kt ? (i.eventSources[n.internalEventSource.sourceId] || this.dispatch({
                type: "ADD_EVENT_SOURCES",
                sources: [n.internalEventSource]
            }), n) : (t = vp(n, i), t) ? (this.dispatch({
                type: "ADD_EVENT_SOURCES",
                sources: [t]
            }), new kt(i, t)) : null
        }, n.prototype.removeAllEventSources = function() {
            this.dispatch({
                type: "REMOVE_ALL_EVENT_SOURCES"
            })
        }, n.prototype.refetchEvents = function() {
            this.dispatch({
                type: "FETCH_EVENT_SOURCES",
                isRefetch: !0
            })
        }, n.prototype.scrollToTime = function(n) {
            var t = o(n);
            t && this.trigger("_scrollRequest", {
                time: t
            })
        }, n
    }();
    l = function() {
        function n(n, t, i) {
            this._context = n;
            this._def = t;
            this._instance = i || null
        }
        return n.prototype.setProp = function(n, t) {
            var i, r, u;
            n in wy ? console.warn("Could not set date-related prop 'name'. Use one of the date-related methods instead.") : n === "id" ? (t = vf[n](t), this.mutate({
                standardProps: {
                    publicId: t
                }
            })) : n in vf ? (t = vf[n](t), this.mutate({
                standardProps: (i = {}, i[n] = t, i)
            })) : n in dr ? (u = dr[n](t), u = n === "color" ? {
                backgroundColor: t,
                borderColor: t
            } : n === "editable" ? {
                startEditable: t,
                durationEditable: t
            } : (r = {}, r[n] = t, r), this.mutate({
                standardProps: {
                    ui: u
                }
            })) : console.warn("Could not set prop '" + n + "'. Use setExtendedProp instead.")
        }, n.prototype.setExtendedProp = function(n, t) {
            var i;
            this.mutate({
                extendedProps: (i = {}, i[n] = t, i)
            })
        }, n.prototype.setStart = function(n, t) {
            var i, r, f, u;
            t === void 0 && (t = {});
            i = this._context.dateEnv;
            r = i.createMarker(n);
            r && this._instance && (f = this._instance.range, u = li(f.start, r, i, t.granularity), t.maintainDuration ? this.mutate({
                datesDelta: u
            }) : this.mutate({
                startDelta: u
            }))
        }, n.prototype.setEnd = function(n, t) {
            var r, i, u;
            (t === void 0 && (t = {}), r = this._context.dateEnv, n == null || (i = r.createMarker(n), i)) && this._instance && (i ? (u = li(this._instance.range.end, i, r, t.granularity), this.mutate({
                endDelta: u
            })) : this.mutate({
                standardProps: {
                    hasEnd: !1
                }
            }))
        }, n.prototype.setDates = function(n, t, i) {
            var r, u, s;
            i === void 0 && (i = {});
            var f = this._context.dateEnv,
                e = {
                    allDay: i.allDay
                }, h = f.createMarker(n),
                o;
            h && (t == null || (o = f.createMarker(t), o)) && this._instance && (r = this._instance.range, i.allDay === !0 && (r = ky(r)), u = li(r.start, h, f, i.granularity), o ? (s = li(r.end, o, f, i.granularity), ktt(u, s) ? this.mutate({
                datesDelta: u,
                standardProps: e
            }) : this.mutate({
                startDelta: u,
                endDelta: s,
                standardProps: e
            })) : (e.hasEnd = !1, this.mutate({
                datesDelta: u,
                standardProps: e
            })))
        }, n.prototype.moveStart = function(n) {
            var t = o(n);
            t && this.mutate({
                startDelta: t
            })
        }, n.prototype.moveEnd = function(n) {
            var t = o(n);
            t && this.mutate({
                endDelta: t
            })
        }, n.prototype.moveDates = function(n) {
            var t = o(n);
            t && this.mutate({
                datesDelta: t
            })
        }, n.prototype.setAllDay = function(n, t) {
            t === void 0 && (t = {});
            var r = {
                allDay: n
            }, i = t.maintainDuration;
            i == null && (i = this._context.options.allDayMaintainDuration);
            this._def.allDay !== n && (r.hasEnd = i);
            this.mutate({
                standardProps: r
            })
        }, n.prototype.formatRange = function(n) {
            var i = this._context.dateEnv,
                t = this._instance,
                r = c(n);
            return this._def.hasEnd ? i.formatRange(t.range.start, t.range.end, r, {
                forcedStartTzo: t.forcedStartTzo,
                forcedEndTzo: t.forcedEndTzo
            }) : i.format(t.range.start, r, {
                forcedTzo: t.forcedStartTzo
            })
        }, n.prototype.mutate = function(t) {
            var u = this._instance,
                o;
            if (u) {
                var f = this._def,
                    i = this._context,
                    e = i.getCurrentData().eventStore,
                    r = cf(e, u.instanceId);
                r = gf(r, {
                    "": {
                        display: "",
                        startEditable: !0,
                        durationEditable: !0,
                        constraints: [],
                        overlap: null,
                        allows: [],
                        backgroundColor: "",
                        borderColor: "",
                        textColor: "",
                        classNames: []
                    }
                }, t, i);
                o = new n(i, f, u);
                this._def = r.defs[f.defId];
                this._instance = r.instances[u.instanceId];
                i.dispatch({
                    type: "MERGE_EVENTS",
                    eventStore: r
                });
                i.emitter.trigger("eventChange", {
                    oldEvent: o,
                    event: this,
                    relatedEvents: ri(r, i, u),
                    revert: function() {
                        i.dispatch({
                            type: "RESET_EVENTS",
                            eventStore: e
                        })
                    }
                })
            }
        }, n.prototype.remove = function() {
            var n = this._context,
                t = pp(this);
            n.dispatch({
                type: "REMOVE_EVENTS",
                eventStore: t
            });
            n.emitter.trigger("eventRemove", {
                event: this,
                relatedEvents: [],
                revert: function() {
                    n.dispatch({
                        type: "MERGE_EVENTS",
                        eventStore: t
                    })
                }
            })
        }, Object.defineProperty(n.prototype, "source", {
            get: function() {
                var n = this._def.sourceId;
                return n ? new kt(this._context, this._context.getCurrentData().eventSources[n]) : null
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "start", {
            get: function() {
                return this._instance ? this._context.dateEnv.toDate(this._instance.range.start) : null
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "end", {
            get: function() {
                return this._instance && this._def.hasEnd ? this._context.dateEnv.toDate(this._instance.range.end) : null
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "startStr", {
            get: function() {
                var n = this._instance;
                return n ? this._context.dateEnv.formatIso(n.range.start, {
                    omitTime: this._def.allDay,
                    forcedTzo: n.forcedStartTzo
                }) : ""
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "endStr", {
            get: function() {
                var n = this._instance;
                return n && this._def.hasEnd ? this._context.dateEnv.formatIso(n.range.end, {
                    omitTime: this._def.allDay,
                    forcedTzo: n.forcedEndTzo
                }) : ""
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "id", {
            get: function() {
                return this._def.publicId
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "groupId", {
            get: function() {
                return this._def.groupId
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "allDay", {
            get: function() {
                return this._def.allDay
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "title", {
            get: function() {
                return this._def.title
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "url", {
            get: function() {
                return this._def.url
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "display", {
            get: function() {
                return this._def.ui.display || "auto"
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "startEditable", {
            get: function() {
                return this._def.ui.startEditable
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "durationEditable", {
            get: function() {
                return this._def.ui.durationEditable
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "constraint", {
            get: function() {
                return this._def.ui.constraints[0] || null
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "overlap", {
            get: function() {
                return this._def.ui.overlap
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "allow", {
            get: function() {
                return this._def.ui.allows[0] || null
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "backgroundColor", {
            get: function() {
                return this._def.ui.backgroundColor
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "borderColor", {
            get: function() {
                return this._def.ui.borderColor
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "textColor", {
            get: function() {
                return this._def.ui.textColor
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "classNames", {
            get: function() {
                return this._def.ui.classNames
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(n.prototype, "extendedProps", {
            get: function() {
                return this._def.extendedProps
            },
            enumerable: !1,
            configurable: !0
        }), n.prototype.toPlainObject = function(n) {
            n === void 0 && (n = {});
            var u = this._def,
                t = u.ui,
                f = this,
                e = f.startStr,
                o = f.endStr,
                r = {};
            return u.title && (r.title = u.title), e && (r.start = e), o && (r.end = o), u.publicId && (r.id = u.publicId), u.groupId && (r.groupId = u.groupId), u.url && (r.url = u.url), t.display && t.display !== "auto" && (r.display = t.display), n.collapseColor && t.backgroundColor && t.backgroundColor === t.borderColor ? r.color = t.backgroundColor : (t.backgroundColor && (r.backgroundColor = t.backgroundColor), t.borderColor && (r.borderColor = t.borderColor)), t.textColor && (r.textColor = t.textColor), t.classNames.length && (r.classNames = t.classNames), Object.keys(u.extendedProps).length && (n.collapseExtendedProps ? i(r, u.extendedProps) : r.extendedProps = u.extendedProps), r
        }, n.prototype.toJSON = function() {
            return this.toPlainObject()
        }, n
    }();
    hh = {};
    wp = function() {
        function n() {}
        return n.prototype.getMarkerYear = function(n) {
            return n.getUTCFullYear()
        }, n.prototype.getMarkerMonth = function(n) {
            return n.getUTCMonth()
        }, n.prototype.getMarkerDay = function(n) {
            return n.getUTCDate()
        }, n.prototype.arrayToMarker = function(n) {
            return d(n)
        }, n.prototype.markerToArray = function(n) {
            return gt(n)
        }, n
    }();
    grt("gregory", wp);
    bp = /^\s*(\d{4})(-?(\d{2})(-?(\d{2})([T ](\d{2}):?(\d{2})(:?(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/;
    var ch = function() {
        function n(n) {
            var t = this.timeZone = n.timeZone,
                i = t !== "local" && t !== "UTC";
            n.namedTimeZoneImpl && i && (this.namedTimeZoneImpl = new n.namedTimeZoneImpl(t));
            this.canComputeOffset = Boolean(!i || this.namedTimeZoneImpl);
            this.calendarSystem = nut(n.calendarSystem);
            this.locale = n.locale;
            this.weekDow = n.locale.week.dow;
            this.weekDoy = n.locale.week.doy;
            n.weekNumberCalculation === "ISO" && (this.weekDow = 1, this.weekDoy = 4);
            typeof n.firstDay == "number" && (this.weekDow = n.firstDay);
            typeof n.weekNumberCalculation == "function" && (this.weekNumberFunc = n.weekNumberCalculation);
            this.weekText = n.weekText != null ? n.weekText : n.locale.options.weekText;
            this.cmdFormatter = n.cmdFormatter;
            this.defaultSeparator = n.defaultSeparator
        }
        return n.prototype.createMarker = function(n) {
            var t = this.createMarkerMeta(n);
            return t === null ? null : t.marker
        }, n.prototype.createNowMarker = function() {
            return this.canComputeOffset ? this.timestampToMarker((new Date).valueOf()) : d(gv(new Date))
        }, n.prototype.createMarkerMeta = function(n) {
            if (typeof n == "string") return this.parse(n);
            var t = null;
            return (typeof n == "number" ? t = this.timestampToMarker(n) : n instanceof Date ? (n = n.valueOf(), isNaN(n) || (t = this.timestampToMarker(n))) : Array.isArray(n) && (t = d(n)), t === null || !ls(t)) ? null : {
                marker: t,
                isTimeUnspecified: !1,
                forcedTzo: null
            }
        }, n.prototype.parse = function(n) {
            var t = kp(n),
                i, r;
            return t === null ? null : (i = t.marker, r = null, t.timeZoneOffset !== null && (this.canComputeOffset ? i = this.timestampToMarker(i.valueOf() - t.timeZoneOffset * 6e4) : r = t.timeZoneOffset), {
                marker: i,
                isTimeUnspecified: t.isTimeUnspecified,
                forcedTzo: r
            })
        }, n.prototype.getYear = function(n) {
            return this.calendarSystem.getMarkerYear(n)
        }, n.prototype.getMonth = function(n) {
            return this.calendarSystem.getMarkerMonth(n)
        }, n.prototype.add = function(n, t) {
            var i = this.calendarSystem.markerToArray(n);
            return i[0] += t.years, i[1] += t.months, i[2] += t.days, i[6] += t.milliseconds, this.calendarSystem.arrayToMarker(i)
        }, n.prototype.subtract = function(n, t) {
            var i = this.calendarSystem.markerToArray(n);
            return i[0] -= t.years, i[1] -= t.months, i[2] -= t.days, i[6] -= t.milliseconds, this.calendarSystem.arrayToMarker(i)
        }, n.prototype.addYears = function(n, t) {
            var i = this.calendarSystem.markerToArray(n);
            return i[0] += t, this.calendarSystem.arrayToMarker(i)
        }, n.prototype.addMonths = function(n, t) {
            var i = this.calendarSystem.markerToArray(n);
            return i[1] += t, this.calendarSystem.arrayToMarker(i)
        }, n.prototype.diffWholeYears = function(n, t) {
            var i = this.calendarSystem;
            return ni(n) === ni(t) && i.getMarkerDay(n) === i.getMarkerDay(t) && i.getMarkerMonth(n) === i.getMarkerMonth(t) ? i.getMarkerYear(t) - i.getMarkerYear(n) : null
        }, n.prototype.diffWholeMonths = function(n, t) {
            var i = this.calendarSystem;
            return ni(n) === ni(t) && i.getMarkerDay(n) === i.getMarkerDay(t) ? i.getMarkerMonth(t) - i.getMarkerMonth(n) + (i.getMarkerYear(t) - i.getMarkerYear(n)) * 12 : null
        }, n.prototype.greatestWholeUnit = function(n, t) {
            var i = this.diffWholeYears(n, t);
            return i !== null ? {
                unit: "year",
                value: i
            } : (i = this.diffWholeMonths(n, t), i !== null) ? {
                unit: "month",
                value: i
            } : (i = dv(n, t), i !== null) ? {
                unit: "week",
                value: i
            } : (i = ar(n, t), i !== null) ? {
                unit: "day",
                value: i
            } : (i = ftt(n, t), lr(i)) ? {
                unit: "hour",
                value: i
            } : (i = ett(n, t), lr(i)) ? {
                unit: "minute",
                value: i
            } : (i = ott(n, t), lr(i)) ? {
                unit: "second",
                value: i
            } : {
                unit: "millisecond",
                value: t.valueOf() - n.valueOf()
            }
        }, n.prototype.countDurationsBetween = function(n, t, i) {
            var r;
            return i.years && (r = this.diffWholeYears(n, t), r !== null) ? r / nit(i) : i.months && (r = this.diffWholeMonths(n, t), r !== null) ? r / tit(i) : i.days && (r = ar(n, t), r !== null) ? r / ki(i) : (t.valueOf() - n.valueOf()) / g(i)
        }, n.prototype.startOf = function(n, t) {
            return t === "year" ? this.startOfYear(n) : t === "month" ? this.startOfMonth(n) : t === "week" ? this.startOfWeek(n) : t === "day" ? h(n) : t === "hour" ? stt(n) : t === "minute" ? htt(n) : t === "second" ? ctt(n) : null
        }, n.prototype.startOfYear = function(n) {
            return this.calendarSystem.arrayToMarker([this.calendarSystem.getMarkerYear(n), ])
        }, n.prototype.startOfMonth = function(n) {
            return this.calendarSystem.arrayToMarker([this.calendarSystem.getMarkerYear(n), this.calendarSystem.getMarkerMonth(n), ])
        }, n.prototype.startOfWeek = function(n) {
            return this.calendarSystem.arrayToMarker([this.calendarSystem.getMarkerYear(n), this.calendarSystem.getMarkerMonth(n), n.getUTCDate() - (n.getUTCDay() - this.weekDow + 7) % 7, ])
        }, n.prototype.computeWeekNumber = function(n) {
            return this.weekNumberFunc ? this.weekNumberFunc(this.toDate(n)) : ltt(n, this.weekDow, this.weekDoy)
        }, n.prototype.format = function(n, t, i) {
            return i === void 0 && (i = {}), t.format({
                marker: n,
                timeZoneOffset: i.forcedTzo != null ? i.forcedTzo : this.offsetForMarker(n)
            }, this)
        }, n.prototype.formatRange = function(n, t, i, r) {
            return r === void 0 && (r = {}), r.isEndExclusive && (t = dt(t, -1)), i.formatRange({
                marker: n,
                timeZoneOffset: r.forcedStartTzo != null ? r.forcedStartTzo : this.offsetForMarker(n)
            }, {
                marker: t,
                timeZoneOffset: r.forcedEndTzo != null ? r.forcedEndTzo : this.offsetForMarker(t)
            }, this, r.defaultSeparator)
        }, n.prototype.formatIso = function(n, t) {
            t === void 0 && (t = {});
            var i = null;
            return t.omitTimeZoneOffset || (i = t.forcedTzo != null ? t.forcedTzo : this.offsetForMarker(n)), bs(n, i, t.omitTime)
        }, n.prototype.timestampToMarker = function(n) {
            return this.timeZone === "local" ? d(gv(new Date(n))) : this.timeZone === "UTC" || !this.namedTimeZoneImpl ? new Date(n) : d(this.namedTimeZoneImpl.timestampToArray(n))
        }, n.prototype.offsetForMarker = function(n) {
            return this.timeZone === "local" ? -ny(gt(n)).getTimezoneOffset() : this.timeZone === "UTC" ? 0 : this.namedTimeZoneImpl ? this.namedTimeZoneImpl.offsetForArray(gt(n)) : null
        }, n.prototype.toDate = function(n, t) {
            return this.timeZone === "local" ? ny(gt(n)) : this.timeZone === "UTC" ? new Date(n.valueOf()) : this.namedTimeZoneImpl ? new Date(n.valueOf() - this.namedTimeZoneImpl.offsetForArray(gt(n)) * 6e4) : new Date(n.valueOf() - (t || 0))
        }, n
    }(),
        dp = [],
        lh = {
            code: "en",
            week: {
                dow: 0,
                doy: 4
            },
            direction: "ltr",
            buttonText: {
                prev: "prev",
                next: "next",
                prevYear: "prev year",
                nextYear: "next year",
                year: "year",
                today: "today",
                month: "month",
                week: "week",
                day: "day",
                list: "list"
            },
            weekText: "W",
            allDayText: "all-day",
            moreLinkText: "more",
            noEventsText: "No events to display"
        };
    iw = {
        startTime: "09:00",
        endTime: "17:00",
        daysOfWeek: [1, 2, 3, 4, 5],
        display: "inverse-background",
        classNames: "fc-non-business",
        groupId: "_businessHours"
    };
    ne = b();
    wh = function() {
        function n() {
            this.getKeysForEventDefs = f(this._getKeysForEventDefs);
            this.splitDateSelection = f(this._splitDateSpan);
            this.splitEventStore = f(this._splitEventStore);
            this.splitIndividualUi = f(this._splitIndividualUi);
            this.splitEventDrag = f(this._splitInteraction);
            this.splitEventResize = f(this._splitInteraction);
            this.eventUiBuilders = {}
        }
        return n.prototype.splitProps = function(n) {
            var s = this,
                i = this.getKeyInfo(n),
                r = this.getKeysForEventDefs(n.eventStore),
                h = this.splitDateSelection(n.dateSelection),
                c = this.splitIndividualUi(n.eventUiBases, r),
                l = this.splitEventStore(n.eventStore, r),
                a = this.splitEventDrag(n.eventDrag),
                v = this.splitEventResize(n.eventResize),
                u = {}, t;
            this.eventUiBuilders = ut(i, function(n, t) {
                return s.eventUiBuilders[t] || f(sut)
            });
            for (t in i) {
                var e = i[t],
                    o = l[t] || ne,
                    y = this.eventUiBuilders[t];
                u[t] = {
                    businessHours: e.businessHours || n.businessHours,
                    dateSelection: h[t] || null,
                    eventStore: o,
                    eventUiBases: y(n.eventUiBases[""], e.ui, c[t]),
                    eventSelection: o.instances[n.eventSelection] ? n.eventSelection : "",
                    eventDrag: a[t] || null,
                    eventResize: v[t] || null
                }
            }
            return u
        }, n.prototype._splitDateSpan = function(n) {
            var r = {}, u, t, i, f;
            if (n) for (u = this.getKeysForDateSpan(n), t = 0, i = u; t < i.length; t++) f = i[t], r[f] = n;
            return r
        }, n.prototype._getKeysForEventDefs = function(n) {
            var t = this;
            return ut(n.defs, function(n) {
                return t.getKeysForEventDef(n)
            })
        }, n.prototype._splitEventStore = function(n, t) {
            var l = n.defs,
                a = n.instances,
                r = {}, u, f, o, s, h, e, c, i;
            for (u in l) for (f = 0, o = t[u]; f < o.length; f++) i = o[f], r[i] || (r[i] = b()), r[i].defs[u] = l[u];
            for (s in a) for (h = a[s], e = 0, c = t[h.defId]; e < c.length; e++) i = c[e], r[i] && (r[i].instances[s] = h);
            return r
        }, n.prototype._splitIndividualUi = function(n, t) {
            var r = {}, i, u, e, f;
            for (i in n) if (i) for (u = 0, e = t[i]; u < e.length; u++) f = e[u], r[f] || (r[f] = {}), r[f][i] = n[i];
            return r
        }, n.prototype._splitInteraction = function(n) {
            var i = {}, t;
            if (n) {
                var r = this._splitEventStore(n.affectedEvents, this._getKeysForEventDefs(n.affectedEvents)),
                    e = this._getKeysForEventDefs(n.mutatedEvents),
                    u = this._splitEventStore(n.mutatedEvents, e),
                    f = function(t) {
                        i[t] || (i[t] = {
                            affectedEvents: r[t] || ne,
                            mutatedEvents: u[t] || ne,
                            isEvent: n.isEvent
                        })
                    };
                for (t in r) f(t);
                for (t in u) f(t)
            }
            return i
        }, n
    }();
    ie = null;
    tr = function() {
        function n() {
            this.handlers = {};
            this.thisContext = null
        }
        return n.prototype.setThisContext = function(n) {
            this.thisContext = n
        }, n.prototype.setOptions = function(n) {
            this.options = n
        }, n.prototype.on = function(n, t) {
            put(this.handlers, n, t)
        }, n.prototype.off = function(n, t) {
            wut(this.handlers, n, t)
        }, n.prototype.trigger = function(n) {
            for (var i, r, f, u = [], t = 1; t < arguments.length; t++) u[t - 1] = arguments[t];
            var e = this.handlers[n] || [],
                o = this.options && this.options[n],
                s = [].concat(o || [], e);
            for (i = 0, r = s; i < r.length; i++) f = r[i], f.apply(this.thisContext, u)
        }, n.prototype.hasHandlers = function(n) {
            return this.handlers[n] && this.handlers[n].length || this.options && this.options[n]
        }, n
    }();
    var ir = function() {
        function n(n, t, i, r) {
            this.els = t;
            var u = this.originClientRect = n.getBoundingClientRect();
            i && this.buildElHorizontals(u.left);
            r && this.buildElVerticals(u.top)
        }
        return n.prototype.buildElHorizontals = function(n) {
            for (var e, i, r = [], u = [], t = 0, f = this.els; t < f.length; t++) e = f[t], i = e.getBoundingClientRect(), r.push(i.left - n), u.push(i.right - n);
            this.lefts = r;
            this.rights = u
        }, n.prototype.buildElVerticals = function(n) {
            for (var e, i, r = [], u = [], t = 0, f = this.els; t < f.length; t++) e = f[t], i = e.getBoundingClientRect(), r.push(i.top - n), u.push(i.bottom - n);
            this.tops = r;
            this.bottoms = u
        }, n.prototype.leftToIndex = function(n) {
            for (var i = this, r = i.lefts, u = i.rights, f = r.length, t = 0; t < f; t += 1) if (n >= r[t] && n < u[t]) return t;
            return undefined
        }, n.prototype.topToIndex = function(n) {
            for (var i = this, r = i.tops, u = i.bottoms, f = r.length, t = 0; t < f; t += 1) if (n >= r[t] && n < u[t]) return t;
            return undefined
        }, n.prototype.getWidth = function(n) {
            return this.rights[n] - this.lefts[n]
        }, n.prototype.getHeight = function(n) {
            return this.bottoms[n] - this.tops[n]
        }, n
    }(),
        ue = function() {
            function n() {}
            return n.prototype.getMaxScrollTop = function() {
                return this.getScrollHeight() - this.getClientHeight()
            }, n.prototype.getMaxScrollLeft = function() {
                return this.getScrollWidth() - this.getClientWidth()
            }, n.prototype.canScrollVertically = function() {
                return this.getMaxScrollTop() > 0
            }, n.prototype.canScrollHorizontally = function() {
                return this.getMaxScrollLeft() > 0
            }, n.prototype.canScrollUp = function() {
                return this.getScrollTop() > 0
            }, n.prototype.canScrollDown = function() {
                return this.getScrollTop() < this.getMaxScrollTop()
            }, n.prototype.canScrollLeft = function() {
                return this.getScrollLeft() > 0
            }, n.prototype.canScrollRight = function() {
                return this.getScrollLeft() < this.getMaxScrollLeft()
            }, n
        }(),
        yw = function(n) {
            function t(t) {
                var i = n.call(this) || this;
                return i.el = t, i
            }
            return u(t, n), t.prototype.getScrollTop = function() {
                return this.el.scrollTop
            }, t.prototype.getScrollLeft = function() {
                return this.el.scrollLeft
            }, t.prototype.setScrollTop = function(n) {
                this.el.scrollTop = n
            }, t.prototype.setScrollLeft = function(n) {
                this.el.scrollLeft = n
            }, t.prototype.getScrollWidth = function() {
                return this.el.scrollWidth
            }, t.prototype.getScrollHeight = function() {
                return this.el.scrollHeight
            }, t.prototype.getClientHeight = function() {
                return this.el.clientHeight
            }, t.prototype.getClientWidth = function() {
                return this.el.clientWidth
            }, t
        }(ue),
        pw = function(n) {
            function t() {
                return n !== null && n.apply(this, arguments) || this
            }
            return u(t, n), t.prototype.getScrollTop = function() {
                return window.pageYOffset
            }, t.prototype.getScrollLeft = function() {
                return window.pageXOffset
            }, t.prototype.setScrollTop = function(n) {
                window.scroll(window.pageXOffset, n)
            }, t.prototype.setScrollLeft = function(n) {
                window.scroll(n, window.pageYOffset)
            }, t.prototype.getScrollWidth = function() {
                return document.documentElement.scrollWidth
            }, t.prototype.getScrollHeight = function() {
                return document.documentElement.scrollHeight
            }, t.prototype.getClientHeight = function() {
                return document.documentElement.clientHeight
            }, t.prototype.getClientWidth = function() {
                return document.documentElement.clientWidth
            }, t
        }(ue),
        vi = function() {
            function n(n) {
                this.iconOverrideOption && this.setIconOverride(n[this.iconOverrideOption])
            }
            return n.prototype.setIconOverride = function(n) {
                var t, r;
                if (typeof n == "object" && n) {
                    t = i({}, this.iconClasses);
                    for (r in n) t[r] = this.applyIconOverridePrefix(n[r]);
                    this.iconClasses = t
                } else n === !1 && (this.iconClasses = {})
            }, n.prototype.applyIconOverridePrefix = function(n) {
                var t = this.iconOverridePrefix;
                return t && n.indexOf(t) !== 0 && (n = t + n), n
            }, n.prototype.getClass = function(n) {
                return this.classes[n] || ""
            }, n.prototype.getIconClass = function(n, t) {
                var i;
                return (i = t && this.rtlIconClasses ? this.rtlIconClasses[n] || this.iconClasses[n] : this.iconClasses[n], i) ? this.baseIconClass + " " + i : ""
            }, n.prototype.getCustomButtonIconClass = function(n) {
                var t;
                return this.iconOverrideCustomButtonOption && (t = n[this.iconOverrideCustomButtonOption], t) ? this.baseIconClass + " " + this.applyIconOverridePrefix(t) : ""
            }, n
        }();
    if (vi.prototype.classes = {}, vi.prototype.iconClasses = {}, vi.prototype.baseIconClass = "", vi.prototype.iconOverridePrefix = "", typeof FCalendar570VDom == "undefined") throw new Error("Please import the top-level fullcalendar lib before attempting to import a plugin.");
    var fe = FCalendar570VDom.Component,
        t = FCalendar570VDom.createElement,
        ww = FCalendar570VDom.render,
        p = FCalendar570VDom.createRef,
        a = FCalendar570VDom.Fragment,
        dh = FCalendar570VDom.createContext,
        bw = FCalendar570VDom.createPortal,
        gh = FCalendar570VDom.flushToDom,
        kw = FCalendar570VDom.unmountComponentAtNode,
        dw = function() {
            function n(n, t, r, u) {
                var f = this;
                this.execFunc = n;
                this.emitter = t;
                this.scrollTime = r;
                this.scrollTimeReset = u;
                this.handleScrollRequest = function(n) {
                    f.queuedRequest = i({}, f.queuedRequest || {}, n);
                    f.drain()
                };
                t.on("_scrollRequest", this.handleScrollRequest);
                this.fireInitialScroll()
            }
            return n.prototype.detach = function() {
                this.emitter.off("_scrollRequest", this.handleScrollRequest)
            }, n.prototype.update = function(n) {
                n && this.scrollTimeReset ? this.fireInitialScroll() : this.drain()
            }, n.prototype.fireInitialScroll = function() {
                this.handleScrollRequest({
                    time: this.scrollTime
                })
            }, n.prototype.drain = function() {
                this.queuedRequest && this.execFunc(this.queuedRequest) && (this.queuedRequest = null)
            }, n
        }(),
        st = dh({});
    fu = function(n) {
        function t() {
            return n !== null && n.apply(this, arguments) || this
        }
        return u(t, n), t.prototype.shouldComponentUpdate = function(n, t) {
            return this.debug && console.log(ys(n, this.props), ys(t, this.state)), !ps(this.props, n, this.propEquality) || !ps(this.state, t, this.stateEquality)
        }, t.addPropsEquality = kut, t.addStateEquality = dut, t.contextType = st, t
    }(fe);
    fu.prototype.propEquality = {};
    fu.prototype.stateEquality = {};
    s = function(n) {
        function t() {
            return n !== null && n.apply(this, arguments) || this
        }
        return u(t, n), t.contextType = st, t
    }(fu);
    it = function(n) {
        function t() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.uid = hi(), t
        }
        return u(t, n), t.prototype.prepareHits = function() {}, t.prototype.queryHit = function() {
            return null
        }, t.prototype.isValidSegDownEl = function(n) {
            return !this.props.eventDrag && !this.props.eventResize && !w(n, ".fc-event-mirror")
        }, t.prototype.isValidDateDownEl = function(n) {
            return !w(n, ".fc-event:not(.fc-bg-event)") && !w(n, ".fc-more-link") && !w(n, "a[data-navlink]") && !w(n, ".fc-popover")
        }, t
    }(s);
    yt = function(n) {
        function t() {
            return n !== null && n.apply(this, arguments) || this
        }
        return u(t, n), t
    }(vi);
    yt.prototype.classes = {
        root: "fc-theme-standard",
        tableCellShaded: "fc-cell-shaded",
        buttonGroup: "fc-button-group",
        button: "fc-button fc-button-primary",
        buttonActive: "fc-button-active"
    };
    yt.prototype.baseIconClass = "fc-icon";
    yt.prototype.iconClasses = {
        close: "fc-icon-x",
        prev: "fc-icon-chevron-left",
        next: "fc-icon-chevron-right",
        prevYear: "fc-icon-chevrons-left",
        nextYear: "fc-icon-chevrons-right"
    };
    yt.prototype.rtlIconClasses = {
        prev: "fc-icon-chevron-right",
        next: "fc-icon-chevron-left",
        prevYear: "fc-icon-chevrons-right",
        nextYear: "fc-icon-chevrons-left"
    };
    yt.prototype.iconOverrideOption = "buttonIcons";
    yt.prototype.iconOverrideCustomButtonOption = "icon";
    yt.prototype.iconOverridePrefix = "fc-icon-";
    k = function(n) {
        function i() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.rootElRef = p(), t.handleRootEl = function(n) {
                tt(t.rootElRef, n);
                t.props.elRef && tt(t.props.elRef, n)
            }, t
        }
        return u(i, n), i.prototype.render = function() {
            var r = this,
                n = this.props,
                i = n.hookProps;
            return t(eu, {
                hookProps: i,
                didMount: n.didMount,
                willUnmount: n.willUnmount,
                elRef: this.handleRootEl
            }, function(u) {
                return t(tc, {
                    hookProps: i,
                    content: n.content,
                    defaultContent: n.defaultContent,
                    backupElRef: r.rootElRef
                }, function(t, r) {
                    return n.children(u, nb(n.classNames, i), t, r)
                })
            })
        }, i
    }(s);
    ee = dh(0);
    gw = function(n) {
        function t() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.innerElRef = p(), t
        }
        return u(t, n), t.prototype.render = function() {
            return this.props.children(this.innerElRef, this.renderInnerContent())
        }, t.prototype.componentDidMount = function() {
            this.updateCustomContent()
        }, t.prototype.componentDidUpdate = function() {
            this.updateCustomContent()
        }, t.prototype.componentWillUnmount = function() {
            this.customContentInfo && this.customContentInfo.destroy && this.customContentInfo.destroy()
        }, t.prototype.renderInnerContent = function() {
            var f = this.context.pluginHooks.contentTypeHandlers,
                e = this,
                u = e.props,
                t = e.customContentInfo,
                h = u.content,
                n = tb(h, u.hookProps),
                o = null,
                r, s;
            if (n === undefined && (n = tb(u.defaultContent, u.hookProps)), n !== undefined) {
                if (t) t.contentVal = n[t.contentKey];
                else if (typeof n == "object") for (r in f) if (n[r] !== undefined) {
                    s = f[r]();
                    t = this.customContentInfo = i({
                        contentKey: r,
                        contentVal: n[r]
                    }, s);
                    break
                }
                o = t ? [] : n
            }
            return o
        }, t.prototype.updateCustomContent = function() {
            this.customContentInfo && this.customContentInfo.render(this.innerElRef.current || this.props.backupElRef.current, this.customContentInfo.contentVal)
        }, t
    }(s);
    eu = function(n) {
        function t() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.handleRootEl = function(n) {
                t.rootEl = n;
                t.props.elRef && tt(t.props.elRef, n)
            }, t
        }
        return u(t, n), t.prototype.render = function() {
            return this.props.children(this.handleRootEl)
        }, t.prototype.componentDidMount = function() {
            var n = this.props.didMount;
            n && n(i(i({}, this.props.hookProps), {
                el: this.rootEl
            }))
        }, t.prototype.componentWillUnmount = function() {
            var n = this.props.willUnmount;
            n && n(i(i({}, this.props.hookProps), {
                el: this.rootEl
            }))
        }, t
    }(s);
    ui = function(n) {
        function i() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.normalizeClassNames = ic(), t
        }
        return u(i, n), i.prototype.render = function() {
            var r = this,
                n = r.props,
                u = r.context,
                i = u.options,
                f = {
                    view: u.viewApi
                }, e = this.normalizeClassNames(i.viewClassNames, f);
            return t(eu, {
                hookProps: f,
                didMount: i.viewDidMount,
                willUnmount: i.viewWillUnmount,
                elRef: n.elRef
            }, function(t) {
                return n.children(t, ["fc-" + n.viewSpec.type + "-view", "fc-view"].concat(e))
            })
        }, i
    }(s);
    rc = {};
    oe = function() {
        function n(n) {
            this.props = n;
            this.nowDate = ru(n.nowInput, n.dateEnv);
            this.initHiddenDays()
        }
        return n.prototype.buildPrev = function(n, t, i) {
            var r = this.props.dateEnv,
                u = r.subtract(r.startOf(t, n.currentRangeUnit), n.dateIncrement);
            return this.build(u, -1, i)
        }, n.prototype.buildNext = function(n, t, i) {
            var r = this.props.dateEnv,
                u = r.add(r.startOf(t, n.currentRangeUnit), n.dateIncrement);
            return this.build(u, 1, i)
        }, n.prototype.build = function(n, t, i) {
            i === void 0 && (i = !0);
            var o = this.props,
                f, r, s, e, u, h;
            return f = this.buildValidRange(), f = this.trimHiddenDays(f), i && (n = srt(n, f)), r = this.buildCurrentRangeInfo(n, t), s = /^(year|month|week|day)$/.test(r.unit), e = this.buildRenderRange(this.trimHiddenDays(r.range), r.unit, s), e = this.trimHiddenDays(e), u = e, o.showNonCurrentDates || (u = ii(u, r.range)), u = this.adjustActiveRange(u), u = ii(u, f), h = wf(r.range, f), {
                validRange: f,
                currentRange: r.range,
                currentRangeUnit: r.unit,
                isRangeAllDay: s,
                activeRange: u,
                renderRange: e,
                slotMinTime: o.slotMinTime,
                slotMaxTime: o.slotMaxTime,
                isValid: h,
                dateIncrement: this.buildDateIncrement(r.duration)
            }
        }, n.prototype.buildValidRange = function() {
            var n = this.props.validRangeInput,
                t = typeof n == "function" ? n.call(this.props.calendarApi, this.nowDate) : n;
            return this.refineRange(t) || {
                start: null,
                end: null
            }
        }, n.prototype.buildCurrentRangeInfo = function(n, t) {
            var f = this.props,
                u = null,
                i = null,
                r = null,
                e;
            return f.duration ? (u = f.duration, i = f.durationUnit, r = this.buildRangeFromDuration(n, t, u, i)) : (e = this.props.dayCount) ? (i = "day", r = this.buildRangeFromDayCount(n, t, e)) : (r = this.buildCustomVisibleRange(n)) ? i = f.dateEnv.greatestWholeUnit(r.start, r.end).unit : (u = this.getFallbackDuration(), i = uf(u).unit, r = this.buildRangeFromDuration(n, t, u, i)), {
                duration: u,
                unit: i,
                range: r
            }
        }, n.prototype.getFallbackDuration = function() {
            return o({
                day: 1
            })
        }, n.prototype.adjustActiveRange = function(n) {
            var r = this.props,
                u = r.dateEnv,
                o = r.usesMinMaxTime,
                f = r.slotMinTime,
                e = r.slotMaxTime,
                i = n.start,
                t = n.end;
            return o && (ki(f) < 0 && (i = h(i), i = u.add(i, f)), ki(e) > 1 && (t = h(t), t = y(t, -1), t = u.add(t, e))), {
                start: i,
                end: t
            }
        }, n.prototype.buildRangeFromDuration = function(n, t, i, r) {
            function a() {
                u = c.startOf(n, e);
                l = c.add(u, i);
                o = {
                    start: u,
                    end: l
                }
            }
            var s = this.props,
                c = s.dateEnv,
                e = s.dateAlignment,
                u, l, o, f;
            return e || (f = this.props.dateIncrement, e = f ? g(f) < g(i) ? uf(f).unit : r : r), ki(i) <= 1 && this.isHiddenDay(u) && (u = this.skipHiddenDays(u, t), u = h(u)), a(), this.trimHiddenDays(o) || (n = this.skipHiddenDays(n, t), a()), o
        }, n.prototype.buildRangeFromDayCount = function(n, t, i) {
            var f = this.props,
                s = f.dateEnv,
                e = f.dateAlignment,
                o = 0,
                r = n,
                u;
            e && (r = s.startOf(r, e));
            r = h(r);
            r = this.skipHiddenDays(r, t);
            u = r;
            do u = y(u, 1), this.isHiddenDay(u) || (o += 1);
            while (o < i);
            return {
                start: r,
                end: u
            }
        }, n.prototype.buildCustomVisibleRange = function(n) {
            var i = this.props,
                r = i.visibleRangeInput,
                u = typeof r == "function" ? r.call(i.calendarApi, i.dateEnv.toDate(n)) : r,
                t = this.refineRange(u);
            return t && (t.start == null || t.end == null) ? null : t
        }, n.prototype.buildRenderRange = function(n) {
            return n
        }, n.prototype.buildDateIncrement = function(n) {
            var t = this.props.dateIncrement,
                i;
            return t ? t : (i = this.props.dateAlignment) ? o(1, i) : n ? n : o({
                days: 1
            })
        }, n.prototype.refineRange = function(n) {
            if (n) {
                var t = ert(n, this.props.dateEnv);
                return t && (t = pf(t)), t
            }
            return null
        }, n.prototype.initHiddenDays = function() {
            var t = this.props.hiddenDays || [],
                i = [],
                r = 0,
                n;
            for (this.props.weekends === !1 && t.push(0, 6), n = 0; n < 7; n += 1)(i[n] = t.indexOf(n) !== -1) || (r += 1);
            if (!r) throw new Error("invalid hiddenDays");
            this.isHiddenDayHash = i
        }, n.prototype.trimHiddenDays = function(n) {
            var t = n.start,
                i = n.end;
            return (t && (t = this.skipHiddenDays(t)), i && (i = this.skipHiddenDays(i, -1, !0)), t == null || i == null || t < i) ? {
                start: t,
                end: i
            } : null
        }, n.prototype.isHiddenDay = function(n) {
            return n instanceof Date && (n = n.getUTCDay()), this.isHiddenDayHash[n]
        }, n.prototype.skipHiddenDays = function(n, t, i) {
            for (t === void 0 && (t = 1), i === void 0 && (i = !1); this.isHiddenDayHash[(n.getUTCDay() + (i ? t : 0) + 7) % 7];) n = y(n, t);
            return n
        }, n
    }();
    var aet = {
        ignoreRange: !0,
        parseMeta: function(n) {
            return Array.isArray(n.events) ? n.events : null
        },
        fetch: function(n, t) {
            t({
                rawEvents: n.eventSource.meta
            })
        }
    }, vet = nt({
        eventSourceDefs: [aet]
    }),
        yet = {
            parseMeta: function(n) {
                return typeof n.events == "function" ? n.events : null
            },
            fetch: function(n, t, i) {
                var r = n.context.dateEnv,
                    u = n.eventSource.meta;
                vw(u.bind(null, cp(n.range, r)), function(n) {
                    t({
                        rawEvents: n
                    })
                }, i)
            }
        }, pet = nt({
            eventSourceDefs: [yet]
        });
    var bet = {
        method: String,
        extraParams: r,
        startParam: String,
        endParam: String,
        timeZoneParam: String
    }, ket = {
        parseMeta: function(n) {
            return n.url && (n.format === "json" || !n.format) ? {
                url: n.url,
                format: "json",
                method: (n.method || "GET").toUpperCase(),
                extraParams: n.extraParams,
                startParam: n.startParam,
                endParam: n.endParam,
                timeZoneParam: n.timeZoneParam
            } : null
        },
        fetch: function(n, t, i) {
            var r = n.eventSource.meta,
                u = get(r, n.range, n.context);
            fc(r.method, r.url, u, function(n, i) {
                t({
                    rawEvents: n,
                    xhr: i
                })
            }, function(n, t) {
                i({
                    message: n,
                    xhr: t
                })
            })
        }
    }, det = nt({
        eventSourceRefiners: bet,
        eventSourceDefs: [ket]
    });
    var not = {
        daysOfWeek: r,
        startTime: o,
        endTime: o,
        duration: o,
        startRecur: r,
        endRecur: r
    }, tot = {
        parse: function(n, t) {
            if (n.daysOfWeek || n.startTime || n.endTime || n.startRecur || n.endRecur) {
                var r = {
                    daysOfWeek: n.daysOfWeek || null,
                    startTime: n.startTime || null,
                    endTime: n.endTime || null,
                    startRecur: n.startRecur ? t.createMarker(n.startRecur) : null,
                    endRecur: n.endRecur ? t.createMarker(n.endRecur) : null
                }, i = void 0;
                return n.duration && (i = n.duration), !i && n.startTime && n.endTime && (i = gtt(n.endTime, n.startTime)), {
                    allDayGuess: Boolean(!n.startTime && !n.endTime),
                    duration: i,
                    typeData: r
                }
            }
            return null
        },
        expand: function(n, t, i) {
            var r = ii(t, {
                start: n.startRecur,
                end: n.endRecur
            });
            return r ? rot(n.daysOfWeek, n.startTime, r, i) : []
        }
    }, iot = nt({
        recurringTypes: [tot],
        eventRefiners: not
    });
    ab = nt({
        optionChangeHandlers: {
            events: function(n, t) {
                vb([n], t)
            },
            eventSources: vb
        }
    });
    se = [vet, pet, det, iot, ab, nt({
        isLoadingFuncs: [function(n) {
            return rb(n.eventSources)
        }, ],
        contentTypeHandlers: {
            html: function() {
                return {
                    render: eot
                }
            },
            domNodes: function() {
                return {
                    render: oot
                }
            }
        },
        propSetHandlers: {
            dateProfile: uot,
            eventStore: fot
        }
    }), ];
    ou = function() {
        function n(n) {
            this.drainedOption = n;
            this.isRunning = !1;
            this.isDirty = !1;
            this.pauseDepths = {};
            this.timeoutId = 0
        }
        return n.prototype.request = function(n) {
            this.isDirty = !0;
            this.isPaused() || (this.clearTimeout(), n == null ? this.tryDrain() : this.timeoutId = setTimeout(this.tryDrain.bind(this), n))
        }, n.prototype.pause = function(n) {
            n === void 0 && (n = "");
            var t = this.pauseDepths;
            t[n] = (t[n] || 0) + 1;
            this.clearTimeout()
        }, n.prototype.resume = function(n, t) {
            var i, r;
            n === void 0 && (n = "");
            i = this.pauseDepths;
            n in i && (t ? delete i[n] : (i[n] -= 1, r = i[n], r <= 0 && delete i[n]), this.tryDrain())
        }, n.prototype.isPaused = function() {
            return Object.keys(this.pauseDepths).length
        }, n.prototype.tryDrain = function() {
            if (!this.isRunning && !this.isPaused()) {
                for (this.isRunning = !0; this.isDirty;) this.isDirty = !1, this.drained();
                this.isRunning = !1
            }
        }, n.prototype.clear = function() {
            this.clearTimeout();
            this.isDirty = !1;
            this.pauseDepths = {}
        }, n.prototype.clearTimeout = function() {
            this.timeoutId && (clearTimeout(this.timeoutId), this.timeoutId = 0)
        }, n.prototype.drained = function() {
            this.drainedOption && this.drainedOption()
        }, n
    }();
    yb = function() {
        function n(n, t) {
            this.runTaskOption = n;
            this.drainedOption = t;
            this.queue = [];
            this.delayedRunner = new ou(this.drain.bind(this))
        }
        return n.prototype.request = function(n, t) {
            this.queue.push(n);
            this.delayedRunner.request(t)
        }, n.prototype.pause = function(n) {
            this.delayedRunner.pause(n)
        }, n.prototype.resume = function(n, t) {
            this.delayedRunner.resume(n, t)
        }, n.prototype.drain = function() {
            for (var i = this.queue, t, n; i.length;) {
                for (t = [], n = void 0; n = i.shift();) this.runTask(n), t.push(n);
                this.drained(t)
            }
        }, n.prototype.runTask = function(n) {
            this.runTaskOption && this.runTaskOption(n)
        }, n.prototype.drained = function(n) {
            this.drainedOption && this.drainedOption(n)
        }, n
    }();
    he = function() {
        function n(n) {
            var v = this,
                u, e, r, o, l, w, h, a, k;
            this.computeOptionsData = f(this._computeOptionsData);
            this.computeCurrentViewData = f(this._computeCurrentViewData);
            this.organizeRawLocales = f(gp);
            this.buildLocale = f(ah);
            this.buildPluginHooks = nft();
            this.buildDateEnv = f(cot);
            this.buildTheme = f(lot);
            this.parseToolbars = f(het);
            this.buildViewSpecs = f(eft);
            this.buildDateProfileGenerator = wr(aot);
            this.buildViewApi = f(vot);
            this.buildViewUiProps = wr(wot);
            this.buildEventUiBySource = f(yot, ft);
            this.buildEventUiBases = f(pot);
            this.parseContextBusinessHours = wr(bot);
            this.buildTitle = f(sot);
            this.emitter = new tr;
            this.actionRunner = new yb(this._handleAction.bind(this), this.updateData.bind(this));
            this.currentCalendarOptionsInput = {};
            this.currentCalendarOptionsRefined = {};
            this.currentViewOptionsInput = {};
            this.currentViewOptionsRefined = {};
            this.currentCalendarOptionsRefiners = {};
            this.getCurrentData = function() {
                return v.data
            };
            this.dispatch = function(n) {
                v.actionRunner.request(n)
            };
            this.props = n;
            this.actionRunner.pause();
            var c = {}, t = this.computeOptionsData(n.optionOverrides, c, n.calendarApi),
                y = t.calendarOptions.initialView || t.pluginHooks.initialView,
                p = this.computeCurrentViewData(y, t, n.optionOverrides, c);
            for (n.calendarApi.currentDataManager = this, this.emitter.setThisContext(n.calendarApi), this.emitter.setOptions(p.options), u = drt(t.calendarOptions, t.dateEnv), e = p.dateProfileGenerator.build(u), et(e.activeRange, u) || (u = e.currentRange.start), r = {
                dateEnv: t.dateEnv,
                options: t.calendarOptions,
                pluginHooks: t.pluginHooks,
                calendarApi: n.calendarApi,
                dispatch: this.dispatch,
                emitter: this.emitter,
                getCurrentData: this.getCurrentData
            }, o = 0, l = t.pluginHooks.contextInit; o < l.length; o++) w = l[o], w(r);
            var d = aft(t.calendarOptions, e, r),
                s = {
                    dynamicOptionOverrides: c,
                    currentViewType: y,
                    currentDate: u,
                    dateProfile: e,
                    businessHours: this.parseContextBusinessHours(r),
                    eventSources: d,
                    eventUiBases: {},
                    eventStore: b(),
                    renderableEventStore: b(),
                    dateSelection: null,
                    eventSelection: "",
                    eventDrag: null,
                    eventResize: null,
                    selectionConfig: this.buildViewUiProps(r).selectionConfig
                }, g = i(i({}, r), s);
            for (h = 0, a = t.pluginHooks.reducers; h < a.length; h++) k = a[h], i(s, k(null, null, g));
            ec(s, r) && this.emitter.trigger("loading", !0);
            this.state = s;
            this.updateData();
            this.actionRunner.resume()
        }
        return n.prototype.resetOptions = function(n, t) {
            var r = this.props;
            r.optionOverrides = t ? i(i({}, r.optionOverrides), n) : n;
            this.actionRunner.request({
                type: "NOTHING"
            })
        }, n.prototype._handleAction = function(n) {
            var v = this,
                r = v.props,
                t = v.state,
                o = v.emitter,
                y = cft(t.dynamicOptionOverrides, n),
                s = this.computeOptionsData(r.optionOverrides, y, r.calendarApi),
                d = hft(t.currentViewType, n),
                h = this.computeCurrentViewData(d, s, r.optionOverrides, y),
                a, w, tt, b, k;
            r.calendarApi.currentDataManager = this;
            o.setThisContext(r.calendarApi);
            o.setOptions(h.options);
            var f = {
                dateEnv: s.dateEnv,
                options: s.calendarOptions,
                pluginHooks: s.pluginHooks,
                calendarApi: r.calendarApi,
                dispatch: this.dispatch,
                emitter: o,
                getCurrentData: this.getCurrentData
            }, e = t.currentDate,
                u = t.dateProfile;
            this.data && this.data.dateProfileGenerator !== h.dateProfileGenerator && (u = h.dateProfileGenerator.build(e));
            e = krt(e, n);
            u = lft(u, n, e, h.dateProfileGenerator);
            et(u.currentRange, e) || (e = u.currentRange.start);
            var c = vft(t.eventSources, n, u, f),
                p = gft(t.eventStore, n, c, u, f),
                it = rb(c),
                g = it && !h.options.progressiveEventRendering ? t.renderableEventStore || p : p,
                nt = this.buildViewUiProps(f),
                rt = nt.eventUiSingleBase,
                ut = nt.selectionConfig,
                ft = this.buildEventUiBySource(c),
                ot = this.buildEventUiBases(g.defs, rt, ft),
                l = {
                    dynamicOptionOverrides: y,
                    currentViewType: d,
                    currentDate: e,
                    dateProfile: u,
                    eventSources: c,
                    eventStore: p,
                    renderableEventStore: g,
                    selectionConfig: ut,
                    eventUiBases: ot,
                    businessHours: this.parseContextBusinessHours(f),
                    dateSelection: fet(t.dateSelection, n),
                    eventSelection: eet(t.eventSelection, n),
                    eventDrag: oet(t.eventDrag, n),
                    eventResize: set(t.eventResize, n)
                }, st = i(i({}, f), l);
            for (a = 0, w = s.pluginHooks.reducers; a < w.length; a++) tt = w[a], i(l, tt(t, n, st));
            if (b = ec(t, f), k = ec(l, f), !b && k ? o.trigger("loading", !0) : b && !k && o.trigger("loading", !1), this.state = l, r.onAction) r.onAction(n)
        }, n.prototype.updateData = function() {
            var h = this,
                r = h.props,
                n = h.state,
                s = this.data,
                u = this.computeOptionsData(r.optionOverrides, n.dynamicOptionOverrides, r.calendarApi),
                c = this.computeCurrentViewData(n.currentViewType, u, r.optionOverrides, n.dynamicOptionOverrides),
                t = this.data = i(i(i({
                    viewTitle: this.buildTitle(n.dateProfile, c.options, u.dateEnv),
                    calendarApi: r.calendarApi,
                    dispatch: this.dispatch,
                    emitter: this.emitter,
                    getCurrentData: this.getCurrentData
                }, u), c), n),
                l = u.pluginHooks.optionChangeHandlers,
                e = s && s.calendarOptions,
                o = u.calendarOptions,
                f;
            if (e && e !== o) {
                e.timeZone !== o.timeZone && (n.eventSources = t.eventSources = yft(t.eventSources, n.dateProfile, t), n.eventStore = t.eventStore = ret(t.eventStore, s.dateEnv, t.dateEnv));
                for (f in l) e[f] !== o[f] && l[f](o[f], t)
            }
            if (r.onData) r.onData(t)
        }, n.prototype._computeOptionsData = function(n, t, i) {
            var u = this.processRawCalendarOptions(n, t),
                r = u.refinedOptions,
                f = u.pluginHooks,
                e = u.localeDefaults,
                o = u.availableLocaleData,
                c = u.extra;
            pb(c);
            var l = this.buildDateEnv(r.timeZone, r.locale, r.weekNumberCalculation, r.firstDay, r.weekText, f, o, r.defaultRangeSeparator),
                s = this.buildViewSpecs(f.views, n, t, e),
                h = this.buildTheme(r, f),
                a = this.parseToolbars(r, n, h, s, i);
            return {
                calendarOptions: r,
                pluginHooks: f,
                dateEnv: l,
                viewSpecs: s,
                theme: h,
                toolbarConfig: a,
                localeDefaults: e,
                availableRawLocales: o.map
            }
        }, n.prototype.processRawCalendarOptions = function(n, t) {
            var h = nh([vt, n, t, ]),
                y = h.locales,
                p = h.locale,
                e = this.organizeRawLocales(y),
                w = e.map,
                c = this.buildLocale(p || e.defaultCode, w).options,
                o = this.buildPluginHooks(n.plugins || [], se),
                l = this.currentCalendarOptionsRefiners = i(i(i(i(i({}, ds), ay), vy), o.listenerRefiners), o.optionRefiners),
                a = {}, u = nh([vt, c, n, t, ]),
                s = {}, f = this.currentCalendarOptionsInput,
                b = this.currentCalendarOptionsRefined,
                v = !1;
            for (var r in u) r !== "plugins" && (u[r] === f[r] || gs[r] && r in f && gs[r](f[r], u[r]) ? s[r] = b[r] : l[r] ? (s[r] = l[r](u[r]), v = !0) : a[r] = f[r]);
            return v && (this.currentCalendarOptionsInput = u, this.currentCalendarOptionsRefined = s), {
                rawOptions: this.currentCalendarOptionsInput,
                refinedOptions: this.currentCalendarOptionsRefined,
                pluginHooks: o,
                availableLocaleData: e,
                localeDefaults: c,
                extra: a
            }
        }, n.prototype._computeCurrentViewData = function(n, t, i, r) {
            var f = t.viewSpecs[n],
                o, s;
            if (!f) throw new Error('viewType "' + n + "\" is not available. Please make sure you've loaded all neccessary plugins");
            var e = this.processRawViewOptions(f, t.pluginHooks, t.localeDefaults, i, r),
                u = e.refinedOptions,
                h = e.extra;
            return pb(h), o = this.buildDateProfileGenerator({
                dateProfileGeneratorClass: f.optionDefaults.dateProfileGeneratorClass,
                duration: f.duration,
                durationUnit: f.durationUnit,
                usesMinMaxTime: f.optionDefaults.usesMinMaxTime,
                dateEnv: t.dateEnv,
                calendarApi: this.props.calendarApi,
                slotMinTime: u.slotMinTime,
                slotMaxTime: u.slotMaxTime,
                showNonCurrentDates: u.showNonCurrentDates,
                dayCount: u.dayCount,
                dateAlignment: u.dateAlignment,
                dateIncrement: u.dateIncrement,
                hiddenDays: u.hiddenDays,
                weekends: u.weekends,
                nowInput: u.now,
                validRangeInput: u.validRange,
                visibleRangeInput: u.visibleRange,
                monthMode: u.monthMode,
                fixedWeekCount: u.fixedWeekCount
            }), s = this.buildViewApi(n, this.getCurrentData, t.dateEnv), {
                viewSpec: f,
                options: u,
                dateProfileGenerator: o,
                viewApi: s
            }
        }, n.prototype.processRawViewOptions = function(n, t, r, u, f) {
            var o = nh([vt, n.optionDefaults, r, u, n.optionOverrides, f, ]),
                h = i(i(i(i(i(i({}, ds), ay), vy), yy), t.listenerRefiners), t.optionRefiners),
                s = {}, a = this.currentViewOptionsInput,
                v = this.currentViewOptionsRefined,
                c = !1,
                l = {};
            for (var e in o) o[e] === a[e] ? s[e] = v[e] : (o[e] === this.currentCalendarOptionsInput[e] ? e in this.currentCalendarOptionsRefined && (s[e] = this.currentCalendarOptionsRefined[e]) : h[e] ? s[e] = h[e](o[e]) : l[e] = o[e], c = !0);
            return c && (this.currentViewOptionsInput = o, this.currentViewOptionsRefined = s), {
                rawOptions: this.currentViewOptionsInput,
                refinedOptions: this.currentViewOptionsRefined,
                extra: l
            }
        }, n
    }();
    wb = function(n) {
        function t(t) {
            var i = n.call(this, t) || this;
            return i.handleData = function(n) {
                i.dataManager ? i.setState(n) : i.state = n
            }, i.dataManager = new he({
                optionOverrides: t.optionOverrides,
                calendarApi: t.calendarApi,
                onData: i.handleData
            }), i
        }
        return u(t, n), t.prototype.render = function() {
            return this.props.children(this.state)
        }, t.prototype.componentDidUpdate = function(n) {
            var t = this.props.optionOverrides;
            t !== n.optionOverrides && this.dataManager.resetOptions(t)
        }, t
    }(fe);
    bb = function() {
        function n(n) {
            this.timeZoneName = n
        }
        return n
    }();
    ce = function() {
        function n() {
            this.strictOrder = !1;
            this.allowReslicing = !1;
            this.maxCoord = -1;
            this.maxStackCnt = -1;
            this.levelCoords = [];
            this.entriesByLevel = [];
            this.stackCnts = {}
        }
        return n.prototype.addSegs = function(n) {
            for (var t, r = [], i = 0, u = n; i < u.length; i++) t = u[i], this.insertEntry({
                segInput: t,
                spanStart: t.spanStart,
                spanEnd: t.spanEnd,
                thickness: t.thickness
            }, r);
            return r
        }, n.prototype.insertEntry = function(n, t) {
            var i = this.findInsertion(n);
            return this.isInsertionValid(i, n) ? (this.insertEntryAt(n, i), 1) : this.handleInvalidInsertion(i, n, t)
        }, n.prototype.isInsertionValid = function(n, t) {
            return (this.maxCoord === -1 || n.levelCoord + t.thickness <= this.maxCoord) && (this.maxStackCnt === -1 || n.stackCnt < this.maxStackCnt)
        }, n.prototype.handleInvalidInsertion = function(n, t, i) {
            return this.allowReslicing && n.touchingEntry ? this.splitEntry(t, n.touchingEntry, i) : (i.push(t), 0)
        }, n.prototype.splitEntry = function(n, t, r) {
            var u = 0,
                f = [];
            return (n.spanStart < t.spanStart && (u += this.insertEntry(i(i({}, n), {
                spanStart: n.spanStart,
                spanEnd: t.spanStart
            }), f)), t.spanEnd < n.spanEnd && (u += this.insertEntry(i(i({}, n), {
                spanStart: t.spanEnd,
                spanEnd: n.spanEnd
            }), f)), u) ? (r.push.apply(r, v([i(i({}, n), {
                spanStart: Math.max(t.spanStart, n.spanStart),
                spanEnd: Math.min(t.spanEnd, n.spanEnd)
            })], f)), u) : (r.push(n), 0)
        }, n.prototype.insertEntryAt = function(n, t) {
            var i = t.nextLevel;
            !i || this.levelCoords[i - 1] < t.levelCoord ? (sc(this.levelCoords, i, t.levelCoord), sc(this.entriesByLevel, i, [n])) : sc(this.entriesByLevel[i - 1], t.lateralEnd, n);
            this.stackCnts[fi(n)] = t.stackCnt
        }, n.prototype.findInsertion = function(n) {
            for (var f = this, h = f.levelCoords, v = f.entriesByLevel, y = f.stackCnts, c = f.strictOrder, p = h.length, i, s = 0, e = 0, r = 0, o = null, t = 0; t < p; t += 1) {
                if (i = h[t], !c && i >= r + n.thickness) break;
                var l = v[t],
                    u = void 0,
                    a = hc(l, n.spanStart, oc);
                for (s = a[0] + a[1], e = s;
                (u = l[e]) && u.spanStart < n.spanEnd;)(c || r < i + u.thickness && r + n.thickness > i) && (o = u, r = i + u.thickness), e += 1
            }
            return {
                levelCoord: r,
                nextLevel: t,
                lateralStart: s,
                lateralEnd: e,
                touchingEntry: o,
                stackCnt: o ? y[fi(o)] + 1 : 0
            }
        }, n.prototype.toRects = function() {
            for (var o, s, t, r, h, u = this, f = u.entriesByLevel, c = u.levelCoords, l = f.length, e = [], n = 0; n < l; n += 1) for (o = f[n], s = c[n], t = 0, r = o; t < r.length; t++) h = r[t], e.push(i(i({}, h), {
                levelCoord: s
            }));
            return e
        }, n
    }();
    ei = function() {
        function n(n) {
            this.component = n.component;
            this.isHitComboAllowed = n.isHitComboAllowed || null
        }
        return n.prototype.destroy = function() {}, n
    }();
    var su = {}, cc = function() {
        function n() {
            this.emitter = new tr
        }
        return n.prototype.destroy = function() {}, n.prototype.setMirrorIsVisible = function() {}, n.prototype.setMirrorNeedsRevert = function() {}, n.prototype.setAutoScrollEnabled = function() {}, n
    }(),
        hu = {}, got = {
            startTime: o,
            duration: o,
            create: Boolean,
            sourceId: String
        };
    var nst = function(n) {
        function r() {
            return n !== null && n.apply(this, arguments) || this
        }
        return u(r, n), r.prototype.render = function() {
            var n = this,
                i = this.props.widgetGroups.map(function(t) {
                    return n.renderWidgetGroup(t)
                });
            return t.apply(void 0, v(["div", {
                className: "fc-toolbar-chunk"
            }], i))
        }, r.prototype.renderWidgetGroup = function(n) {
            for (var y, c, p, w, u = this.props, o = this.context.theme, f = [], l = !0, s = 0, a = n; s < a.length; s++) {
                var e = a[s],
                    r = e.buttonName,
                    b = e.buttonClick,
                    k = e.buttonText,
                    h = e.buttonIcon;
                r === "title" ? (l = !1, f.push(t("h2", {
                    className: "fc-toolbar-title"
                }, u.title))) : (y = h ? {
                    "aria-label": r
                } : {}, c = ["fc-" + r + "-button", o.getClass("button")], r === u.activeButton && c.push(o.getClass("buttonActive")), p = !u.isTodayEnabled && r === "today" || !u.isPrevEnabled && r === "prev" || !u.isNextEnabled && r === "next", f.push(t("button", i({
                    disabled: p,
                    className: c.join(" "),
                    onClick: b,
                    type: "button"
                }, y), k || (h ? t("span", {
                    className: h
                }) : ""))))
            }
            return f.length > 1 ? (w = l && o.getClass("buttonGroup") || "", t.apply(void 0, v(["div", {
                className: w
            }], f))) : f[0]
        }, r
    }(s),
        db = function(n) {
            function i() {
                return n !== null && n.apply(this, arguments) || this
            }
            return u(i, n), i.prototype.render = function() {
                var f = this.props,
                    n = f.model,
                    o = f.extraClassName,
                    i = !1,
                    r, u, s = n.center,
                    e;
                return n.left ? (i = !0, r = n.left) : r = n.start, n.right ? (i = !0, u = n.right) : u = n.end, e = [o || "", "fc-toolbar", i ? "fc-toolbar-ltr" : "", ], t("div", {
                    className: e.join(" ")
                }, this.renderSection("start", r || []), this.renderSection("center", s || []), this.renderSection("end", u || []))
            }, i.prototype.renderSection = function(n, i) {
                var r = this.props;
                return t(nst, {
                    key: n,
                    widgetGroups: i,
                    title: r.title,
                    activeButton: r.activeButton,
                    isTodayEnabled: r.isTodayEnabled,
                    isPrevEnabled: r.isPrevEnabled,
                    isNextEnabled: r.isNextEnabled
                })
            }, i
        }(s),
        tst = function(n) {
            function i() {
                var t = n !== null && n.apply(this, arguments) || this;
                return t.state = {
                    availableWidth: null
                }, t.handleEl = function(n) {
                    t.el = n;
                    tt(t.props.elRef, n);
                    t.updateAvailableWidth()
                }, t.handleResize = function() {
                    t.updateAvailableWidth()
                }, t
            }
            return u(i, n), i.prototype.render = function() {
                var u = this,
                    n = u.props,
                    f = u.state,
                    i = n.aspectRatio,
                    o = ["fc-view-harness", i || n.liquid || n.height ? "fc-view-harness-active" : "fc-view-harness-passive", ],
                    r = "",
                    e = "";
                return i ? f.availableWidth !== null ? r = f.availableWidth / i : e = 100 / i + "%" : r = n.height || "", t("div", {
                    ref: this.handleEl,
                    onClick: n.onClick,
                    className: o.join(" "),
                    style: {
                        height: r,
                        paddingBottom: e
                    }
                }, n.children)
            }, i.prototype.componentDidMount = function() {
                this.context.addResizeHandler(this.handleResize)
            }, i.prototype.componentWillUnmount = function() {
                this.context.removeResizeHandler(this.handleResize)
            }, i.prototype.updateAvailableWidth = function() {
                this.el && this.props.aspectRatio && this.setState({
                    availableWidth: this.el.offsetWidth
                })
            }, i
        }(s),
        ist = function(n) {
            function t(t) {
                var i = n.call(this, t) || this;
                return i.handleSegClick = function(n, t) {
                    var r = i.component,
                        o = r.context,
                        u = ai(t),
                        f, e;
                    u && r.isValidSegDownEl(n.target) && (f = w(n.target, ".fc-event-forced-url"), e = f ? f.querySelector("a[href]").href : "", o.emitter.trigger("eventClick", {
                        el: t,
                        event: new l(r.context, u.eventRange.def, u.eventRange.instance),
                        jsEvent: n,
                        view: o.viewApi
                    }), e && !n.defaultPrevented && (window.location.href = e))
                }, i.destroy = fs(t.el, "click", ".fc-event", i.handleSegClick), i
            }
            return u(t, n), t
        }(ei),
        rst = function(n) {
            function t(t) {
                var i = n.call(this, t) || this;
                return i.handleEventElRemove = function(n) {
                    n === i.currentSegEl && i.handleSegLeave(null, i.currentSegEl)
                }, i.handleSegEnter = function(n, t) {
                    ai(t) && (i.currentSegEl = t, i.triggerEvent("eventMouseEnter", n, t))
                }, i.handleSegLeave = function(n, t) {
                    i.currentSegEl && (i.currentSegEl = null, i.triggerEvent("eventMouseLeave", n, t))
                }, i.removeHoverListeners = utt(t.el, ".fc-event", i.handleSegEnter, i.handleSegLeave), i
            }
            return u(t, n), t.prototype.destroy = function() {
                this.removeHoverListeners()
            }, t.prototype.triggerEvent = function(n, t, i) {
                var u = this.component,
                    r = u.context,
                    f = ai(i);
                (!t || u.isValidSegDownEl(t.target)) && r.emitter.trigger(n, {
                    el: i,
                    event: new l(r, f.eventRange.def, f.eventRange.instance),
                    jsEvent: t,
                    view: r.viewApi
                })
            }, t
        }(ei),
        gb = function(n) {
            function r() {
                var t = n !== null && n.apply(this, arguments) || this;
                return t.buildViewContext = f(but), t.buildViewPropTransformers = f(fst), t.buildToolbarProps = f(ust), t.handleNavLinkClick = fv("a[data-navlink]", t._handleNavLinkClick.bind(t)), t.headerRef = p(), t.footerRef = p(), t.interactionsStore = {}, t.registerInteractiveComponent = function(n, i) {
                    var r = dot(n, i),
                        u = [ist, rst, ],
                        f = u.concat(t.props.pluginHooks.componentInteractions),
                        e = f.map(function(n) {
                            return new n(r)
                        });
                    t.interactionsStore[n.uid] = e;
                    su[n.uid] = r
                }, t.unregisterInteractiveComponent = function(n) {
                    for (var u, i = 0, r = t.interactionsStore[n.uid]; i < r.length; i++) u = r[i], u.destroy();
                    delete t.interactionsStore[n.uid];
                    delete su[n.uid]
                }, t.resizeRunner = new ou(function() {
                    t.props.emitter.trigger("_resize", !0);
                    t.props.emitter.trigger("windowResize", {
                        view: t.props.viewApi
                    })
                }), t.handleWindowResize = function(n) {
                    var i = t.props.options;
                    i.handleWindowResize && n.target === window && t.resizeRunner.request(i.windowResizeDelay)
                }, t
            }
            return u(r, n), r.prototype.render = function() {
                var n = this.props,
                    r = n.toolbarConfig,
                    u = n.options,
                    e = this.buildToolbarProps(n.viewSpec, n.dateProfile, n.dateProfileGenerator, n.currentDate, ru(n.options.now, n.dateEnv), n.viewTitle),
                    o = !1,
                    f = "",
                    s, h;
                return n.isHeightAuto || n.forPrint ? f = "" : u.height != null ? o = !0 : u.contentHeight != null ? f = u.contentHeight : s = Math.max(u.aspectRatio, .5), h = this.buildViewContext(n.viewSpec, n.viewApi, n.options, n.dateProfileGenerator, n.dateEnv, n.theme, n.pluginHooks, n.dispatch, n.getCurrentData, n.emitter, n.calendarApi, this.registerInteractiveComponent, this.unregisterInteractiveComponent), t(st.Provider, {
                    value: h
                }, r.headerToolbar && t(db, i({
                    ref: this.headerRef,
                    extraClassName: "fc-header-toolbar",
                    model: r.headerToolbar
                }, e)), t(tst, {
                    liquid: o,
                    height: f,
                    aspectRatio: s,
                    onClick: this.handleNavLinkClick
                }, this.renderView(n), this.buildAppendContent()), r.footerToolbar && t(db, i({
                    ref: this.footerRef,
                    extraClassName: "fc-footer-toolbar",
                    model: r.footerToolbar
                }, e)))
            }, r.prototype.componentDidMount = function() {
                var n = this.props,
                    t, i;
                this.calendarInteractions = n.pluginHooks.calendarInteractions.map(function(t) {
                    return new t(n)
                });
                window.addEventListener("resize", this.handleWindowResize);
                t = n.pluginHooks.propSetHandlers;
                for (i in t) t[i](n[i], n)
            }, r.prototype.componentDidUpdate = function(n) {
                var t = this.props,
                    r = t.pluginHooks.propSetHandlers;
                for (var i in r) t[i] !== n[i] && r[i](t[i], t)
            }, r.prototype.componentWillUnmount = function() {
                var n, t, i;
                for (window.removeEventListener("resize", this.handleWindowResize), this.resizeRunner.clear(), n = 0, t = this.calendarInteractions; n < t.length; n++) i = t[n], i.destroy();
                this.props.emitter.trigger("_unmount")
            }, r.prototype._handleNavLinkClick = function(n, t) {
                var f = this.props,
                    e = f.dateEnv,
                    o = f.options,
                    s = f.calendarApi,
                    i = t.getAttribute("data-navlink");
                i = i ? JSON.parse(i) : {};
                var h = e.createMarker(i.date),
                    r = i.type,
                    u = r === "day" ? o.navLinkDayClick : r === "week" ? o.navLinkWeekClick : null;
                typeof u == "function" ? u.call(s, e.toDate(h), n) : (typeof u == "string" && (r = u), s.zoomTo(h, r))
            }, r.prototype.buildAppendContent = function() {
                var n = this.props,
                    i = n.pluginHooks.viewContainerAppends.map(function(t) {
                        return t(n)
                    });
                return t.apply(void 0, v([a, {}], i))
            }, r.prototype.renderView = function(n) {
                for (var e, o, s = n.pluginHooks, h = n.viewSpec, r = {
                    dateProfile: n.dateProfile,
                    businessHours: n.businessHours,
                    eventStore: n.renderableEventStore,
                    eventUiBases: n.eventUiBases,
                    dateSelection: n.dateSelection,
                    eventSelection: n.eventSelection,
                    eventDrag: n.eventDrag,
                    eventResize: n.eventResize,
                    isHeightAuto: n.isHeightAuto,
                    forPrint: n.forPrint
                }, c = this.buildViewPropTransformers(s.viewPropsTransformers), u = 0, f = c; u < f.length; u++) e = f[u], i(r, e.transform(r, n));
                return o = h.component, t(o, i({}, r))
            }, r
        }(fu);
    lc = function(n) {
        function t() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.state = {
                forPrint: !1
            }, t.handleBeforePrint = function() {
                t.setState({
                    forPrint: !0
                })
            }, t.handleAfterPrint = function() {
                t.setState({
                    forPrint: !1
                })
            }, t
        }
        return u(t, n), t.prototype.render = function() {
            var t = this.props,
                n = t.options,
                i = this.state.forPrint,
                r = i || n.height === "auto" || n.contentHeight === "auto",
                f = !r && n.height != null ? n.height : "",
                u = ["fc", i ? "fc-media-print" : "fc-media-screen", "fc-direction-" + n.direction, t.theme.getClass("root"), ];
            return ph() || u.push("fc-liquid-hack"), t.children(u, f, r, i)
        }, t.prototype.componentDidMount = function() {
            var n = this.props.emitter;
            n.on("_beforeprint", this.handleBeforePrint);
            n.on("_afterprint", this.handleAfterPrint)
        }, t.prototype.componentWillUnmount = function() {
            var n = this.props.emitter;
            n.off("_beforeprint", this.handleBeforePrint);
            n.off("_afterprint", this.handleAfterPrint)
        }, t
    }(s);
    ac = "fc-col-header-cell";
    var ik = function(n) {
        function r() {
            return n !== null && n.apply(this, arguments) || this
        }
        return u(r, n), r.prototype.render = function() {
            var e = this.context,
                o = e.dateEnv,
                r = e.options,
                s = e.theme,
                h = e.viewApi,
                n = this.props,
                u = n.date,
                c = n.dateProfile,
                f = te(u, n.todayRange, null, c),
                l = [ac].concat(uu(f, s)),
                a = o.format(u, n.dayHeaderFormat),
                v = r.navLinks && !f.isDisabled && n.colCnt > 1 ? {
                    "data-navlink": nr(u),
                    tabIndex: 0
                } : {}, y = i(i(i({
                    date: o.toDate(u),
                    view: h
                }, n.extraHookProps), {
                    text: a
                }), f);
            return t(k, {
                hookProps: y,
                classNames: r.dayHeaderClassNames,
                content: r.dayHeaderContent,
                defaultContent: tk,
                didMount: r.dayHeaderDidMount,
                willUnmount: r.dayHeaderWillUnmount
            }, function(r, e, o, s) {
                return t("th", i({
                    ref: r,
                    className: l.concat(e).join(" "),
                    "data-date": f.isDisabled ? undefined : pr(u),
                    colSpan: n.colSpan
                }, n.extraDataAttrs), t("div", {
                    className: "fc-scrollgrid-sync-inner"
                }, !f.isDisabled && t("a", i({
                    ref: o,
                    className: ["fc-col-header-cell-cushion", n.isSticky ? "fc-sticky" : "", ].join(" ")
                }, v), s)))
            })
        }, r
    }(s),
        rk = function(n) {
            function r() {
                return n !== null && n.apply(this, arguments) || this
            }
            return u(r, n), r.prototype.render = function() {
                var n = this.props,
                    r = this.context,
                    o = r.dateEnv,
                    s = r.theme,
                    h = r.viewApi,
                    u = r.options,
                    f = y(new Date(2592e5), n.dow),
                    e = {
                        dow: n.dow,
                        isDisabled: !1,
                        isFuture: !1,
                        isPast: !1,
                        isToday: !1,
                        isOther: !1
                    }, c = [ac].concat(uu(e, s), n.extraClassNames || []),
                    l = o.format(f, n.dayHeaderFormat),
                    a = i(i(i(i({
                        date: f
                    }, e), {
                        view: h
                    }), n.extraHookProps), {
                        text: l
                    });
                return t(k, {
                    hookProps: a,
                    classNames: u.dayHeaderClassNames,
                    content: u.dayHeaderContent,
                    defaultContent: tk,
                    didMount: u.dayHeaderDidMount,
                    willUnmount: u.dayHeaderWillUnmount
                }, function(r, u, f, e) {
                    return t("th", i({
                        ref: r,
                        className: c.concat(u).join(" "),
                        colSpan: n.colSpan
                    }, n.extraDataAttrs), t("div", {
                        className: "fc-scrollgrid-sync-inner"
                    }, t("a", {
                        className: ["fc-col-header-cell-cushion", n.isSticky ? "fc-sticky" : "", ].join(" "),
                        ref: f
                    }, e)))
                })
            }, r
        }(s),
        rr = function(n) {
            function t(t, i) {
                var r = n.call(this, t, i) || this;
                return r.initialNowDate = ru(i.options.now, i.dateEnv), r.initialNowQueriedMs = (new Date).valueOf(), r.state = r.computeTiming().currentState, r
            }
            return u(t, n), t.prototype.render = function() {
                var n = this,
                    i = n.props,
                    t = n.state;
                return i.children(t.nowDate, t.todayRange)
            }, t.prototype.componentDidMount = function() {
                this.setTimeout()
            }, t.prototype.componentDidUpdate = function(n) {
                n.unit !== this.props.unit && (this.clearTimeout(), this.setTimeout())
            }, t.prototype.componentWillUnmount = function() {
                this.clearTimeout()
            }, t.prototype.computeTiming = function() {
                var r = this,
                    u = r.props,
                    f = r.context,
                    e = dt(this.initialNowDate, (new Date).valueOf() - this.initialNowQueriedMs),
                    n = f.dateEnv.startOf(e, u.unit),
                    t = f.dateEnv.add(n, o(1, u.unit)),
                    i = t.valueOf() - e.valueOf();
                return i = Math.min(864e5, i), {
                    currentState: {
                        nowDate: n,
                        todayRange: uk(n)
                    },
                    nextState: {
                        nowDate: t,
                        todayRange: uk(t)
                    },
                    waitMs: i
                }
            }, t.prototype.setTimeout = function() {
                var n = this,
                    t = this.computeTiming(),
                    i = t.nextState,
                    r = t.waitMs;
                this.timeoutId = setTimeout(function() {
                    n.setState(i, function() {
                        n.setTimeout()
                    })
                }, r)
            }, t.prototype.clearTimeout = function() {
                this.timeoutId && clearTimeout(this.timeoutId)
            }, t.contextType = st, t
        }(fe);
    ve = function(n) {
        function i() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.createDayHeaderFormatter = f(est), t
        }
        return u(i, n), i.prototype.render = function() {
            var e = this.context,
                n = this.props,
                i = n.dates,
                o = n.dateProfile,
                r = n.datesRepDistinctDays,
                u = n.renderIntro,
                f = this.createDayHeaderFormatter(e.options.dayHeaderFormat, r, i.length);
            return t(rr, {
                unit: "day"
            }, function(n, e) {
                return t("tr", null, u && u("day"), i.map(function(n) {
                    return r ? t(ik, {
                        key: n.toISOString(),
                        date: n,
                        dateProfile: o,
                        todayRange: e,
                        colCnt: i.length,
                        dayHeaderFormat: f
                    }) : t(rk, {
                        key: n.getUTCDay(),
                        dow: n.getUTCDay(),
                        dayHeaderFormat: f
                    })
                }))
            })
        }, i
    }(s);
    var vc = function() {
        function n(n, t) {
            for (var i = n.start, e = n.end, r = [], u = [], f = -1; i < e;) t.isHiddenDay(i) ? r.push(f + .5) : (f += 1, r.push(f), u.push(i)), i = y(i, 1);
            this.dates = u;
            this.indices = r;
            this.cnt = u.length
        }
        return n.prototype.sliceRange = function(n) {
            var r = this.getDateDayIndex(n.start),
                u = this.getDateDayIndex(y(n.end, -1)),
                t = Math.max(0, r),
                i = Math.min(this.cnt - 1, u);
            return (t = Math.ceil(t), i = Math.floor(i), t <= i) ? {
                firstIndex: t,
                lastIndex: i,
                isStart: r === t,
                isEnd: u === i
            } : null
        }, n.prototype.getDateDayIndex = function(n) {
            var t = this.indices,
                i = Math.floor(lt(this.dates[0], n));
            return i < 0 ? t[0] - 1 : i >= t.length ? t[t.length - 1] + 1 : t[i]
        }, n
    }(),
        yc = function() {
            function n(n, t) {
                var r = n.dates,
                    i, f, u;
                if (t) {
                    for (f = r[0].getUTCDay(), i = 1; i < r.length; i += 1) if (r[i].getUTCDay() === f) break;
                    u = Math.ceil(r.length / i)
                } else u = 1, i = r.length;
                this.rowCnt = u;
                this.colCnt = i;
                this.daySeries = n;
                this.cells = this.buildCells();
                this.headerDates = this.buildHeaderDates()
            }
            return n.prototype.buildCells = function() {
                for (var i, n, r = [], t = 0; t < this.rowCnt; t += 1) {
                    for (i = [], n = 0; n < this.colCnt; n += 1) i.push(this.buildCell(t, n));
                    r.push(i)
                }
                return r
            }, n.prototype.buildCell = function(n, t) {
                var i = this.daySeries.dates[n * this.colCnt + t];
                return {
                    key: i.toISOString(),
                    date: i
                }
            }, n.prototype.buildHeaderDates = function() {
                for (var t = [], n = 0; n < this.colCnt; n += 1) t.push(this.cells[0][n].date);
                return t
            }, n.prototype.sliceRange = function(n) {
                var r = this.colCnt,
                    t = this.daySeries.sliceRange(n),
                    o = [],
                    e, u;
                if (t) for (var s = t.firstIndex, f = t.lastIndex, i = s; i <= f;) e = Math.floor(i / r), u = Math.min((e + 1) * r, f + 1), o.push({
                    row: e,
                    firstCol: i % r,
                    lastCol: (u - 1) % r,
                    isStart: t.isStart && i === s,
                    isEnd: t.isEnd && u - 1 === f
                }), i = u;
                return o
            }, n
        }(),
        pc = function() {
            function n() {
                this.sliceBusinessHours = f(this._sliceBusinessHours);
                this.sliceDateSelection = f(this._sliceDateSpan);
                this.sliceEventStore = f(this._sliceEventStore);
                this.sliceEventDrag = f(this._sliceInteraction);
                this.sliceEventResize = f(this._sliceInteraction);
                this.forceDayIfListItem = !1
            }
            return n.prototype.sliceProps = function(n, t, i, r) {
                for (var f, o, u = [], e = 4; e < arguments.length; e++) u[e - 4] = arguments[e];
                return f = n.eventUiBases, o = this.sliceEventStore.apply(this, v([n.eventStore, f, t, i], u)), {
                    dateSelectionSegs: this.sliceDateSelection.apply(this, v([n.dateSelection, f, r], u)),
                    businessHourSegs: this.sliceBusinessHours.apply(this, v([n.businessHours, t, i, r], u)),
                    fgEventSegs: o.fg,
                    bgEventSegs: o.bg,
                    eventDrag: this.sliceEventDrag.apply(this, v([n.eventDrag, f, t, i], u)),
                    eventResize: this.sliceEventResize.apply(this, v([n.eventResize, f, t, i], u)),
                    eventSelection: n.eventSelection
                }
            }, n.prototype.sliceNowDate = function(n, t) {
                for (var r = [], i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
                return this._sliceDateSpan.apply(this, v([{
                    range: {
                        start: n,
                        end: dt(n, 1)
                    },
                    allDay: !1
                }, {},
                t], r))
            }, n.prototype._sliceBusinessHours = function(n, t, i, r) {
                for (var f = [], u = 4; u < arguments.length; u++) f[u - 4] = arguments[u];
                return n ? this._sliceEventStore.apply(this, v([bi(n, wc(t, Boolean(i)), r), {},
                t, i], f)).bg : []
            }, n.prototype._sliceEventStore = function(n, t, i, r) {
                for (var e, f = [], u = 4; u < arguments.length; u++) f[u - 4] = arguments[u];
                return n ? (e = iu(n, t, wc(i, Boolean(r)), r), {
                    bg: this.sliceEventRanges(e.bg, f),
                    fg: this.sliceEventRanges(e.fg, f)
                }) : {
                    bg: [],
                    fg: []
                }
            }, n.prototype._sliceInteraction = function(n, t, i, r) {
                for (var e, f = [], u = 4; u < arguments.length; u++) f[u - 4] = arguments[u];
                return n ? (e = iu(n.mutatedEvents, t, wc(i, Boolean(r)), r), {
                    segs: this.sliceEventRanges(e.fg, f),
                    affectedInstances: n.affectedEvents.instances,
                    isEvent: n.isEvent
                }) : null
            }, n.prototype._sliceDateSpan = function(n, t, i) {
                for (var s, f, u, e, h, o = [], r = 3; r < arguments.length; r++) o[r - 3] = arguments[r];
                if (!n) return [];
                for (s = vrt(n, t, i), f = this.sliceRange.apply(this, v([n.range], o)), u = 0, e = f; u < e.length; u++) h = e[u], h.eventRange = s;
                return f
            }, n.prototype.sliceEventRanges = function(n, t) {
                for (var f, i = [], r = 0, u = n; r < u.length; r++) f = u[r], i.push.apply(i, this.sliceEventRange(f, t));
                return i
            }, n.prototype.sliceEventRange = function(n, t) {
                var r = n.range,
                    f, u, e, i;
                for (this.forceDayIfListItem && n.ui.display === "list-item" && (r = {
                    start: r.start,
                    end: y(r.start, 1)
                }), f = this.sliceRange.apply(this, v([r], t)), u = 0, e = f; u < e.length; u++) i = e[u], i.eventRange = n, i.isStart = n.isStart && i.isStart, i.isEnd = n.isEnd && i.isEnd;
                return f
            }, n
        }();
    var pe = /^(visible|hidden)$/,
        kc = function(n) {
            function i() {
                var t = n !== null && n.apply(this, arguments) || this;
                return t.handleEl = function(n) {
                    t.el = n;
                    tt(t.props.elRef, n)
                }, t
            }
            return u(i, n), i.prototype.render = function() {
                var n = this.props,
                    u = n.liquid,
                    f = n.liquidIsAbsolute,
                    i = u && f,
                    r = ["fc-scroller"];
                return u && (f ? r.push("fc-scroller-liquid-absolute") : r.push("fc-scroller-liquid")), t("div", {
                    ref: this.handleEl,
                    className: r.join(" "),
                    style: {
                        overflowX: n.overflowX,
                        overflowY: n.overflowY,
                        left: i && -(n.overcomeLeft || 0) || "",
                        right: i && -(n.overcomeRight || 0) || "",
                        bottom: i && -(n.overcomeBottom || 0) || "",
                        marginLeft: !i && -(n.overcomeLeft || 0) || "",
                        marginRight: !i && -(n.overcomeRight || 0) || "",
                        marginBottom: !i && -(n.overcomeBottom || 0) || "",
                        maxHeight: n.maxHeight || ""
                    }
                }, n.children)
            }, i.prototype.needsXScrolling = function() {
                var n, i;
                if (pe.test(this.props.overflowX)) return !1;
                var r = this.el,
                    u = this.el.getBoundingClientRect().width - this.getYScrollbarWidth(),
                    t = r.children;
                for (n = 0; n < t.length; n += 1) if (i = t[n], i.getBoundingClientRect().width > u) return !0;
                return !1
            }, i.prototype.needsYScrolling = function() {
                var n, i;
                if (pe.test(this.props.overflowY)) return !1;
                var r = this.el,
                    u = this.el.getBoundingClientRect().height - this.getXScrollbarWidth(),
                    t = r.children;
                for (n = 0; n < t.length; n += 1) if (i = t[n], i.getBoundingClientRect().height > u) return !0;
                return !1
            }, i.prototype.getXScrollbarWidth = function() {
                return pe.test(this.props.overflowX) ? 0 : this.el.offsetHeight - this.el.clientHeight
            }, i.prototype.getYScrollbarWidth = function() {
                return pe.test(this.props.overflowY) ? 0 : this.el.offsetWidth - this.el.clientWidth
            }, i
        }(s),
        ht = function() {
            function n(n) {
                var t = this;
                this.masterCallback = n;
                this.currentMap = {};
                this.depths = {};
                this.callbackMap = {};
                this.handleValue = function(n, i) {
                    var e = t,
                        r = e.depths,
                        u = e.currentMap,
                        f = !1,
                        o = !1;
                    n !== null ? (f = i in u, u[i] = n, r[i] = (r[i] || 0) + 1, o = !0) : (r[i] -= 1, r[i] || (delete u[i], delete t.callbackMap[i], f = !0));
                    t.masterCallback && (f && t.masterCallback(null, String(i)), o && t.masterCallback(n, String(i)))
                }
            }
            return n.prototype.createRef = function(n) {
                var i = this,
                    t = this.callbackMap[n];
                return t || (t = this.callbackMap[n] = function(t) {
                    i.handleValue(t, String(n))
                }), t
            }, n.prototype.collect = function(n, t, i) {
                return iy(this.currentMap, n, t, i)
            }, n.prototype.getAll = function() {
                return vs(this.currentMap)
            }, n
        }();
    lu = function(n) {
        function r() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.processCols = f(function(n) {
                return n
            }, ak), t.renderMicroColGroup = f(vk), t.scrollerRefs = new ht, t.scrollerElRefs = new ht(t._handleScrollerEl.bind(t)), t.state = {
                shrinkWidth: null,
                forceYScrollbars: !1,
                scrollerClientWidths: {},
                scrollerClientHeights: {}
            }, t.handleSizing = function() {
                t.setState(i({
                    shrinkWidth: t.computeShrinkWidth()
                }, t.computeScrollerDims()))
            }, t
        }
        return u(r, n), r.prototype.render = function() {
            var h = this,
                r = h.props,
                y = h.state,
                p = h.context,
                f = r.sections || [],
                w = this.processCols(r.cols),
                c = this.renderMicroColGroup(w, y.shrinkWidth),
                a = wk(r.liquid, p),
                u;
            r.collapsibleWidth && a.push("fc-scrollgrid-collapsible");
            for (var l = f.length, n = 0, i, e = [], o = [], s = []; n < l && (i = f[n]).type === "header";) e.push(this.renderSection(i, c)), n += 1;
            while (n < l && (i = f[n]).type === "body") o.push(this.renderSection(i, c)), n += 1;
            while (n < l && (i = f[n]).type === "footer") s.push(this.renderSection(i, c)), n += 1;
            return u = !ph(), t("table", {
                className: a.join(" "),
                style: {
                    height: r.height
                }
            }, Boolean(!u && e.length) && t.apply(void 0, v(["thead", {}], e)), Boolean(!u && o.length) && t.apply(void 0, v(["tbody", {}], o)), Boolean(!u && s.length) && t.apply(void 0, v(["tfoot", {}], s)), u && t.apply(void 0, v(["tbody", {}], e, o, s)))
        }, r.prototype.renderSection = function(n, i) {
            return "outerContent" in n ? t(a, {
                key: n.key
            }, n.outerContent) : t("tr", {
                key: n.key,
                className: bk(n, this.props.liquid).join(" ")
            }, this.renderChunkTd(n, i, n.chunk))
        }, r.prototype.renderChunkTd = function(n, i, r) {
            if ("outerContent" in r) return r.outerContent;
            var f = this.props,
                e = this.state,
                c = e.forceYScrollbars,
                o = e.scrollerClientWidths,
                s = e.scrollerClientHeights,
                l = ck(f, n),
                h = dc(f, n),
                a = f.liquid ? c ? "scroll" : l ? "auto" : "hidden" : "visible",
                u = n.key,
                v = lk(n, r, {
                    tableColGroupNode: i,
                    tableMinWidth: "",
                    clientWidth: !f.collapsibleWidth && o[u] !== undefined ? o[u] : null,
                    clientHeight: s[u] !== undefined ? s[u] : null,
                    expandRows: n.expandRows,
                    syncRowHeights: !1,
                    rowSyncHeights: [],
                    reportRowHeightChange: function() {}
                });
            return t("td", {
                ref: r.elRef
            }, t("div", {
                className: "fc-scroller-harness" + (h ? " fc-scroller-harness-liquid" : "")
            }, t(kc, {
                ref: this.scrollerRefs.createRef(u),
                elRef: this.scrollerElRefs.createRef(u),
                overflowY: a,
                overflowX: f.liquid ? "hidden" : "visible",
                maxHeight: n.maxHeight,
                liquid: h,
                liquidIsAbsolute: !0
            }, v)))
        }, r.prototype._handleScrollerEl = function(n, t) {
            var i = lst(this.props.sections, t);
            i && tt(i.chunk.scrollerElRef, n)
        }, r.prototype.componentDidMount = function() {
            this.handleSizing();
            this.context.addResizeHandler(this.handleSizing)
        }, r.prototype.componentDidUpdate = function() {
            this.handleSizing()
        }, r.prototype.componentWillUnmount = function() {
            this.context.removeResizeHandler(this.handleSizing)
        }, r.prototype.computeShrinkWidth = function() {
            return pk(this.props.cols) ? hk(this.scrollerElRefs.getAll()) : 0
        }, r.prototype.computeScrollerDims = function() {
            var l = hw(),
                e = this,
                o = e.scrollerRefs,
                a = e.scrollerElRefs,
                i = !1,
                s = {}, h = {}, n, r, t, u, f;
            for (n in o.currentMap) if (r = o.currentMap[n], r && r.needsYScrolling()) {
                i = !0;
                break
            }
            for (t = 0, u = this.props.sections; t < u.length; t++) {
                var v = u[t],
                    n = v.key,
                    c = a.currentMap[n];
                c && (f = c.parentNode, s[n] = Math.floor(f.getBoundingClientRect().width - (i ? l.y : 0)), h[n] = Math.floor(f.getBoundingClientRect().height))
            }
            return {
                forceYScrollbars: i,
                scrollerClientWidths: s,
                scrollerClientHeights: h
            }
        }, r
    }(s);
    lu.addStateEquality({
        scrollerClientWidths: ft,
        scrollerClientHeights: ft
    });
    ur = function(n) {
        function i() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.elRef = p(), t
        }
        return u(i, n), i.prototype.render = function() {
            var s = this,
                n = s.props,
                r = s.context,
                u = r.options,
                i = n.seg,
                e = i.eventRange,
                f = e.ui,
                o = {
                    event: new l(r, e.def, e.instance),
                    view: r.viewApi,
                    timeText: n.timeText,
                    textColor: f.textColor,
                    backgroundColor: f.backgroundColor,
                    borderColor: f.borderColor,
                    isDraggable: !n.disableDragging && up(i, r),
                    isStartResizable: !n.disableResizing && fp(i, r),
                    isEndResizable: !n.disableResizing && ep(i),
                    isMirror: Boolean(n.isDragging || n.isResizing || n.isDateSelecting),
                    isStart: Boolean(i.isStart),
                    isEnd: Boolean(i.isEnd),
                    isPast: Boolean(n.isPast),
                    isFuture: Boolean(n.isFuture),
                    isToday: Boolean(n.isToday),
                    isSelected: Boolean(n.isSelected),
                    isDragging: Boolean(n.isDragging),
                    isResizing: Boolean(n.isResizing)
                }, h = op(o).concat(f.classNames);
            return t(k, {
                hookProps: o,
                classNames: u.eventClassNames,
                content: u.eventContent,
                defaultContent: n.defaultContent,
                didMount: u.eventDidMount,
                willUnmount: u.eventWillUnmount,
                elRef: this.elRef
            }, function(t, i, r, u) {
                return n.children(t, h.concat(i), r, u, o)
            })
        }, i.prototype.componentDidMount = function() {
            rh(this.elRef.current, this.props.seg)
        }, i.prototype.componentDidUpdate = function(n) {
            var t = this.props.seg;
            t !== n.seg && rh(this.elRef.current, t)
        }, i
    }(s);
    be = function(n) {
        function r() {
            return n !== null && n.apply(this, arguments) || this
        }
        return u(r, n), r.prototype.render = function() {
            var u = this,
                n = u.props,
                f = u.context,
                r = n.seg,
                e = f.options.eventTimeFormat || n.defaultTimeFormat,
                o = gi(r, e, f, n.defaultDisplayEventTime, n.defaultDisplayEventEnd);
            return t(ur, {
                seg: r,
                timeText: o,
                disableDragging: n.disableDragging,
                disableResizing: n.disableResizing,
                defaultContent: n.defaultContent || ast,
                isDragging: n.isDragging,
                isResizing: n.isResizing,
                isDateSelecting: n.isDateSelecting,
                isSelected: n.isSelected,
                isPast: n.isPast,
                isFuture: n.isFuture,
                isToday: n.isToday
            }, function(u, f, e, o, s) {
                return t("a", i({
                    className: n.extraClassNames.concat(f).join(" "),
                    style: {
                        borderColor: s.borderColor,
                        backgroundColor: s.backgroundColor
                    },
                    ref: u
                }, vst(r)), t("div", {
                    className: "fc-event-main",
                    ref: e,
                    style: {
                        color: s.textColor
                    }
                }, o), s.isStartResizable && t("div", {
                    className: "fc-event-resizer fc-event-resizer-start"
                }), s.isEndResizable && t("div", {
                    className: "fc-event-resizer fc-event-resizer-end"
                }))
            })
        }, r
    }(s);
    var ke = function(n) {
        return t(st.Consumer, null, function(i) {
            var r = i.options,
                u = {
                    isAxis: n.isAxis,
                    date: i.dateEnv.toDate(n.date),
                    view: i.viewApi
                };
            return t(k, {
                hookProps: u,
                classNames: r.nowIndicatorClassNames,
                content: r.nowIndicatorContent,
                didMount: r.nowIndicatorDidMount,
                willUnmount: r.nowIndicatorWillUnmount
            }, n.children)
        })
    }, yst = c({
        day: "numeric"
    }),
        de = function(n) {
            function i() {
                return n !== null && n.apply(this, arguments) || this
            }
            return u(i, n), i.prototype.render = function() {
                var r = this,
                    n = r.props,
                    i = r.context,
                    u = i.options,
                    f = kk({
                        date: n.date,
                        dateProfile: n.dateProfile,
                        todayRange: n.todayRange,
                        showDayNumber: n.showDayNumber,
                        extraProps: n.extraHookProps,
                        viewApi: i.viewApi,
                        dateEnv: i.dateEnv
                    });
                return t(tc, {
                    hookProps: f,
                    content: u.dayCellContent,
                    defaultContent: n.defaultContent
                }, n.children)
            }, i
        }(s);
    au = function(n) {
        function i() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.refineHookProps = wr(kk), t.normalizeClassNames = ic(), t
        }
        return u(i, n), i.prototype.render = function() {
            var f = this,
                n = f.props,
                r = f.context,
                u = r.options,
                i = this.refineHookProps({
                    date: n.date,
                    dateProfile: n.dateProfile,
                    todayRange: n.todayRange,
                    showDayNumber: n.showDayNumber,
                    extraProps: n.extraHookProps,
                    viewApi: r.viewApi,
                    dateEnv: r.dateEnv
                }),
                e = uu(i, r.theme).concat(i.isDisabled ? [] : this.normalizeClassNames(u.dayCellClassNames, i)),
                o = i.isDisabled ? {} : {
                    "data-date": pr(n.date)
                };
            return t(eu, {
                hookProps: i,
                didMount: u.dayCellDidMount,
                willUnmount: u.dayCellWillUnmount,
                elRef: n.elRef
            }, function(t) {
                return n.children(t, e, o, i.isDisabled)
            })
        }, i
    }(s);
    ge = function(n) {
        return t(ur, {
            defaultContent: pst,
            seg: n.seg,
            timeText: "",
            disableDragging: !0,
            disableResizing: !0,
            isDragging: !1,
            isResizing: !1,
            isDateSelecting: !1,
            isSelected: !1,
            isPast: n.isPast,
            isFuture: n.isFuture,
            isToday: n.isToday
        }, function(n, i, r, u, f) {
            return t("div", {
                ref: n,
                className: ["fc-bg-event"].concat(i).join(" "),
                style: {
                    backgroundColor: f.backgroundColor
                }
            }, u)
        })
    };
    no = function(n) {
        return t(st.Consumer, null, function(i) {
            var f = i.dateEnv,
                r = i.options,
                u = n.date,
                e = r.weekNumberFormat || n.defaultFormat,
                o = f.computeWeekNumber(u),
                s = f.format(u, e),
                h = {
                    num: o,
                    text: s,
                    date: u
                };
            return t(k, {
                hookProps: h,
                classNames: r.weekNumberClassNames,
                content: r.weekNumberContent,
                defaultContent: wst,
                didMount: r.weekNumberDidMount,
                willUnmount: r.weekNumberWillUnmount
            }, n.children)
        })
    };
    var tl = 10,
        bst = function(n) {
            function r() {
                var t = n !== null && n.apply(this, arguments) || this;
                return t.handleRootEl = function(n) {
                    t.rootEl = n;
                    t.props.elRef && tt(t.props.elRef, n)
                }, t.handleDocumentMousedown = function(n) {
                    var i = rtt(n);
                    t.rootEl.contains(i) || t.handleCloseClick()
                }, t.handleCloseClick = function() {
                    var n = t.props.onClose;
                    n && n()
                }, t
            }
            return u(r, n), r.prototype.render = function() {
                var r = this.context.theme,
                    n = this.props,
                    u = ["fc-popover", r.getClass("popover"), ].concat(n.extraClassNames || []);
                return bw(t("div", i({
                    className: u.join(" ")
                }, n.extraAttrs, {
                    ref: this.handleRootEl
                }), t("div", {
                    className: "fc-popover-header " + r.getClass("popoverHeader")
                }, t("span", {
                    className: "fc-popover-title"
                }, n.title), t("span", {
                    className: "fc-popover-close " + r.getIconClass("close"),
                    onClick: this.handleCloseClick
                })), t("div", {
                    className: "fc-popover-body " + r.getClass("popoverContent")
                }, n.children)), n.parentEl)
            }, r.prototype.componentDidMount = function() {
                document.addEventListener("mousedown", this.handleDocumentMousedown);
                this.updateSize()
            }, r.prototype.componentWillUnmount = function() {
                document.removeEventListener("mousedown", this.handleDocumentMousedown)
            }, r.prototype.updateSize = function() {
                var s = this.context.isRtl,
                    f = this.props,
                    e = f.alignmentEl,
                    h = f.alignGridTop,
                    i = this.rootEl,
                    t = aut(e),
                    u;
                if (t) {
                    var o = i.getBoundingClientRect(),
                        r = h ? w(e, ".fc-scrollgrid").getBoundingClientRect().top : t.top,
                        n = s ? t.right - o.width : t.left;
                    r = Math.max(r, tl);
                    n = Math.min(n, document.documentElement.clientWidth - tl - o.width);
                    n = Math.max(n, tl);
                    u = i.offsetParent.getBoundingClientRect();
                    wi(i, {
                        top: r - u.top,
                        left: n - u.left
                    })
                }
            }, r
        }(s),
        kst = function(n) {
            function r() {
                var t = n !== null && n.apply(this, arguments) || this;
                return t.handleRootEl = function(n) {
                    t.rootEl = n;
                    n ? t.context.registerInteractiveComponent(t, {
                        el: n,
                        useEventCenter: !1
                    }) : t.context.unregisterInteractiveComponent(t)
                }, t
            }
            return u(r, n), r.prototype.render = function() {
                var r = this.context,
                    e = r.options,
                    o = r.dateEnv,
                    n = this.props,
                    i = n.startDate,
                    u = n.todayRange,
                    f = n.dateProfile,
                    s = o.format(i, e.dayPopoverFormat);
                return t(au, {
                    date: i,
                    dateProfile: f,
                    todayRange: u,
                    elRef: this.handleRootEl
                }, function(r, e, o) {
                    return t(bst, {
                        elRef: r,
                        title: s,
                        extraClassNames: ["fc-more-popover"].concat(e),
                        extraAttrs: o,
                        parentEl: n.parentEl,
                        alignmentEl: n.alignmentEl,
                        alignGridTop: n.alignGridTop,
                        onClose: n.onClose
                    }, t(de, {
                        date: i,
                        dateProfile: f,
                        todayRange: u
                    }, function(n, i) {
                        return i && t("div", {
                            className: "fc-more-popover-misc",
                            ref: n
                        }, i)
                    }), n.children)
                })
            }, r.prototype.queryHit = function(n, t, r, u) {
                var e = this,
                    o = e.rootEl,
                    f = e.props;
                return n >= 0 && n < r && t >= 0 && t < u ? {
                    dateProfile: f.dateProfile,
                    dateSpan: i({
                        allDay: !0,
                        range: {
                            start: f.startDate,
                            end: f.endDate
                        }
                    }, f.extraDateSpan),
                    dayEl: o,
                    rect: {
                        left: 0,
                        top: 0,
                        right: r,
                        bottom: u
                    },
                    layer: 1
                } : null
            }, r
        }(it),
        il = function(n) {
            function i() {
                var t = n !== null && n.apply(this, arguments) || this;
                return t.linkElRef = p(), t.state = {
                    isPopoverOpen: !1
                }, t.handleClick = function(n) {
                    function o(n) {
                        var t = n.eventRange,
                            u = t.def,
                            f = t.instance,
                            i = t.range;
                        return {
                            event: new l(r, u, f),
                            start: r.dateEnv.toDate(i.start),
                            end: r.dateEnv.toDate(i.end),
                            isStart: n.isStart,
                            isEnd: n.isEnd
                        }
                    }
                    var f = t,
                        u = f.props,
                        r = f.context,
                        i = r.options.moreLinkClick,
                        e = dk(u).start;
                    typeof i == "function" && (i = i({
                        date: e,
                        allDay: Boolean(u.allDayDate),
                        allSegs: u.allSegs.map(o),
                        hiddenSegs: u.hiddenSegs.map(o),
                        jsEvent: n,
                        view: r.viewApi
                    }));
                    i && i !== "popover" ? typeof i == "string" && r.calendarApi.zoomTo(e, i) : t.setState({
                        isPopoverOpen: !0
                    })
                }, t.handlePopoverClose = function() {
                    t.setState({
                        isPopoverOpen: !1
                    })
                }, t
            }
            return u(i, n), i.prototype.render = function() {
                var i = this,
                    n = this.props;
                return t(st.Consumer, null, function(r) {
                    var s = r.viewApi,
                        u = r.options,
                        h = r.calendarApi,
                        e = u.moreLinkText,
                        f = n.moreCnt,
                        o = dk(n),
                        c = {
                            num: f,
                            shortText: "+" + f,
                            text: typeof e == "function" ? e.call(h, f) : "+" + f + " " + e,
                            view: s
                        };
                    return t(a, null, Boolean(n.moreCnt) && t(k, {
                        elRef: i.linkElRef,
                        hookProps: c,
                        classNames: u.moreLinkClassNames,
                        content: u.moreLinkContent,
                        defaultContent: n.defaultContent || dst,
                        didMount: u.moreLinkDidMount,
                        willUnmount: u.moreLinkWillUnmount
                    }, function(t, r, u, f) {
                        return n.children(t, ["fc-more-link"].concat(r), u, f, i.handleClick)
                    }), i.state.isPopoverOpen && t(kst, {
                        startDate: o.start,
                        endDate: o.end,
                        dateProfile: n.dateProfile,
                        todayRange: n.todayRange,
                        extraDateSpan: n.extraDateSpan,
                        parentEl: i.parentEl,
                        alignmentEl: n.alignmentElRef.current,
                        alignGridTop: n.alignGridTop,
                        onClose: i.handlePopoverClose
                    }, n.popoverContent()))
                })
            }, i.prototype.componentDidMount = function() {
                this.updateParentEl()
            }, i.prototype.componentDidUpdate = function() {
                this.updateParentEl()
            }, i.prototype.updateParentEl = function() {
                this.linkElRef.current && (this.parentEl = w(this.linkElRef.current, ".fc-view-harness"))
            }, i
        }(s);
    gk = "5.7.0";
    nd = function(n) {
        function r(r, u) {
            u === void 0 && (u = {});
            var f = n.call(this) || this;
            return f.isRendering = !1, f.isRendered = !1, f.currentClassNames = [], f.customContentRenderId = 0, f.handleAction = function(n) {
                switch (n.type) {
                    case "SET_EVENT_DRAG":
                    case "SET_EVENT_RESIZE":
                        f.renderRunner.tryDrain()
                }
            }, f.handleData = function(n) {
                f.currentData = n;
                f.renderRunner.request(n.calendarOptions.rerenderDelay)
            }, f.handleRenderRequest = function() {
                if (f.isRendering) {
                    f.isRendered = !0;
                    var n = f.currentData;
                    ww(t(lc, {
                        options: n.calendarOptions,
                        theme: n.theme,
                        emitter: n.emitter
                    }, function(r, u, e, o) {
                        return f.setClassNames(r), f.setHeight(u), t(ee.Provider, {
                            value: f.customContentRenderId
                        }, t(gb, i({
                            isHeightAuto: e,
                            forPrint: o
                        }, n)))
                    }), f.el)
                } else f.isRendered && (f.isRendered = !1, kw(f.el), f.setClassNames([]), f.setHeight(""));
                gh()
            }, f.el = r, f.renderRunner = new ou(f.handleRenderRequest), new he({
                optionOverrides: u,
                calendarApi: f,
                onAction: f.handleAction,
                onData: f.handleData
            }), f
        }
        return u(r, n), Object.defineProperty(r.prototype, "view", {
            get: function() {
                return this.currentData.viewApi
            },
            enumerable: !1,
            configurable: !0
        }), r.prototype.render = function() {
            var n = this.isRendering;
            n ? this.customContentRenderId += 1 : this.isRendering = !0;
            this.renderRunner.request();
            n && this.updateSize()
        }, r.prototype.destroy = function() {
            this.isRendering && (this.isRendering = !1, this.renderRunner.request())
        }, r.prototype.updateSize = function() {
            n.prototype.updateSize.call(this);
            gh()
        }, r.prototype.batchRendering = function(n) {
            this.renderRunner.pause("batchRendering");
            n();
            this.renderRunner.resume("batchRendering")
        }, r.prototype.pauseRendering = function() {
            this.renderRunner.pause("pauseRendering")
        }, r.prototype.resumeRendering = function() {
            this.renderRunner.resume("pauseRendering", !0)
        }, r.prototype.resetOptions = function(n, t) {
            this.currentDataManager.resetOptions(n, t)
        }, r.prototype.setClassNames = function(n) {
            var u, t, f, r, e, i;
            if (!at(n, this.currentClassNames)) {
                for (u = this.el.classList, t = 0, f = this.currentClassNames; t < f.length; t++) i = f[t], u.remove(i);
                for (r = 0, e = n; r < e.length; r++) i = e[r], u.add(i);
                this.currentClassNames = n
            }
        }, r.prototype.setHeight = function(n) {
            us(this.el, "height", n)
        }, r
    }(sh);
    hu.touchMouseIgnoreWait = 500;
    var ul = 0,
        to = 0,
        fl = !1,
        io = function() {
            function n(n) {
                var t = this;
                this.subjectEl = null;
                this.selector = "";
                this.handleSelector = "";
                this.shouldIgnoreMove = !1;
                this.shouldWatchScroll = !0;
                this.isDragging = !1;
                this.isTouchDragging = !1;
                this.wasTouchScroll = !1;
                this.handleMouseDown = function(n) {
                    if (!t.shouldIgnoreMouse() && iht(n) && t.tryStart(n)) {
                        var i = t.createEventFromMouse(n, !0);
                        t.emitter.trigger("pointerdown", i);
                        t.initScrollWatch(i);
                        t.shouldIgnoreMove || document.addEventListener("mousemove", t.handleMouseMove);
                        document.addEventListener("mouseup", t.handleMouseUp)
                    }
                };
                this.handleMouseMove = function(n) {
                    var i = t.createEventFromMouse(n);
                    t.recordCoords(i);
                    t.emitter.trigger("pointermove", i)
                };
                this.handleMouseUp = function(n) {
                    document.removeEventListener("mousemove", t.handleMouseMove);
                    document.removeEventListener("mouseup", t.handleMouseUp);
                    t.emitter.trigger("pointerup", t.createEventFromMouse(n));
                    t.cleanup()
                };
                this.handleTouchStart = function(n) {
                    var r, i;
                    t.tryStart(n) && (t.isTouchDragging = !0, r = t.createEventFromTouch(n, !0), t.emitter.trigger("pointerdown", r), t.initScrollWatch(r), i = n.target, t.shouldIgnoreMove || i.addEventListener("touchmove", t.handleTouchMove), i.addEventListener("touchend", t.handleTouchEnd), i.addEventListener("touchcancel", t.handleTouchEnd), window.addEventListener("scroll", t.handleTouchScroll, !0))
                };
                this.handleTouchMove = function(n) {
                    var i = t.createEventFromTouch(n);
                    t.recordCoords(i);
                    t.emitter.trigger("pointermove", i)
                };
                this.handleTouchEnd = function(n) {
                    if (t.isDragging) {
                        var i = n.target;
                        i.removeEventListener("touchmove", t.handleTouchMove);
                        i.removeEventListener("touchend", t.handleTouchEnd);
                        i.removeEventListener("touchcancel", t.handleTouchEnd);
                        window.removeEventListener("scroll", t.handleTouchScroll, !0);
                        t.emitter.trigger("pointerup", t.createEventFromTouch(n));
                        t.cleanup();
                        t.isTouchDragging = !1;
                        rht()
                    }
                };
                this.handleTouchScroll = function() {
                    t.wasTouchScroll = !0
                };
                this.handleScroll = function(n) {
                    if (!t.shouldIgnoreMove) {
                        var i = window.pageXOffset - t.prevScrollX + t.prevPageX,
                            r = window.pageYOffset - t.prevScrollY + t.prevPageY;
                        t.emitter.trigger("pointermove", {
                            origEvent: n,
                            isTouch: t.isTouchDragging,
                            subjectEl: t.subjectEl,
                            pageX: i,
                            pageY: r,
                            deltaX: i - t.origPageX,
                            deltaY: r - t.origPageY
                        })
                    }
                };
                this.containerEl = n;
                this.emitter = new tr;
                n.addEventListener("mousedown", this.handleMouseDown);
                n.addEventListener("touchstart", this.handleTouchStart, {
                    passive: !0
                });
                uht()
            }
            return n.prototype.destroy = function() {
                this.containerEl.removeEventListener("mousedown", this.handleMouseDown);
                this.containerEl.removeEventListener("touchstart", this.handleTouchStart, {
                    passive: !0
                });
                fht()
            }, n.prototype.tryStart = function(n) {
                var t = this.querySubjectEl(n),
                    i = n.target;
                return t && (!this.handleSelector || w(i, this.handleSelector)) ? (this.subjectEl = t, this.isDragging = !0, this.wasTouchScroll = !1, !0) : !1
            }, n.prototype.cleanup = function() {
                fl = !1;
                this.isDragging = !1;
                this.subjectEl = null;
                this.destroyScrollWatch()
            }, n.prototype.querySubjectEl = function(n) {
                return this.selector ? w(n.target, this.selector) : this.containerEl
            }, n.prototype.shouldIgnoreMouse = function() {
                return ul || this.isTouchDragging
            }, n.prototype.cancelTouchScroll = function() {
                this.isDragging && (fl = !0)
            }, n.prototype.initScrollWatch = function(n) {
                this.shouldWatchScroll && (this.recordCoords(n), window.addEventListener("scroll", this.handleScroll, !0))
            }, n.prototype.recordCoords = function(n) {
                this.shouldWatchScroll && (this.prevPageX = n.pageX, this.prevPageY = n.pageY, this.prevScrollX = window.pageXOffset, this.prevScrollY = window.pageYOffset)
            }, n.prototype.destroyScrollWatch = function() {
                this.shouldWatchScroll && window.removeEventListener("scroll", this.handleScroll, !0)
            }, n.prototype.createEventFromMouse = function(n, t) {
                var i = 0,
                    r = 0;
                return t ? (this.origPageX = n.pageX, this.origPageY = n.pageY) : (i = n.pageX - this.origPageX, r = n.pageY - this.origPageY), {
                    origEvent: n,
                    isTouch: !1,
                    subjectEl: this.subjectEl,
                    pageX: n.pageX,
                    pageY: n.pageY,
                    deltaX: i,
                    deltaY: r
                }
            }, n.prototype.createEventFromTouch = function(n, t) {
                var u = n.touches,
                    i, r, f = 0,
                    e = 0;
                return u && u.length ? (i = u[0].pageX, r = u[0].pageY) : (i = n.pageX, r = n.pageY), t ? (this.origPageX = i, this.origPageY = r) : (f = i - this.origPageX, e = r - this.origPageY), {
                    origEvent: n,
                    isTouch: !0,
                    subjectEl: this.subjectEl,
                    pageX: i,
                    pageY: r,
                    deltaX: f,
                    deltaY: e
                }
            }, n
        }();
    var eht = function() {
        function n() {
            this.isVisible = !1;
            this.sourceEl = null;
            this.mirrorEl = null;
            this.sourceElRect = null;
            this.parentNode = document.body;
            this.zIndex = 9999;
            this.revertDuration = 0
        }
        return n.prototype.start = function(n, t, i) {
            this.sourceEl = n;
            this.sourceElRect = this.sourceEl.getBoundingClientRect();
            this.origScreenX = t - window.pageXOffset;
            this.origScreenY = i - window.pageYOffset;
            this.deltaX = 0;
            this.deltaY = 0;
            this.updateElPosition()
        }, n.prototype.handleMove = function(n, t) {
            this.deltaX = n - window.pageXOffset - this.origScreenX;
            this.deltaY = t - window.pageYOffset - this.origScreenY;
            this.updateElPosition()
        }, n.prototype.setIsVisible = function(n) {
            n ? this.isVisible || (this.mirrorEl && (this.mirrorEl.style.display = ""), this.isVisible = n, this.updateElPosition()) : this.isVisible && (this.mirrorEl && (this.mirrorEl.style.display = "none"), this.isVisible = n)
        }, n.prototype.stop = function(n, t) {
            var r = this,
                i = function() {
                    r.cleanup();
                    t()
                };
            n && this.mirrorEl && this.isVisible && this.revertDuration && (this.deltaX || this.deltaY) ? this.doRevertAnimation(i, this.revertDuration) : setTimeout(i, 0)
        }, n.prototype.doRevertAnimation = function(n, t) {
            var i = this.mirrorEl,
                r = this.sourceEl.getBoundingClientRect();
            i.style.transition = "top " + t + "ms,left " + t + "ms";
            wi(i, {
                left: r.left,
                top: r.top
            });
            ev(i, function() {
                i.style.transition = "";
                n()
            })
        }, n.prototype.cleanup = function() {
            this.mirrorEl && (gu(this.mirrorEl), this.mirrorEl = null);
            this.sourceEl = null
        }, n.prototype.updateElPosition = function() {
            this.sourceEl && this.isVisible && wi(this.getMirrorEl(), {
                left: this.sourceElRect.left + this.deltaX,
                top: this.sourceElRect.top + this.deltaY
            })
        }, n.prototype.getMirrorEl = function() {
            var t = this.sourceElRect,
                n = this.mirrorEl;
            return n || (n = this.mirrorEl = this.sourceEl.cloneNode(!0), n.classList.add("fc-unselectable"), n.classList.add("fc-event-dragging"), wi(n, {
                position: "fixed",
                zIndex: this.zIndex,
                visibility: "",
                boxSizing: "border-box",
                width: t.right - t.left,
                height: t.bottom - t.top,
                right: "auto",
                bottom: "auto",
                margin: 0
            }), this.parentNode.appendChild(n)), n
        }, n
    }(),
        id = function(n) {
            function t(t, i) {
                var r = n.call(this) || this;
                return r.handleScroll = function() {
                    r.scrollTop = r.scrollController.getScrollTop();
                    r.scrollLeft = r.scrollController.getScrollLeft();
                    r.handleScrollChange()
                }, r.scrollController = t, r.doesListening = i, r.scrollTop = r.origScrollTop = t.getScrollTop(), r.scrollLeft = r.origScrollLeft = t.getScrollLeft(), r.scrollWidth = t.getScrollWidth(), r.scrollHeight = t.getScrollHeight(), r.clientWidth = t.getClientWidth(), r.clientHeight = t.getClientHeight(), r.clientRect = r.computeClientRect(), r.doesListening && r.getEventTarget().addEventListener("scroll", r.handleScroll), r
            }
            return u(t, n), t.prototype.destroy = function() {
                this.doesListening && this.getEventTarget().removeEventListener("scroll", this.handleScroll)
            }, t.prototype.getScrollTop = function() {
                return this.scrollTop
            }, t.prototype.getScrollLeft = function() {
                return this.scrollLeft
            }, t.prototype.setScrollTop = function(n) {
                this.scrollController.setScrollTop(n);
                this.doesListening || (this.scrollTop = Math.max(Math.min(n, this.getMaxScrollTop()), 0), this.handleScrollChange())
            }, t.prototype.setScrollLeft = function(n) {
                this.scrollController.setScrollLeft(n);
                this.doesListening || (this.scrollLeft = Math.max(Math.min(n, this.getMaxScrollLeft()), 0), this.handleScrollChange())
            }, t.prototype.getClientWidth = function() {
                return this.clientWidth
            }, t.prototype.getClientHeight = function() {
                return this.clientHeight
            }, t.prototype.getScrollWidth = function() {
                return this.scrollWidth
            }, t.prototype.getScrollHeight = function() {
                return this.scrollHeight
            }, t.prototype.handleScrollChange = function() {}, t
        }(ue),
        rd = function(n) {
            function t(t, i) {
                return n.call(this, new yw(t), i) || this
            }
            return u(t, n), t.prototype.getEventTarget = function() {
                return this.scrollController.el
            }, t.prototype.computeClientRect = function() {
                return aw(this.scrollController.el)
            }, t
        }(id),
        oht = function(n) {
            function t(t) {
                return n.call(this, new pw, t) || this
            }
            return u(t, n), t.prototype.getEventTarget = function() {
                return window
            }, t.prototype.computeClientRect = function() {
                return {
                    left: this.scrollLeft,
                    right: this.scrollLeft + this.clientWidth,
                    top: this.scrollTop,
                    bottom: this.scrollTop + this.clientHeight
                }
            }, t.prototype.handleScrollChange = function() {
                this.clientRect = this.computeClientRect()
            }, t
        }(id),
        ud = typeof performance == "function" ? performance.now : Date.now,
        sht = function() {
            function n() {
                var n = this;
                this.isEnabled = !0;
                this.scrollQuery = [window, ".fc-scroller"];
                this.edgeThreshold = 50;
                this.maxVelocity = 300;
                this.pointerScreenX = null;
                this.pointerScreenY = null;
                this.isAnimating = !1;
                this.scrollCaches = null;
                this.everMovedUp = !1;
                this.everMovedDown = !1;
                this.everMovedLeft = !1;
                this.everMovedRight = !1;
                this.animate = function() {
                    var t, i;
                    n.isAnimating && (t = n.computeBestEdge(n.pointerScreenX + window.pageXOffset, n.pointerScreenY + window.pageYOffset), t ? (i = ud(), n.handleSide(t, (i - n.msSinceRequest) / 1e3), n.requestAnimation(i)) : n.isAnimating = !1)
                }
            }
            return n.prototype.start = function(n, t) {
                this.isEnabled && (this.scrollCaches = this.buildCaches(), this.pointerScreenX = null, this.pointerScreenY = null, this.everMovedUp = !1, this.everMovedDown = !1, this.everMovedLeft = !1, this.everMovedRight = !1, this.handleMove(n, t))
            }, n.prototype.handleMove = function(n, t) {
                if (this.isEnabled) {
                    var i = n - window.pageXOffset,
                        r = t - window.pageYOffset,
                        u = this.pointerScreenY === null ? 0 : r - this.pointerScreenY,
                        f = this.pointerScreenX === null ? 0 : i - this.pointerScreenX;
                    u < 0 ? this.everMovedUp = !0 : u > 0 && (this.everMovedDown = !0);
                    f < 0 ? this.everMovedLeft = !0 : f > 0 && (this.everMovedRight = !0);
                    this.pointerScreenX = i;
                    this.pointerScreenY = r;
                    this.isAnimating || (this.isAnimating = !0, this.requestAnimation(ud()))
                }
            }, n.prototype.stop = function() {
                var n, t, i;
                if (this.isEnabled) {
                    for (this.isAnimating = !1, n = 0, t = this.scrollCaches; n < t.length; n++) i = t[n], i.destroy();
                    this.scrollCaches = null
                }
            }, n.prototype.requestAnimation = function(n) {
                this.msSinceRequest = n;
                requestAnimationFrame(this.animate)
            }, n.prototype.handleSide = function(n, t) {
                var i = n.scrollCache,
                    u = this.edgeThreshold,
                    f = u - n.distance,
                    e = f * f / (u * u) * this.maxVelocity * t,
                    r = 1;
                switch (n.name) {
                    case "left":
                        r = -1;
                    case "right":
                        i.setScrollLeft(i.getScrollLeft() + e * r);
                        break;
                    case "top":
                        r = -1;
                    case "bottom":
                        i.setScrollTop(i.getScrollTop() + e * r)
                }
            }, n.prototype.computeBestEdge = function(n, t) {
                for (var u = this.edgeThreshold, i = null, c = 0, l = this.scrollCaches; c < l.length; c++) {
                    var r = l[c],
                        f = r.clientRect,
                        e = n - f.left,
                        o = f.right - n,
                        s = t - f.top,
                        h = f.bottom - t;
                    e >= 0 && o >= 0 && s >= 0 && h >= 0 && (s <= u && this.everMovedUp && r.canScrollUp() && (!i || i.distance > s) && (i = {
                        scrollCache: r,
                        name: "top",
                        distance: s
                    }), h <= u && this.everMovedDown && r.canScrollDown() && (!i || i.distance > h) && (i = {
                        scrollCache: r,
                        name: "bottom",
                        distance: h
                    }), e <= u && this.everMovedLeft && r.canScrollLeft() && (!i || i.distance > e) && (i = {
                        scrollCache: r,
                        name: "left",
                        distance: e
                    }), o <= u && this.everMovedRight && r.canScrollRight() && (!i || i.distance > o) && (i = {
                        scrollCache: r,
                        name: "right",
                        distance: o
                    }))
                }
                return i
            }, n.prototype.buildCaches = function() {
                return this.queryScrollEls().map(function(n) {
                    return n === window ? new oht(!1) : new rd(n, !1)
                })
            }, n.prototype.queryScrollEls = function() {
                for (var t, n = [], i = 0, r = this.scrollQuery; i < r.length; i++) t = r[i], typeof t == "object" ? n.push(t) : n.push.apply(n, Array.prototype.slice.call(document.querySelectorAll(t)));
                return n
            }, n
        }(),
        yi = function(n) {
            function t(t, i) {
                var r = n.call(this, t) || this,
                    u;
                r.delay = null;
                r.minDistance = 0;
                r.touchScrollAllowed = !0;
                r.mirrorNeedsRevert = !1;
                r.isInteracting = !1;
                r.isDragging = !1;
                r.isDelayEnded = !1;
                r.isDistanceSurpassed = !1;
                r.delayTimeoutId = null;
                r.onPointerDown = function(n) {
                    r.isDragging || (r.isInteracting = !0, r.isDelayEnded = !1, r.isDistanceSurpassed = !1, ov(document.body), hv(document.body), n.isTouch || n.origEvent.preventDefault(), r.emitter.trigger("pointerdown", n), r.isInteracting && !r.pointer.shouldIgnoreMove && (r.mirror.setIsVisible(!1), r.mirror.start(n.subjectEl, n.pageX, n.pageY), r.startDelay(n), r.minDistance || r.handleDistanceSurpassed(n)))
                };
                r.onPointerMove = function(n) {
                    if (r.isInteracting) {
                        if (r.emitter.trigger("pointermove", n), !r.isDistanceSurpassed) {
                            var t = r.minDistance,
                                i = void 0,
                                u = n.deltaX,
                                f = n.deltaY;
                            i = u * u + f * f;
                            i >= t * t && r.handleDistanceSurpassed(n)
                        }
                        r.isDragging && (n.origEvent.type !== "scroll" && (r.mirror.handleMove(n.pageX, n.pageY), r.autoScroller.handleMove(n.pageX, n.pageY)), r.emitter.trigger("dragmove", n))
                    }
                };
                r.onPointerUp = function(n) {
                    r.isInteracting && (r.isInteracting = !1, sv(document.body), cv(document.body), r.emitter.trigger("pointerup", n), r.isDragging && (r.autoScroller.stop(), r.tryStopDrag(n)), r.delayTimeoutId && (clearTimeout(r.delayTimeoutId), r.delayTimeoutId = null))
                };
                u = r.pointer = new io(t);
                u.emitter.on("pointerdown", r.onPointerDown);
                u.emitter.on("pointermove", r.onPointerMove);
                u.emitter.on("pointerup", r.onPointerUp);
                return i && (u.selector = i), r.mirror = new eht, r.autoScroller = new sht, r
            }
            return u(t, n), t.prototype.destroy = function() {
                this.pointer.destroy();
                this.onPointerUp({})
            }, t.prototype.startDelay = function(n) {
                var t = this;
                typeof this.delay == "number" ? this.delayTimeoutId = setTimeout(function() {
                    t.delayTimeoutId = null;
                    t.handleDelayEnd(n)
                }, this.delay) : this.handleDelayEnd(n)
            }, t.prototype.handleDelayEnd = function(n) {
                this.isDelayEnded = !0;
                this.tryStartDrag(n)
            }, t.prototype.handleDistanceSurpassed = function(n) {
                this.isDistanceSurpassed = !0;
                this.tryStartDrag(n)
            }, t.prototype.tryStartDrag = function(n) {
                this.isDelayEnded && this.isDistanceSurpassed && (!this.pointer.wasTouchScroll || this.touchScrollAllowed) && (this.isDragging = !0, this.mirrorNeedsRevert = !1, this.autoScroller.start(n.pageX, n.pageY), this.emitter.trigger("dragstart", n), this.touchScrollAllowed === !1 && this.pointer.cancelTouchScroll())
            }, t.prototype.tryStopDrag = function(n) {
                this.mirror.stop(this.mirrorNeedsRevert, this.stopDrag.bind(this, n))
            }, t.prototype.stopDrag = function(n) {
                this.isDragging = !1;
                this.emitter.trigger("dragend", n)
            }, t.prototype.setIgnoreMove = function(n) {
                this.pointer.shouldIgnoreMove = n
            }, t.prototype.setMirrorIsVisible = function(n) {
                this.mirror.setIsVisible(n)
            }, t.prototype.setMirrorNeedsRevert = function(n) {
                this.mirrorNeedsRevert = n
            }, t.prototype.setAutoScrollEnabled = function(n) {
                this.autoScroller.isEnabled = n
            }, t
        }(cc),
        hht = function() {
            function n(n) {
                this.origRect = re(n);
                this.scrollCaches = kh(n).map(function(n) {
                    return new rd(n, !0)
                })
            }
            return n.prototype.destroy = function() {
                for (var i, n = 0, t = this.scrollCaches; n < t.length; n++) i = t[n], i.destroy()
            }, n.prototype.computeLeft = function() {
                for (var t, i = this.origRect.left, n = 0, r = this.scrollCaches; n < r.length; n++) t = r[n], i += t.origScrollLeft - t.getScrollLeft();
                return i
            }, n.prototype.computeTop = function() {
                for (var t, i = this.origRect.top, n = 0, r = this.scrollCaches; n < r.length; n++) t = r[n], i += t.origScrollTop - t.getScrollTop();
                return i
            }, n.prototype.isWithinClipping = function(n, t) {
                for (var r, f = {
                    left: n,
                    top: t
                }, i = 0, u = this.scrollCaches; i < u.length; i++) if (r = u[i], !cht(r.getEventTarget()) && !uw(f, r.clientRect)) return !1;
                return !0
            }, n
        }();
    fr = function() {
        function n(n, t) {
            var i = this;
            this.useSubjectCenter = !1;
            this.requireInitial = !0;
            this.initialHit = null;
            this.movingHit = null;
            this.finalHit = null;
            this.handlePointerDown = function(n) {
                var t = i.dragging;
                i.initialHit = null;
                i.movingHit = null;
                i.finalHit = null;
                i.prepareHits();
                i.processFirstCoord(n);
                i.initialHit || !i.requireInitial ? (t.setIgnoreMove(!1), i.emitter.trigger("pointerdown", n)) : t.setIgnoreMove(!0)
            };
            this.handleDragStart = function(n) {
                i.emitter.trigger("dragstart", n);
                i.handleMove(n, !0)
            };
            this.handleDragMove = function(n) {
                i.emitter.trigger("dragmove", n);
                i.handleMove(n)
            };
            this.handlePointerUp = function(n) {
                i.releaseHits();
                i.emitter.trigger("pointerup", n)
            };
            this.handleDragEnd = function(n) {
                i.movingHit && i.emitter.trigger("hitupdate", null, !0, n);
                i.finalHit = i.movingHit;
                i.movingHit = null;
                i.emitter.trigger("dragend", n)
            };
            this.droppableStore = t;
            n.emitter.on("pointerdown", this.handlePointerDown);
            n.emitter.on("dragstart", this.handleDragStart);
            n.emitter.on("dragmove", this.handleDragMove);
            n.emitter.on("pointerup", this.handlePointerUp);
            n.emitter.on("dragend", this.handleDragEnd);
            this.dragging = n;
            this.emitter = new tr
        }
        return n.prototype.processFirstCoord = function(n) {
            var f = {
                left: n.pageX,
                top: n.pageY
            }, t = f,
                e = n.subjectEl,
                i, r, u;
            e !== document && (i = re(e), t = fw(t, i));
            r = this.initialHit = this.queryHitForOffset(t.left, t.top);
            r ? (this.useSubjectCenter && i && (u = vh(i, r.rect), u && (t = ew(u))), this.coordAdjust = ow(t, f)) : this.coordAdjust = {
                left: 0,
                top: 0
            }
        }, n.prototype.handleMove = function(n, t) {
            var i = this.queryHitForOffset(n.pageX + this.coordAdjust.left, n.pageY + this.coordAdjust.top);
            (t || !ro(this.movingHit, i)) && (this.movingHit = i, this.emitter.trigger("hitupdate", i, !1, n))
        }, n.prototype.prepareHits = function() {
            this.offsetTrackers = ut(this.droppableStore, function(n) {
                return n.component.prepareHits(), new hht(n.el)
            })
        }, n.prototype.releaseHits = function() {
            var n = this.offsetTrackers;
            for (var t in n) n[t].destroy();
            this.offsetTrackers = {}
        }, n.prototype.queryHitForOffset = function(n, t) {
            var a = this,
                v = a.droppableStore,
                w = a.offsetTrackers,
                u = null,
                f, o, r, i;
            for (f in v) if (o = v[f].component, r = w[f], r && r.isWithinClipping(n, t)) {
                var s = r.computeLeft(),
                    h = r.computeTop(),
                    c = n - s,
                    l = t - h,
                    e = r.origRect,
                    y = e.right - e.left,
                    p = e.bottom - e.top;
                c >= 0 && c < y && l >= 0 && l < p && (i = o.queryHit(c, l, y, p), i && tu(i.dateProfile.activeRange, i.dateSpan.range) && (!u || i.layer > u.layer) && (i.componentId = f, i.context = o.context, i.rect.left += s, i.rect.right += s, i.rect.top += h, i.rect.bottom += h, u = i))
            }
            return u
        }, n
    }();
    fd = function(n) {
        function t(t) {
            var r = n.call(this, t) || this,
                u;
            r.handlePointerDown = function(n) {
                var t = r.dragging,
                    i = n.origEvent.target;
                t.setIgnoreMove(!r.component.isValidDateDownEl(i))
            };
            r.handleDragEnd = function(n) {
                var s = r.component,
                    h = r.dragging.pointer,
                    t, o;
                if (!h.wasTouchScroll) {
                    var f = r.hitDragging,
                        u = f.initialHit,
                        e = f.finalHit;
                    u && e && ro(u, e) && (t = s.context, o = i(i({}, el(u.dateSpan, t)), {
                        dayEl: u.dayEl,
                        jsEvent: n.origEvent,
                        view: t.viewApi || t.calendarApi.view
                    }), t.emitter.trigger("dateClick", o))
                }
            };
            r.dragging = new yi(t.el);
            r.dragging.autoScroller.isEnabled = !1;
            u = r.hitDragging = new fr(r.dragging, le(t));
            u.emitter.on("pointerdown", r.handlePointerDown);
            u.emitter.on("dragend", r.handleDragEnd);
            return r
        }
        return u(t, n), t.prototype.destroy = function() {
            this.dragging.destroy()
        }, t
    }(ei);
    ed = function(n) {
        function t(t) {
            var i = n.call(this, t) || this,
                r;
            i.dragSelection = null;
            i.handlePointerDown = function(n) {
                var r = i,
                    t = r.component,
                    u = r.dragging,
                    f = t.context.options,
                    e = f.selectable && t.isValidDateDownEl(n.origEvent.target);
                u.setIgnoreMove(!e);
                u.delay = n.isTouch ? aht(t) : null
            };
            i.handleDragStart = function(n) {
                i.component.context.calendarApi.unselect(n)
            };
            i.handleHitUpdate = function(n, t) {
                var u = i.component.context,
                    r = null,
                    e = !1,
                    f, o;
                n && (f = i.hitDragging.initialHit, o = n.componentId === f.componentId && i.isHitComboAllowed && !i.isHitComboAllowed(f, n), o || (r = vht(f, n, u.pluginHooks.dateSelectionTransformers)), r && fk(r, n.dateProfile, u) || (e = !0, r = null));
                r ? u.dispatch({
                    type: "SELECT_DATES",
                    selection: r
                }) : t || u.dispatch({
                    type: "UNSELECT_DATES"
                });
                e ? hr() : cr();
                t || (i.dragSelection = r)
            };
            i.handlePointerUp = function(n) {
                i.dragSelection && (fh(i.dragSelection, n, i.component.context), i.dragSelection = null)
            };
            var e = t.component,
                f = e.context.options,
                u = i.dragging = new yi(t.el);
            u.touchScrollAllowed = !1;
            u.minDistance = f.selectMinDistance || 0;
            u.autoScroller.isEnabled = f.dragScroll;
            r = i.hitDragging = new fr(i.dragging, le(t));
            r.emitter.on("pointerdown", i.handlePointerDown);
            r.emitter.on("dragstart", i.handleDragStart);
            r.emitter.on("hitupdate", i.handleHitUpdate);
            r.emitter.on("pointerup", i.handlePointerUp);
            return i
        }
        return u(t, n), t.prototype.destroy = function() {
            this.dragging.destroy()
        }, t
    }(ei);
    ol = function(n) {
        function t(r) {
            var u = n.call(this, r) || this,
                f;
            u.subjectEl = null;
            u.subjectSeg = null;
            u.isDragging = !1;
            u.eventRange = null;
            u.relevantEvents = null;
            u.receivingContext = null;
            u.validMutation = null;
            u.mutatedRelevantEvents = null;
            u.handlePointerDown = function(n) {
                var f = n.origEvent.target,
                    o = u,
                    t = o.component,
                    i = o.dragging,
                    s = i.mirror,
                    r = t.context.options,
                    c = t.context,
                    e;
                u.subjectEl = n.subjectEl;
                var l = u.subjectSeg = ai(n.subjectEl),
                    a = u.eventRange = l.eventRange,
                    h = a.instance.instanceId;
                u.relevantEvents = cf(c.getCurrentData().eventStore, h);
                i.minDistance = n.isTouch ? 0 : r.eventDragMinDistance;
                i.delay = n.isTouch && h !== t.props.eventSelection ? pht(t) : null;
                s.parentNode = r.fixedMirrorParent ? r.fixedMirrorParent : w(f, ".fc");
                s.revertDuration = r.dragRevertDuration;
                e = t.isValidSegDownEl(f) && !w(f, ".fc-event-resizer");
                i.setIgnoreMove(!e);
                u.isDragging = e && n.subjectEl.classList.contains("fc-event-draggable")
            };
            u.handleDragStart = function(n) {
                var t = u.component.context,
                    i = u.eventRange,
                    r = i.instance.instanceId;
                n.isTouch ? r !== u.component.props.eventSelection && t.dispatch({
                    type: "SELECT_EVENT",
                    eventInstanceId: r
                }) : t.dispatch({
                    type: "UNSELECT_EVENT"
                });
                u.isDragging && (t.calendarApi.unselect(n), t.emitter.trigger("eventDragStart", {
                    el: u.subjectEl,
                    event: new l(t, i.def, i.instance),
                    jsEvent: n.origEvent,
                    view: t.viewApi
                }))
            };
            u.handleHitUpdate = function(n, t) {
                var o;
                if (u.isDragging) {
                    var s = u.relevantEvents,
                        h = u.hitDragging.initialHit,
                        c = u.component.context,
                        i = null,
                        r = null,
                        f = null,
                        l = !1,
                        e = {
                            affectedEvents: s,
                            mutatedEvents: b(),
                            isEvent: !0
                        };
                    n && (i = n.context, o = i.options, c === i || o.editable && o.droppable ? (r = yht(h, n, i.getCurrentData().pluginHooks.eventDragMutationMassagers), r && (f = gf(s, i.getCurrentData().eventUiBases, r, i), e.mutatedEvents = f, ye(e, n.dateProfile, i) || (l = !0, r = null, f = null, e.mutatedEvents = b()))) : i = null);
                    u.displayDrag(i, e);
                    l ? hr() : cr();
                    t || (c === i && ro(h, n) && (r = null), u.dragging.setMirrorNeedsRevert(!r), u.dragging.setMirrorIsVisible(!n || !document.querySelector(".fc-event-mirror")), u.receivingContext = i, u.validMutation = r, u.mutatedRelevantEvents = f)
                }
            };
            u.handlePointerUp = function() {
                u.isDragging || u.cleanup()
            };
            u.handleDragEnd = function(n) {
                var nt, p, w, s, b, tt, k, d;
                if (u.isDragging) {
                    var t = u.component.context,
                        h = t.viewApi,
                        g = u,
                        r = g.receivingContext,
                        c = g.validMutation,
                        a = u.eventRange.def,
                        e = u.eventRange.instance,
                        v = new l(t, a, e),
                        o = u.relevantEvents,
                        f = u.mutatedRelevantEvents,
                        y = u.hitDragging.finalHit;
                    if (u.clearDrag(), t.emitter.trigger("eventDragStop", {
                        el: u.subjectEl,
                        event: v,
                        jsEvent: n.origEvent,
                        view: h
                    }), c) {
                        if (r === t) {
                            for (nt = new l(t, f.defs[a.defId], e ? f.instances[e.instanceId] : null), t.dispatch({
                                type: "MERGE_EVENTS",
                                eventStore: f
                            }), p = {
                                oldEvent: v,
                                event: nt,
                                relatedEvents: ri(f, t, e),
                                revert: function() {
                                    t.dispatch({
                                        type: "MERGE_EVENTS",
                                        eventStore: o
                                    })
                                }
                            }, w = {}, s = 0, b = t.getCurrentData().pluginHooks.eventDropTransformers; s < b.length; s++) tt = b[s], i(w, tt(c, t));
                            t.emitter.trigger("eventDrop", i(i(i({}, p), w), {
                                el: n.subjectEl,
                                delta: c.datesDelta,
                                jsEvent: n.origEvent,
                                view: h
                            }));
                            t.emitter.trigger("eventChange", p)
                        } else if (r) {
                            k = {
                                event: v,
                                relatedEvents: ri(o, t, e),
                                revert: function() {
                                    t.dispatch({
                                        type: "MERGE_EVENTS",
                                        eventStore: o
                                    })
                                }
                            };
                            t.emitter.trigger("eventLeave", i(i({}, k), {
                                draggedEl: n.subjectEl,
                                view: h
                            }));
                            t.dispatch({
                                type: "REMOVE_EVENTS",
                                eventStore: o
                            });
                            t.emitter.trigger("eventRemove", k);
                            var rt = f.defs[a.defId],
                                it = f.instances[e.instanceId],
                                ut = new l(r, rt, it);
                            r.dispatch({
                                type: "MERGE_EVENTS",
                                eventStore: f
                            });
                            d = {
                                event: ut,
                                relatedEvents: ri(f, r, it),
                                revert: function() {
                                    r.dispatch({
                                        type: "REMOVE_EVENTS",
                                        eventStore: f
                                    })
                                }
                            };
                            r.emitter.trigger("eventAdd", d);
                            n.isTouch && r.dispatch({
                                type: "SELECT_EVENT",
                                eventInstanceId: e.instanceId
                            });
                            r.emitter.trigger("drop", i(i({}, el(y.dateSpan, r)), {
                                draggedEl: n.subjectEl,
                                jsEvent: n.origEvent,
                                view: y.context.viewApi
                            }));
                            r.emitter.trigger("eventReceive", i(i({}, d), {
                                draggedEl: n.subjectEl,
                                view: y.context.viewApi
                            }))
                        }
                    } else t.emitter.trigger("_noEventDrop")
                }
                u.cleanup()
            };
            var o = u.component,
                s = o.context.options,
                e = u.dragging = new yi(r.el);
            e.pointer.selector = t.SELECTOR;
            e.touchScrollAllowed = !1;
            e.autoScroller.isEnabled = s.dragScroll;
            f = u.hitDragging = new fr(u.dragging, su);
            f.useSubjectCenter = r.useEventCenter;
            f.emitter.on("pointerdown", u.handlePointerDown);
            f.emitter.on("dragstart", u.handleDragStart);
            f.emitter.on("hitupdate", u.handleHitUpdate);
            f.emitter.on("pointerup", u.handlePointerUp);
            f.emitter.on("dragend", u.handleDragEnd);
            return u
        }
        return u(t, n), t.prototype.destroy = function() {
            this.dragging.destroy()
        }, t.prototype.displayDrag = function(n, t) {
            var r = this.component.context,
                i = this.receivingContext;
            i && i !== n && (i === r ? i.dispatch({
                type: "SET_EVENT_DRAG",
                state: {
                    affectedEvents: t.affectedEvents,
                    mutatedEvents: b(),
                    isEvent: !0
                }
            }) : i.dispatch({
                type: "UNSET_EVENT_DRAG"
            }));
            n && n.dispatch({
                type: "SET_EVENT_DRAG",
                state: t
            })
        }, t.prototype.clearDrag = function() {
            var t = this.component.context,
                n = this.receivingContext;
            n && n.dispatch({
                type: "UNSET_EVENT_DRAG"
            });
            t !== n && t.dispatch({
                type: "UNSET_EVENT_DRAG"
            })
        }, t.prototype.cleanup = function() {
            this.subjectSeg = null;
            this.isDragging = !1;
            this.eventRange = null;
            this.relevantEvents = null;
            this.receivingContext = null;
            this.validMutation = null;
            this.mutatedRelevantEvents = null
        }, t.SELECTOR = ".fc-event-draggable, .fc-event-resizable", t
    }(ei);
    od = function(n) {
        function t(t) {
            var r = n.call(this, t) || this,
                e, f, u;
            r.draggingSegEl = null;
            r.draggingSeg = null;
            r.eventRange = null;
            r.relevantEvents = null;
            r.validMutation = null;
            r.mutatedRelevantEvents = null;
            r.handlePointerDown = function(n) {
                var t = r.component,
                    i = r.querySegEl(n),
                    u = ai(i),
                    f = r.eventRange = u.eventRange;
                r.dragging.minDistance = t.context.options.eventDragMinDistance;
                r.dragging.setIgnoreMove(!r.component.isValidSegDownEl(n.origEvent.target) || n.isTouch && r.component.props.eventSelection !== f.instance.instanceId)
            };
            r.handleDragStart = function(n) {
                var t = r.component.context,
                    u = r.eventRange,
                    i;
                r.relevantEvents = cf(t.getCurrentData().eventStore, r.eventRange.instance.instanceId);
                i = r.querySegEl(n);
                r.draggingSegEl = i;
                r.draggingSeg = ai(i);
                t.calendarApi.unselect();
                t.emitter.trigger("eventResizeStart", {
                    el: i,
                    event: new l(t, u.def, u.instance),
                    jsEvent: n.origEvent,
                    view: t.viewApi
                })
            };
            r.handleHitUpdate = function(n, t, i) {
                var f = r.component.context,
                    h = r.relevantEvents,
                    o = r.hitDragging.initialHit,
                    a = r.eventRange.instance,
                    u = null,
                    e = null,
                    c = !1,
                    s = {
                        affectedEvents: h,
                        mutatedEvents: b(),
                        isEvent: !0
                    }, l;
                n && (l = n.componentId === o.componentId && r.isHitComboAllowed && !r.isHitComboAllowed(o, n), l || (u = wht(o, n, i.subjectEl.classList.contains("fc-event-resizer-start"), a.range)));
                u && (e = gf(h, f.getCurrentData().eventUiBases, u, f), s.mutatedEvents = e, ye(s, n.dateProfile, f) || (c = !0, u = null, e = null, s.mutatedEvents = null));
                e ? f.dispatch({
                    type: "SET_EVENT_RESIZE",
                    state: s
                }) : f.dispatch({
                    type: "UNSET_EVENT_RESIZE"
                });
                c ? hr() : cr();
                t || (u && ro(o, n) && (u = null), r.validMutation = u, r.mutatedRelevantEvents = e)
            };
            r.handleDragEnd = function(n) {
                var t = r.component.context,
                    s = r.eventRange.def,
                    u = r.eventRange.instance,
                    h = new l(t, s, u),
                    a = r.relevantEvents,
                    f = r.mutatedRelevantEvents,
                    c, e;
                t.emitter.trigger("eventResizeStop", {
                    el: r.draggingSegEl,
                    event: h,
                    jsEvent: n.origEvent,
                    view: t.viewApi
                });
                r.validMutation ? (c = new l(t, f.defs[s.defId], u ? f.instances[u.instanceId] : null), t.dispatch({
                    type: "MERGE_EVENTS",
                    eventStore: f
                }), e = {
                    oldEvent: h,
                    event: c,
                    relatedEvents: ri(f, t, u),
                    revert: function() {
                        t.dispatch({
                            type: "MERGE_EVENTS",
                            eventStore: a
                        })
                    }
                }, t.emitter.trigger("eventResize", i(i({}, e), {
                    el: r.draggingSegEl,
                    startDelta: r.validMutation.startDelta || o(0),
                    endDelta: r.validMutation.endDelta || o(0),
                    jsEvent: n.origEvent,
                    view: t.viewApi
                })), t.emitter.trigger("eventChange", e)) : t.emitter.trigger("_noEventResize");
                r.draggingSeg = null;
                r.relevantEvents = null;
                r.validMutation = null
            };
            e = t.component;
            f = r.dragging = new yi(t.el);
            f.pointer.selector = ".fc-event-resizer";
            f.touchScrollAllowed = !1;
            f.autoScroller.isEnabled = e.context.options.dragScroll;
            u = r.hitDragging = new fr(r.dragging, le(t));
            u.emitter.on("pointerdown", r.handlePointerDown);
            u.emitter.on("dragstart", r.handleDragStart);
            u.emitter.on("hitupdate", r.handleHitUpdate);
            u.emitter.on("dragend", r.handleDragEnd);
            return r
        }
        return u(t, n), t.prototype.destroy = function() {
            this.dragging.destroy()
        }, t.prototype.querySegEl = function(n) {
            return w(n.subjectEl, ".fc-event")
        }, t
    }(ei);
    var bht = function() {
        function n(n) {
            var t = this,
                i;
            this.context = n;
            this.isRecentPointerDateSelect = !1;
            this.matchesCancel = !1;
            this.matchesEvent = !1;
            this.onSelect = function(n) {
                n.jsEvent && (t.isRecentPointerDateSelect = !0)
            };
            this.onDocumentPointerDown = function(n) {
                var r = t.context.options.unselectCancel,
                    i = n.origEvent.target;
                t.matchesCancel = !! w(i, r);
                t.matchesEvent = !! w(i, ol.SELECTOR)
            };
            this.onDocumentPointerUp = function(n) {
                var i = t.context,
                    f = t.documentPointer,
                    u = i.getCurrentData(),
                    r;
                f.wasTouchScroll || (u.dateSelection && !t.isRecentPointerDateSelect && (r = i.options.unselectAuto, !r || r && t.matchesCancel || i.calendarApi.unselect(n)), u.eventSelection && !t.matchesEvent && i.dispatch({
                    type: "UNSELECT_EVENT"
                }));
                t.isRecentPointerDateSelect = !1
            };
            i = this.documentPointer = new io(document);
            i.shouldIgnoreMove = !0;
            i.shouldWatchScroll = !1;
            i.emitter.on("pointerdown", this.onDocumentPointerDown);
            i.emitter.on("pointerup", this.onDocumentPointerUp);
            n.emitter.on("select", this.onSelect)
        }
        return n.prototype.destroy = function() {
            this.context.emitter.off("select", this.onSelect);
            this.documentPointer.destroy()
        }, n
    }(),
        kht = {
            fixedMirrorParent: r
        }, dht = {
            dateClick: r,
            eventDragStart: r,
            eventDragStop: r,
            eventDrop: r,
            eventResizeStart: r,
            eventResizeStop: r,
            eventResize: r,
            drop: r,
            eventReceive: r,
            eventLeave: r
        }, sd = function() {
            function n(n, t) {
                var r = this,
                    u;
                this.receivingContext = null;
                this.droppableEvent = null;
                this.suppliedDragMeta = null;
                this.dragMeta = null;
                this.handleDragStart = function(n) {
                    r.dragMeta = r.buildDragMeta(n.subjectEl)
                };
                this.handleHitUpdate = function(n, t, i) {
                    var s = r.hitDragging.dragging,
                        u = null,
                        f = null,
                        o = !1,
                        e = {
                            affectedEvents: b(),
                            mutatedEvents: b(),
                            isEvent: r.dragMeta.create
                        };
                    n && (u = n.context, r.canDropElOnCalendar(i.subjectEl, u) && (f = ght(n.dateSpan, r.dragMeta, u), e.mutatedEvents = di(f), o = !ye(e, n.dateProfile, u), o && (e.mutatedEvents = b(), f = null)));
                    r.displayDrag(u, e);
                    s.setMirrorIsVisible(t || !f || !document.querySelector(".fc-event-mirror"));
                    o ? hr() : cr();
                    t || (s.setMirrorNeedsRevert(!f), r.receivingContext = u, r.droppableEvent = f)
                };
                this.handleDragEnd = function(n) {
                    var e = r,
                        t = e.receivingContext,
                        u = e.droppableEvent,
                        f;
                    if (r.clearDrag(), t && u) {
                        var o = r.hitDragging.finalHit,
                            s = o.context.viewApi,
                            h = r.dragMeta;
                        t.emitter.trigger("drop", i(i({}, el(o.dateSpan, t)), {
                            draggedEl: n.subjectEl,
                            jsEvent: n.origEvent,
                            view: s
                        }));
                        h.create && (f = di(u), t.dispatch({
                            type: "MERGE_EVENTS",
                            eventStore: f
                        }), n.isTouch && t.dispatch({
                            type: "SELECT_EVENT",
                            eventInstanceId: u.instance.instanceId
                        }), t.emitter.trigger("eventReceive", {
                            event: new l(t, u.def, u.instance),
                            relatedEvents: [],
                            revert: function() {
                                t.dispatch({
                                    type: "REMOVE_EVENTS",
                                    eventStore: f
                                })
                            },
                            draggedEl: n.subjectEl,
                            view: s
                        }))
                    }
                    r.receivingContext = null;
                    r.droppableEvent = null
                };
                u = this.hitDragging = new fr(n, su);
                u.requireInitial = !1;
                u.emitter.on("dragstart", this.handleDragStart);
                u.emitter.on("hitupdate", this.handleHitUpdate);
                u.emitter.on("dragend", this.handleDragEnd);
                this.suppliedDragMeta = t
            }
            return n.prototype.buildDragMeta = function(n) {
                return typeof this.suppliedDragMeta == "object" ? ae(this.suppliedDragMeta) : typeof this.suppliedDragMeta == "function" ? ae(this.suppliedDragMeta(n)) : nct(n)
            }, n.prototype.displayDrag = function(n, t) {
                var i = this.receivingContext;
                i && i !== n && i.dispatch({
                    type: "UNSET_EVENT_DRAG"
                });
                n && n.dispatch({
                    type: "SET_EVENT_DRAG",
                    state: t
                })
            }, n.prototype.clearDrag = function() {
                this.receivingContext && this.receivingContext.dispatch({
                    type: "UNSET_EVENT_DRAG"
                })
            }, n.prototype.canDropElOnCalendar = function(n, t) {
                var i = t.options.dropAccept;
                return typeof i == "function" ? i.call(t.calendarApi, n) : typeof i == "string" && i ? Boolean(nf(n, i)) : !0
            }, n
        }();
    hu.dataAttrPrefix = "";
    var ict = function() {
        function n(n, t) {
            var r = this,
                i;
            t === void 0 && (t = {});
            this.handlePointerDown = function(n) {
                var t = r.dragging,
                    i = r.settings,
                    u = i.minDistance,
                    f = i.longPressDelay;
                t.minDistance = u != null ? u : n.isTouch ? 0 : vt.eventDragMinDistance;
                t.delay = n.isTouch ? f != null ? f : vt.longPressDelay : 0
            };
            this.handleDragStart = function(n) {
                n.isTouch && r.dragging.delay && n.subjectEl.classList.contains("fc-event") && r.dragging.mirror.getMirrorEl().classList.add("fc-event-selected")
            };
            this.settings = t;
            i = this.dragging = new yi(n);
            i.touchScrollAllowed = !1;
            t.itemSelector != null && (i.pointer.selector = t.itemSelector);
            t.appendTo != null && (i.mirror.parentNode = t.appendTo);
            i.emitter.on("pointerdown", this.handlePointerDown);
            i.emitter.on("dragstart", this.handleDragStart);
            new sd(i, t.eventData)
        }
        return n.prototype.destroy = function() {
            this.dragging.destroy()
        }, n
    }(),
        rct = function(n) {
            function t(t) {
                var i = n.call(this, t) || this,
                    r;
                i.shouldIgnoreMove = !1;
                i.mirrorSelector = "";
                i.currentMirrorEl = null;
                i.handlePointerDown = function(n) {
                    i.emitter.trigger("pointerdown", n);
                    i.shouldIgnoreMove || i.emitter.trigger("dragstart", n)
                };
                i.handlePointerMove = function(n) {
                    i.shouldIgnoreMove || i.emitter.trigger("dragmove", n)
                };
                i.handlePointerUp = function(n) {
                    i.emitter.trigger("pointerup", n);
                    i.shouldIgnoreMove || i.emitter.trigger("dragend", n)
                };
                r = i.pointer = new io(t);
                r.emitter.on("pointerdown", i.handlePointerDown);
                r.emitter.on("pointermove", i.handlePointerMove);
                r.emitter.on("pointerup", i.handlePointerUp);
                return i
            }
            return u(t, n), t.prototype.destroy = function() {
                this.pointer.destroy()
            }, t.prototype.setIgnoreMove = function(n) {
                this.shouldIgnoreMove = n
            }, t.prototype.setMirrorIsVisible = function(n) {
                if (n) this.currentMirrorEl && (this.currentMirrorEl.style.visibility = "", this.currentMirrorEl = null);
                else {
                    var t = this.mirrorSelector ? document.querySelector(this.mirrorSelector) : null;
                    t && (this.currentMirrorEl = t, t.style.visibility = "hidden")
                }
            }, t
        }(cc),
        uct = function() {
            function n(n, t) {
                var r = document,
                    i;
                n === document || n instanceof Element ? (r = n, t = t || {}) : t = n || {};
                i = this.dragging = new rct(r);
                typeof t.itemSelector == "string" ? i.pointer.selector = t.itemSelector : r === document && (i.pointer.selector = "[data-event]");
                typeof t.mirrorSelector == "string" && (i.mirrorSelector = t.mirrorSelector);
                new sd(i, t.eventData)
            }
            return n.prototype.destroy = function() {
                this.dragging.destroy()
            }, n
        }(),
        fct = nt({
            componentInteractions: [fd, ed, ol, od],
            calendarInteractions: [bht],
            elementDraggingImpl: yi,
            optionRefiners: kht,
            listenerRefiners: dht
        }),
        hd = function(n) {
            function i() {
                var t = n !== null && n.apply(this, arguments) || this;
                return t.headerElRef = p(), t
            }
            return u(i, n), i.prototype.renderSimpleLayout = function(n, i) {
                var f = this,
                    r = f.props,
                    e = f.context,
                    u = [],
                    o = cu(e.options);
                return n && u.push({
                    type: "header",
                    key: "header",
                    isSticky: o,
                    chunk: {
                        elRef: this.headerElRef,
                        tableClassName: "fc-col-header",
                        rowContent: n
                    }
                }), u.push({
                    type: "body",
                    key: "body",
                    liquid: !0,
                    chunk: {
                        content: i
                    }
                }), t(ui, {
                    viewSpec: e.viewSpec
                }, function(n, i) {
                    return t("div", {
                        ref: n,
                        className: ["fc-daygrid"].concat(i).join(" ")
                    }, t(lu, {
                        liquid: !r.isHeightAuto && !r.forPrint,
                        collapsibleWidth: r.forPrint,
                        cols: [],
                        sections: u
                    }))
                })
            }, i.prototype.renderHScrollLayout = function(n, i, r, u) {
                var s = this.context.pluginHooks.scrollGridImpl;
                if (!s) throw new Error("No ScrollGrid implementation");
                var h = this,
                    f = h.props,
                    o = h.context,
                    c = !f.forPrint && cu(o.options),
                    l = !f.forPrint && gc(o.options),
                    e = [];
                return n && e.push({
                    type: "header",
                    key: "header",
                    isSticky: c,
                    chunks: [{
                        key: "main",
                        elRef: this.headerElRef,
                        tableClassName: "fc-col-header",
                        rowContent: n
                    }]
                }), e.push({
                    type: "body",
                    key: "body",
                    liquid: !0,
                    chunks: [{
                        key: "main",
                        content: i
                    }]
                }), l && e.push({
                    type: "footer",
                    key: "footer",
                    isSticky: !0,
                    chunks: [{
                        key: "main",
                        content: we
                    }]
                }), t(ui, {
                    viewSpec: o.viewSpec
                }, function(n, i) {
                    return t("div", {
                        ref: n,
                        className: ["fc-daygrid"].concat(i).join(" ")
                    }, t(s, {
                        liquid: !f.isHeightAuto && !f.forPrint,
                        collapsibleWidth: f.forPrint,
                        colGroups: [{
                            cols: [{
                                span: r,
                                minWidth: u
                            }]
                        }],
                        sections: e
                    }))
                })
            }, i
        }(it);
    ld = function(n) {
        function r() {
            return n !== null && n.apply(this, arguments) || this
        }
        return u(r, n), r.prototype.render = function() {
            var n = this.props,
                r = this.context.options.navLinks ? {
                    "data-navlink": nr(n.date),
                    tabIndex: 0
                } : {};
            return t(de, {
                date: n.date,
                dateProfile: n.dateProfile,
                todayRange: n.todayRange,
                showDayNumber: n.showDayNumber,
                extraHookProps: n.extraHookProps,
                defaultContent: ect
            }, function(u, f) {
                return (f || n.forceDayTop) && t("div", {
                    className: "fc-daygrid-day-top",
                    ref: u
                }, t("a", i({
                    className: "fc-daygrid-day-number"
                }, r), f || t(a, null, " ")))
            })
        }, r
    }(s);
    sl = c({
        hour: "numeric",
        minute: "2-digit",
        omitZeroMinute: !0,
        meridiem: "narrow"
    });
    hl = function(n) {
        function r() {
            return n !== null && n.apply(this, arguments) || this
        }
        return u(r, n), r.prototype.render = function() {
            var n = this.props;
            return t(be, i({}, n, {
                extraClassNames: ["fc-daygrid-event", "fc-daygrid-block-event", "fc-h-event"],
                defaultTimeFormat: sl,
                defaultDisplayEventEnd: n.defaultDisplayEventEnd,
                disableResizing: !n.seg.eventRange.def.allDay
            }))
        }, r
    }(s);
    cl = function(n) {
        function r() {
            return n !== null && n.apply(this, arguments) || this
        }
        return u(r, n), r.prototype.render = function() {
            var r = this,
                n = r.props,
                u = r.context,
                f = u.options.eventTimeFormat || sl,
                e = gi(n.seg, f, u, !0, n.defaultDisplayEventEnd);
            return t(ur, {
                seg: n.seg,
                timeText: e,
                defaultContent: oct,
                isDragging: n.isDragging,
                isResizing: !1,
                isDateSelecting: !1,
                isSelected: n.isSelected,
                isPast: n.isPast,
                isFuture: n.isFuture,
                isToday: n.isToday
            }, function(r, u, f, e) {
                return t("a", i({
                    className: ["fc-daygrid-event", "fc-daygrid-dot-event"].concat(u).join(" "),
                    ref: r
                }, sct(n.seg)), e)
            })
        }, r
    }(s);
    vd = function(n) {
        function r() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.compileSegs = f(hct), t
        }
        return u(r, n), r.prototype.render = function() {
            var n = this.props,
                r = this.compileSegs(n.singlePlacements),
                u = r.allSegs,
                f = r.invisibleSegs;
            return t(il, {
                dateProfile: n.dateProfile,
                todayRange: n.todayRange,
                allDayDate: n.allDayDate,
                moreCnt: n.moreCnt,
                allSegs: u,
                hiddenSegs: f,
                alignmentElRef: n.alignmentElRef,
                alignGridTop: n.alignGridTop,
                extraDateSpan: n.extraDateSpan,
                popoverContent: function() {
                    var r = (n.eventDrag ? n.eventDrag.affectedInstances : null) || (n.eventResize ? n.eventResize.affectedInstances : null) || {};
                    return t(a, null, u.map(function(u) {
                        var f = u.eventRange.instance.instanceId;
                        return t("div", {
                            className: "fc-daygrid-event-harness",
                            key: f,
                            style: {
                                visibility: r[f] ? "hidden" : ""
                            }
                        }, ad(u) ? t(cl, i({
                            seg: u,
                            isDragging: !1,
                            isSelected: f === n.eventSelection,
                            defaultDisplayEventEnd: !1
                        }, ot(u, n.todayRange))) : t(hl, i({
                            seg: u,
                            isDragging: !1,
                            isResizing: !1,
                            isDateSelecting: !1,
                            isSelected: f === n.eventSelection,
                            defaultDisplayEventEnd: !1
                        }, ot(u, n.todayRange))))
                    }))
                }
            }, function(n, i, r, u, f) {
                return t("a", {
                    ref: n,
                    className: ["fc-daygrid-more-link"].concat(i).join(" "),
                    onClick: f
                }, u)
            })
        }, r
    }(s);
    yd = c({
        week: "narrow"
    });
    pd = function(n) {
        function r() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.rootElRef = p(), t.handleRootEl = function(n) {
                tt(t.rootElRef, n);
                tt(t.props.elRef, n)
            }, t
        }
        return u(r, n), r.prototype.render = function() {
            var u = this,
                n = u.props,
                e = u.context,
                o = u.rootElRef,
                s = e.options,
                r = n.date,
                f = n.dateProfile,
                h = s.navLinks ? {
                    "data-navlink": nr(r, "week"),
                    tabIndex: 0
                } : {};
            return t(au, {
                date: r,
                dateProfile: f,
                todayRange: n.todayRange,
                showDayNumber: n.showDayNumber,
                extraHookProps: n.extraHookProps,
                elRef: this.handleRootEl
            }, function(u, e, s, c) {
                return t("td", i({
                    ref: u,
                    className: ["fc-daygrid-day"].concat(e, n.extraClassNames || []).join(" ")
                }, s, n.extraDataAttrs), t("div", {
                    className: "fc-daygrid-day-frame fc-scrollgrid-sync-inner",
                    ref: n.innerElRef
                }, n.showWeekNumber && t(no, {
                    date: r,
                    defaultFormat: yd
                }, function(n, r, u, f) {
                    return t("a", i({
                        ref: n,
                        className: ["fc-daygrid-week-number"].concat(r).join(" ")
                    }, h), f)
                }), !c && t(ld, {
                    date: r,
                    dateProfile: f,
                    showDayNumber: n.showDayNumber,
                    forceDayTop: n.forceDayTop,
                    todayRange: n.todayRange,
                    extraHookProps: n.extraHookProps
                }), t("div", {
                    className: "fc-daygrid-day-events",
                    ref: n.fgContentElRef
                }, n.fgContent, t("div", {
                    className: "fc-daygrid-day-bottom",
                    style: {
                        marginTop: n.moreMarginTop
                    }
                }, t(vd, {
                    allDayDate: r,
                    singlePlacements: n.singlePlacements,
                    moreCnt: n.moreCnt,
                    alignmentElRef: o,
                    alignGridTop: !n.showDayNumber,
                    extraDateSpan: n.extraDateSpan,
                    dateProfile: n.dateProfile,
                    eventSelection: n.eventSelection,
                    eventDrag: n.eventDrag,
                    eventResize: n.eventResize,
                    todayRange: n.todayRange
                }))), t("div", {
                    className: "fc-daygrid-day-bg"
                }, n.bgContent)))
            })
        }, r
    }(it);
    wd = function(n) {
        function t() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.hiddenConsumes = !1, t.forceHidden = {}, t
        }
        return u(t, n), t.prototype.addSegs = function(t) {
            for (var u = this, f = n.prototype.addSegs.call(this, t), r = this.entriesByLevel, e = function(n) {
                return !u.forceHidden[fi(n)]
            }, i = 0; i < r.length; i += 1) r[i] = r[i].filter(e);
            return f
        }, t.prototype.handleInvalidInsertion = function(t, r, u) {
            var l = this,
                a = l.entriesByLevel,
                s = l.forceHidden,
                h = t.nextLevel - 1,
                o, f, c, e;
            if (this.hiddenConsumes && h >= 0) for (o = t.lateralStart; o < t.lateralEnd; o += 1) f = a[h][o], this.allowReslicing ? (c = i(i({}, f), {
                spanStart: Math.max(f.spanStart, r.spanStart),
                spanEnd: Math.min(f.spanEnd, r.spanEnd)
            }), e = fi(c), s[e] || (s[e] = !0, a[h][o] = c, this.splitEntry(f, r, u))) : (e = fi(f), s[e] || (s[e] = !0, u.push(f)));
            return n.prototype.handleInvalidInsertion.call(this, t, r, u)
        }, t
    }(ce);
    ll = function(n) {
        function r() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.cellElRefs = new ht, t.frameElRefs = new ht, t.fgElRefs = new ht, t.segHarnessRefs = new ht, t.rootElRef = p(), t.state = {
                framePositions: null,
                maxContentHeight: null,
                eventInstanceHeights: {}
            }, t
        }
        return u(r, n), r.prototype.render = function() {
            var i = this,
                f = this,
                n = f.props,
                e = f.state,
                c = f.context,
                o = c.options,
                r = n.cells.length,
                l = fo(n.businessHourSegs, r),
                v = fo(n.bgEventSegs, r),
                y = fo(this.getHighlightSegs(), r),
                p = fo(this.getMirrorSegs(), r),
                u = cct(kf(n.fgEventSegs, o.eventOrder), n.dayMaxEvents, n.dayMaxEventRows, o.eventOrderStrict, e.eventInstanceHeights, e.maxContentHeight, n.cells),
                s = u.singleColPlacements,
                h = u.multiColPlacements,
                w = u.moreCnts,
                b = u.moreMarginTops,
                k = n.eventDrag && n.eventDrag.affectedInstances || n.eventResize && n.eventResize.affectedInstances || {};
            return t("tr", {
                ref: this.rootElRef
            }, n.renderIntro && n.renderIntro(), n.cells.map(function(r, u) {
                var f = i.renderFgSegs(u, n.forPrint ? s[u] : h[u], n.todayRange, k),
                    e = i.renderFgSegs(u, vct(p[u], h), n.todayRange, {}, Boolean(n.eventDrag), Boolean(n.eventResize), !1);
                return t(pd, {
                    key: r.key,
                    elRef: i.cellElRefs.createRef(r.key),
                    innerElRef: i.frameElRefs.createRef(r.key),
                    dateProfile: n.dateProfile,
                    date: r.date,
                    showDayNumber: n.showDayNumbers,
                    showWeekNumber: n.showWeekNumbers && u === 0,
                    forceDayTop: n.showWeekNumbers,
                    todayRange: n.todayRange,
                    eventSelection: n.eventSelection,
                    eventDrag: n.eventDrag,
                    eventResize: n.eventResize,
                    extraHookProps: r.extraHookProps,
                    extraDataAttrs: r.extraDataAttrs,
                    extraClassNames: r.extraClassNames,
                    extraDateSpan: r.extraDateSpan,
                    moreCnt: w[u],
                    moreMarginTop: b[u],
                    singlePlacements: s[u],
                    fgContentElRef: i.fgElRefs.createRef(r.key),
                    fgContent: t(a, null, t(a, null, f), t(a, null, e)),
                    bgContent: t(a, null, i.renderFillSegs(y[u], "highlight"), i.renderFillSegs(l[u], "non-business"), i.renderFillSegs(v[u], "bg-event"))
                })
            }))
        }, r.prototype.componentDidMount = function() {
            this.updateSizing(!0)
        }, r.prototype.componentDidUpdate = function(n) {
            var t = this.props;
            this.updateSizing(!ft(n, t))
        }, r.prototype.getHighlightSegs = function() {
            var n = this.props;
            return n.eventDrag && n.eventDrag.segs.length ? n.eventDrag.segs : n.eventResize && n.eventResize.segs.length ? n.eventResize.segs : n.dateSelectionSegs
        }, r.prototype.getMirrorSegs = function() {
            var n = this.props;
            return n.eventResize && n.eventResize.segs.length ? n.eventResize.segs : []
        }, r.prototype.renderFgSegs = function(n, r, u, f, e, o, s) {
            var tt = this.context,
                k = this.props.eventSelection,
                c = this.state.framePositions,
                d = this.props.cells.length === 1,
                it = e || o || s,
                g = [],
                a, p;
            if (c) for (a = 0, p = r; a < p.length; a++) {
                var l = p[a],
                    h = l.seg,
                    v = h.eventRange.instance.instanceId,
                    nt = v + ":" + n,
                    rt = l.isVisible && !f[v],
                    y = l.isAbsolute,
                    w = "",
                    b = "";
                y && (tt.isRtl ? (b = 0, w = c.lefts[h.lastCol] - c.lefts[h.firstCol]) : (w = 0, b = c.rights[h.firstCol] - c.rights[h.lastCol]));
                g.push(t("div", {
                    className: "fc-daygrid-event-harness" + (y ? " fc-daygrid-event-harness-abs" : ""),
                    key: nt,
                    ref: it ? null : this.segHarnessRefs.createRef(nt),
                    style: {
                        visibility: rt ? "" : "hidden",
                        marginTop: y ? "" : l.marginTop,
                        top: y ? l.absoluteTop : "",
                        left: w,
                        right: b
                    }
                }, ad(h) ? t(cl, i({
                    seg: h,
                    isDragging: e,
                    isSelected: v === k,
                    defaultDisplayEventEnd: d
                }, ot(h, u))) : t(hl, i({
                    seg: h,
                    isDragging: e,
                    isResizing: o,
                    isDateSelecting: s,
                    isSelected: v === k,
                    defaultDisplayEventEnd: d
                }, ot(h, u)))))
            }
            return g
        }, r.prototype.renderFillSegs = function(n, r) {
            var c = this.context.isRtl,
                l = this.props.todayRange,
                f = this.state.framePositions,
                s = [],
                e, o, u, h;
            if (f) for (e = 0, o = n; e < o.length; e++) u = o[e], h = c ? {
                right: 0,
                left: f.lefts[u.lastCol] - f.lefts[u.firstCol]
            } : {
                left: 0,
                right: f.rights[u.firstCol] - f.rights[u.lastCol]
            }, s.push(t("div", {
                key: uh(u.eventRange),
                className: "fc-daygrid-bg-harness",
                style: h
            }, r === "bg-event" ? t(ge, i({
                seg: u
            }, ot(u, l))) : nl(r)));
            return t.apply(void 0, v([a, {}], s))
        }, r.prototype.updateSizing = function(n) {
            var r = this,
                t = r.props,
                e = r.frameElRefs,
                i, u, f;
            t.forPrint || t.clientWidth === null || (n && (i = t.cells.map(function(n) {
                return e.currentMap[n.key]
            }), i.length && (u = this.rootElRef.current, this.setState({
                framePositions: new ir(u, i, !0, !1)
            }))), f = t.dayMaxEvents === !0 || t.dayMaxEventRows === !0, this.setState({
                eventInstanceHeights: this.queryEventInstanceHeights(),
                maxContentHeight: f ? this.computeMaxContentHeight() : null
            }))
        }, r.prototype.queryEventInstanceHeights = function() {
            var r = this.segHarnessRefs.currentMap,
                n = {}, t, u, i;
            for (t in r) u = Math.round(r[t].getBoundingClientRect().height), i = t.split(":")[0], n[i] = Math.max(n[i] || 0, u);
            return n
        }, r.prototype.computeMaxContentHeight = function() {
            var n = this.props.cells[0].key,
                t = this.cellElRefs.currentMap[n],
                i = this.fgElRefs.currentMap[n];
            return t.getBoundingClientRect().bottom - i.getBoundingClientRect().top
        }, r.prototype.getCellEls = function() {
            var n = this.cellElRefs.currentMap;
            return this.props.cells.map(function(t) {
                return n[t.key]
            })
        }, r
    }(it);
    ll.addStateEquality({
        eventInstanceHeights: ft
    });
    al = function(n) {
        function r() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.splitBusinessHourSegs = f(uo), t.splitBgEventSegs = f(uo), t.splitFgEventSegs = f(uo), t.splitDateSelectionSegs = f(uo), t.splitEventDrag = f(cd), t.splitEventResize = f(cd), t.rowRefs = new ht, t.handleRootEl = function(n) {
                t.rootEl = n;
                n ? t.context.registerInteractiveComponent(t, {
                    el: n,
                    isHitComboAllowed: t.props.isHitComboAllowed
                }) : t.context.unregisterInteractiveComponent(t)
            }, t
        }
        return u(r, n), r.prototype.render = function() {
            var s = this,
                n = this.props,
                h = n.dateProfile,
                r = n.dayMaxEventRows,
                u = n.dayMaxEvents,
                f = n.expandRows,
                i = n.cells.length,
                c = this.splitBusinessHourSegs(n.businessHourSegs, i),
                l = this.splitBgEventSegs(n.bgEventSegs, i),
                v = this.splitFgEventSegs(n.fgEventSegs, i),
                y = this.splitDateSelectionSegs(n.dateSelectionSegs, i),
                p = this.splitEventDrag(n.eventDrag, i),
                w = this.splitEventResize(n.eventResize, i),
                e = u === !0 || r === !0,
                o;
            return e && !f && (e = !1, r = null, u = null), o = ["fc-daygrid-body", e ? "fc-daygrid-body-balanced" : "fc-daygrid-body-unbalanced", f ? "" : "fc-daygrid-body-natural", ], t("div", {
                className: o.join(" "),
                ref: this.handleRootEl,
                style: {
                    width: n.clientWidth,
                    minWidth: n.tableMinWidth
                }
            }, t(rr, {
                unit: "day"
            }, function(e, o) {
                return t(a, null, t("table", {
                    className: "fc-scrollgrid-sync-table",
                    style: {
                        width: n.clientWidth,
                        minWidth: n.tableMinWidth,
                        height: f ? n.clientHeight : ""
                    }
                }, n.colGroupNode, t("tbody", null, n.cells.map(function(f, e) {
                    return t(ll, {
                        ref: s.rowRefs.createRef(e),
                        key: f.length ? f[0].date.toISOString() : e,
                        showDayNumbers: i > 1,
                        showWeekNumbers: n.showWeekNumbers,
                        todayRange: o,
                        dateProfile: h,
                        cells: f,
                        renderIntro: n.renderRowIntro,
                        businessHourSegs: c[e],
                        eventSelection: n.eventSelection,
                        bgEventSegs: l[e].filter(pct),
                        fgEventSegs: v[e],
                        dateSelectionSegs: y[e],
                        eventDrag: p[e],
                        eventResize: w[e],
                        dayMaxEvents: u,
                        dayMaxEventRows: r,
                        clientWidth: n.clientWidth,
                        clientHeight: n.clientHeight,
                        forPrint: n.forPrint
                    })
                }))))
            }))
        }, r.prototype.prepareHits = function() {
            this.rowPositions = new ir(this.rootEl, this.rowRefs.collect().map(function(n) {
                return n.getCellEls()[0]
            }), !1, !0);
            this.colPositions = new ir(this.rootEl, this.rowRefs.currentMap[0].getCellEls(), !0, !1)
        }, r.prototype.queryHit = function(n, t) {
            var o = this,
                f = o.colPositions,
                e = o.rowPositions,
                r = f.leftToIndex(n),
                u = e.topToIndex(t),
                s;
            return u != null && r != null ? (s = this.props.cells[u][r], {
                dateProfile: this.props.dateProfile,
                dateSpan: i({
                    range: this.getCellRange(u, r),
                    allDay: !0
                }, s.extraDateSpan),
                dayEl: this.getCellEl(u, r),
                rect: {
                    left: f.lefts[r],
                    right: f.rights[r],
                    top: e.tops[u],
                    bottom: e.bottoms[u]
                },
                layer: 0
            }) : null
        }, r.prototype.getCellEl = function(n, t) {
            return this.rowRefs.currentMap[n].getCellEls()[t]
        }, r.prototype.getCellRange = function(n, t) {
            var i = this.props.cells[n][t].date,
                r = y(i, 1);
            return {
                start: i,
                end: r
            }
        }, r
    }(it);
    var bd = function(n) {
        function t() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.forceDayIfListItem = !0, t
        }
        return u(t, n), t.prototype.sliceRange = function(n, t) {
            return t.sliceRange(n)
        }, t
    }(pc),
        vl = function(n) {
            function r() {
                var t = n !== null && n.apply(this, arguments) || this;
                return t.slicer = new bd, t.tableRef = p(), t
            }
            return u(r, n), r.prototype.render = function() {
                var r = this,
                    n = r.props,
                    u = r.context;
                return t(al, i({
                    ref: this.tableRef
                }, this.slicer.sliceProps(n, n.dateProfile, n.nextDayThreshold, u, n.dayTableModel), {
                    dateProfile: n.dateProfile,
                    cells: n.dayTableModel.cells,
                    colGroupNode: n.colGroupNode,
                    tableMinWidth: n.tableMinWidth,
                    renderRowIntro: n.renderRowIntro,
                    dayMaxEvents: n.dayMaxEvents,
                    dayMaxEventRows: n.dayMaxEventRows,
                    showWeekNumbers: n.showWeekNumbers,
                    expandRows: n.expandRows,
                    headerAlignElRef: n.headerAlignElRef,
                    clientWidth: n.clientWidth,
                    clientHeight: n.clientHeight,
                    forPrint: n.forPrint
                }))
            }, r
        }(it),
        kd = function(n) {
            function i() {
                var t = n !== null && n.apply(this, arguments) || this;
                return t.buildDayTableModel = f(dd), t.headerRef = p(), t.tableRef = p(), t
            }
            return u(i, n), i.prototype.render = function() {
                var u = this,
                    f = this.context,
                    i = f.options,
                    s = f.dateProfileGenerator,
                    n = this.props,
                    r = this.buildDayTableModel(n.dateProfile, s),
                    e = i.dayHeaders && t(ve, {
                        ref: this.headerRef,
                        dateProfile: n.dateProfile,
                        dates: r.headerDates,
                        datesRepDistinctDays: r.rowCnt === 1
                    }),
                    o = function(f) {
                        return t(vl, {
                            ref: u.tableRef,
                            dateProfile: n.dateProfile,
                            dayTableModel: r,
                            businessHours: n.businessHours,
                            dateSelection: n.dateSelection,
                            eventStore: n.eventStore,
                            eventUiBases: n.eventUiBases,
                            eventSelection: n.eventSelection,
                            eventDrag: n.eventDrag,
                            eventResize: n.eventResize,
                            nextDayThreshold: i.nextDayThreshold,
                            colGroupNode: f.tableColGroupNode,
                            tableMinWidth: f.tableMinWidth,
                            dayMaxEvents: i.dayMaxEvents,
                            dayMaxEventRows: i.dayMaxEventRows,
                            showWeekNumbers: i.weekNumbers,
                            expandRows: !n.isHeightAuto,
                            headerAlignElRef: u.headerElRef,
                            clientWidth: f.clientWidth,
                            clientHeight: f.clientHeight,
                            forPrint: n.forPrint
                        })
                    };
                return i.dayMinWidth ? this.renderHScrollLayout(e, o, r.colCnt, i.dayMinWidth) : this.renderSimpleLayout(e, o)
            }, i
        }(hd);
    var wct = function(n) {
        function t() {
            return n !== null && n.apply(this, arguments) || this
        }
        return u(t, n), t.prototype.buildRenderRange = function(t, i, r) {
            var o = this.props.dateEnv,
                s = n.prototype.buildRenderRange.call(this, t, i, r),
                f = s.start,
                u = s.end,
                e, h;
            return /^(year|month)$/.test(i) && (f = o.startOfWeek(f), e = o.startOfWeek(u), e.valueOf() !== u.valueOf() && (u = hs(e, 1))), this.props.monthMode && this.props.fixedWeekCount && (h = Math.ceil(bv(f, u)), u = hs(u, 6 - h)), {
                start: f,
                end: u
            }
        }, t
    }(oe),
        bct = nt({
            initialView: "dayGridMonth",
            views: {
                dayGrid: {
                    component: kd,
                    dateProfileGeneratorClass: wct
                },
                dayGridDay: {
                    type: "dayGrid",
                    duration: {
                        days: 1
                    }
                },
                dayGridWeek: {
                    type: "dayGrid",
                    duration: {
                        weeks: 1
                    }
                },
                dayGridMonth: {
                    type: "dayGrid",
                    duration: {
                        months: 1
                    },
                    monthMode: !0,
                    fixedWeekCount: !0
                }
            }
        }),
        kct = function(n) {
            function t() {
                return n !== null && n.apply(this, arguments) || this
            }
            return u(t, n), t.prototype.getKeyInfo = function() {
                return {
                    allDay: {},
                    timed: {}
                }
            }, t.prototype.getKeysForDateSpan = function(n) {
                return n.allDay ? ["allDay"] : ["timed"]
            }, t.prototype.getKeysForEventDef = function(n) {
                return n.allDay ? tp(n) ? ["timed", "allDay"] : ["allDay"] : ["timed"]
            }, t
        }(wh),
        dct = c({
            hour: "numeric",
            minute: "2-digit",
            omitZeroMinute: !0,
            meridiem: "short"
        });
    var nlt = function(n) {
        function r() {
            return n !== null && n.apply(this, arguments) || this
        }
        return u(r, n), r.prototype.render = function() {
            return this.props.slatMetas.map(function(n) {
                return t("tr", {
                    key: n.key
                }, t(gd, i({}, n)))
            })
        }, r
    }(s),
        tlt = c({
            week: "short"
        }),
        ilt = 5,
        ng = function(n) {
            function r() {
                var r = n !== null && n.apply(this, arguments) || this;
                return r.allDaySplitter = new kct, r.headerElRef = p(), r.rootElRef = p(), r.scrollerElRef = p(), r.state = {
                    slatCoords: null
                }, r.handleScrollTopRequest = function(n) {
                    var t = r.scrollerElRef.current;
                    t && (t.scrollTop = n)
                }, r.renderHeadAxis = function(n, u) {
                    u === void 0 && (u = "");
                    var e = r.context.options,
                        o = r.props.dateProfile,
                        f = o.renderRange,
                        s = lt(f.start, f.end),
                        h = e.navLinks && s === 1 ? {
                            "data-navlink": nr(f.start, "week"),
                            tabIndex: 0
                        } : {};
                    return e.weekNumbers && n === "day" ? t(no, {
                        date: f.start,
                        defaultFormat: tlt
                    }, function(n, r, f, e) {
                        return t("th", {
                            ref: n,
                            className: ["fc-timegrid-axis", "fc-scrollgrid-shrink", ].concat(r).join(" ")
                        }, t("div", {
                            className: "fc-timegrid-axis-frame fc-scrollgrid-shrink-frame fc-timegrid-axis-frame-liquid",
                            style: {
                                height: u
                            }
                        }, t("a", i({
                            ref: f,
                            className: "fc-timegrid-axis-cushion fc-scrollgrid-shrink-cushion fc-scrollgrid-sync-inner"
                        }, h), e)))
                    }) : t("th", {
                        className: "fc-timegrid-axis"
                    }, t("div", {
                        className: "fc-timegrid-axis-frame",
                        style: {
                            height: u
                        }
                    }))
                }, r.renderTableRowAxis = function(n) {
                    var u = r.context,
                        i = u.options,
                        f = u.viewApi,
                        e = {
                            text: i.allDayText,
                            view: f
                        };
                    return t(k, {
                        hookProps: e,
                        classNames: i.allDayClassNames,
                        content: i.allDayContent,
                        defaultContent: rlt,
                        didMount: i.allDayDidMount,
                        willUnmount: i.allDayWillUnmount
                    }, function(i, r, u, f) {
                        return t("td", {
                            ref: i,
                            className: ["fc-timegrid-axis", "fc-scrollgrid-shrink", ].concat(r).join(" ")
                        }, t("div", {
                            className: "fc-timegrid-axis-frame fc-scrollgrid-shrink-frame" + (n == null ? " fc-timegrid-axis-frame-liquid" : ""),
                            style: {
                                height: n
                            }
                        }, t("span", {
                            className: "fc-timegrid-axis-cushion fc-scrollgrid-shrink-cushion fc-scrollgrid-sync-inner",
                            ref: u
                        }, f)))
                    })
                }, r.handleSlatCoords = function(n) {
                    r.setState({
                        slatCoords: n
                    })
                }, r
            }
            return u(r, n), r.prototype.renderSimpleLayout = function(n, i, r) {
                var o = this,
                    f = o.context,
                    e = o.props,
                    u = [],
                    s = cu(f.options);
                return n && u.push({
                    type: "header",
                    key: "header",
                    isSticky: s,
                    chunk: {
                        elRef: this.headerElRef,
                        tableClassName: "fc-col-header",
                        rowContent: n
                    }
                }), i && (u.push({
                    type: "body",
                    key: "all-day",
                    chunk: {
                        content: i
                    }
                }), u.push({
                    type: "body",
                    key: "all-day-divider",
                    outerContent: t("tr", {
                        className: "fc-scrollgrid-section"
                    }, t("td", {
                        className: "fc-timegrid-divider " + f.theme.getClass("tableCellShaded")
                    }))
                })), u.push({
                    type: "body",
                    key: "body",
                    liquid: !0,
                    expandRows: Boolean(f.options.expandRows),
                    chunk: {
                        scrollerElRef: this.scrollerElRef,
                        content: r
                    }
                }), t(ui, {
                    viewSpec: f.viewSpec,
                    elRef: this.rootElRef
                }, function(n, i) {
                    return t("div", {
                        className: ["fc-timegrid"].concat(i).join(" "),
                        ref: n
                    }, t(lu, {
                        liquid: !e.isHeightAuto && !e.forPrint,
                        collapsibleWidth: e.forPrint,
                        cols: [{
                            width: "shrink"
                        }],
                        sections: u
                    }))
                })
            }, r.prototype.renderHScrollLayout = function(n, i, r, u, f, e, o) {
                var a = this,
                    v = this.context.pluginHooks.scrollGridImpl,
                    l;
                if (!v) throw new Error("No ScrollGrid implementation");
                var y = this,
                    s = y.context,
                    c = y.props,
                    p = !c.forPrint && cu(s.options),
                    w = !c.forPrint && gc(s.options),
                    h = [];
                return n && h.push({
                    type: "header",
                    key: "header",
                    isSticky: p,
                    syncRowHeights: !0,
                    chunks: [{
                        key: "axis",
                        rowContent: function(n) {
                            return t("tr", null, a.renderHeadAxis("day", n.rowSyncHeights[0]))
                        }
                    }, {
                        key: "cols",
                        elRef: this.headerElRef,
                        tableClassName: "fc-col-header",
                        rowContent: n
                    }, ]
                }), i && (h.push({
                    type: "body",
                    key: "all-day",
                    syncRowHeights: !0,
                    chunks: [{
                        key: "axis",
                        rowContent: function(n) {
                            return t("tr", null, a.renderTableRowAxis(n.rowSyncHeights[0]))
                        }
                    }, {
                        key: "cols",
                        content: i
                    }, ]
                }), h.push({
                    key: "all-day-divider",
                    type: "body",
                    outerContent: t("tr", {
                        className: "fc-scrollgrid-section"
                    }, t("td", {
                        colSpan: 2,
                        className: "fc-timegrid-divider " + s.theme.getClass("tableCellShaded")
                    }))
                })), l = s.options.nowIndicator, h.push({
                    type: "body",
                    key: "body",
                    liquid: !0,
                    expandRows: Boolean(s.options.expandRows),
                    chunks: [{
                        key: "axis",
                        content: function(n) {
                            return t("div", {
                                className: "fc-timegrid-axis-chunk"
                            }, t("table", {
                                style: {
                                    height: n.expandRows ? n.clientHeight : ""
                                }
                            }, n.tableColGroupNode, t("tbody", null, t(nlt, {
                                slatMetas: e
                            }))), t("div", {
                                className: "fc-timegrid-now-indicator-container"
                            }, t(rr, {
                                unit: l ? "minute" : "day"
                            }, function(n) {
                                var i = l && o && o.safeComputeTop(n);
                                return typeof i == "number" ? t(ke, {
                                    isAxis: !0,
                                    date: n
                                }, function(n, r, u, f) {
                                    return t("div", {
                                        ref: n,
                                        className: ["fc-timegrid-now-indicator-arrow"].concat(r).join(" "),
                                        style: {
                                            top: i
                                        }
                                    }, f)
                                }) : null
                            })))
                        }
                    }, {
                        key: "cols",
                        scrollerElRef: this.scrollerElRef,
                        content: r
                    }, ]
                }), w && h.push({
                    key: "footer",
                    type: "footer",
                    isSticky: !0,
                    chunks: [{
                        key: "axis",
                        content: we
                    }, {
                        key: "cols",
                        content: we
                    }, ]
                }), t(ui, {
                    viewSpec: s.viewSpec,
                    elRef: this.rootElRef
                }, function(n, i) {
                    return t("div", {
                        className: ["fc-timegrid"].concat(i).join(" "),
                        ref: n
                    }, t(v, {
                        liquid: !c.isHeightAuto && !c.forPrint,
                        collapsibleWidth: !1,
                        colGroups: [{
                            width: "shrink",
                            cols: [{
                                width: "shrink"
                            }]
                        }, {
                            cols: [{
                                span: u,
                                minWidth: f
                            }]
                        }, ],
                        sections: h
                    }))
                })
            }, r.prototype.getAllDayMaxEventProps = function() {
                var i = this.context.options,
                    n = i.dayMaxEvents,
                    t = i.dayMaxEventRows;
                return (n === !0 || t === !0) && (n = undefined, t = ilt), {
                    dayMaxEvents: n,
                    dayMaxEventRows: t
                }
            }, r
        }(it);
    var tg = function() {
        function n(n, t, i) {
            this.positions = n;
            this.dateProfile = t;
            this.slotDuration = i
        }
        return n.prototype.safeComputeTop = function(n) {
            var i = this.dateProfile,
                r, t;
            return et(i.currentRange, n) && (r = h(n), t = n.valueOf() - r.valueOf(), t >= g(i.slotMinTime) && t < g(i.slotMaxTime)) ? this.computeTimeTop(o(t)) : null
        }, n.prototype.computeDateTop = function(n, t) {
            return t || (t = h(n)), this.computeTimeTop(o(n.valueOf() - t.valueOf()))
        }, n.prototype.computeTimeTop = function(n) {
            var u = this,
                r = u.positions,
                o = u.dateProfile,
                f = r.els.length,
                t = (n.milliseconds - g(o.slotMinTime)) / g(this.slotDuration),
                i, e;
            return t = Math.max(0, t), t = Math.min(f, t), i = Math.floor(t), i = Math.min(i, f - 1), e = t - i, r.tops[i] + r.getHeight(i) * e
        }, n
    }(),
        ult = function(n) {
            function r() {
                return n !== null && n.apply(this, arguments) || this
            }
            return u(r, n), r.prototype.render = function() {
                var f = this,
                    r = f.props,
                    u = f.context,
                    n = u.options,
                    e = r.slatElRefs;
                return t("tbody", null, r.slatMetas.map(function(f) {
                    var o = {
                        time: f.time,
                        date: u.dateEnv.toDate(f.date),
                        view: u.viewApi
                    }, s = ["fc-timegrid-slot", "fc-timegrid-slot-lane", f.isLabeled ? "" : "fc-timegrid-slot-minor", ];
                    return t("tr", {
                        key: f.key,
                        ref: e.createRef(f.key)
                    }, r.axis && t(gd, i({}, f)), t(k, {
                        hookProps: o,
                        classNames: n.slotLaneClassNames,
                        content: n.slotLaneContent,
                        didMount: n.slotLaneDidMount,
                        willUnmount: n.slotLaneWillUnmount
                    }, function(n, i, r, u) {
                        return t("td", {
                            ref: n,
                            className: s.concat(i).join(" "),
                            "data-time": f.isoTimeStr
                        }, u)
                    }))
                }))
            }, r
        }(s),
        flt = function(n) {
            function i() {
                var t = n !== null && n.apply(this, arguments) || this;
                return t.rootElRef = p(), t.slatElRefs = new ht, t
            }
            return u(i, n), i.prototype.render = function() {
                var i = this,
                    n = i.props,
                    r = i.context;
                return t("div", {
                    className: "fc-timegrid-slots",
                    ref: this.rootElRef
                }, t("table", {
                    className: r.theme.getClass("table"),
                    style: {
                        minWidth: n.tableMinWidth,
                        width: n.clientWidth,
                        height: n.minHeight
                    }
                }, n.tableColGroupNode, t(ult, {
                    slatElRefs: this.slatElRefs,
                    axis: n.axis,
                    slatMetas: n.slatMetas
                })))
            }, i.prototype.componentDidMount = function() {
                this.updateSizing()
            }, i.prototype.componentDidUpdate = function() {
                this.updateSizing()
            }, i.prototype.componentWillUnmount = function() {
                if (this.props.onCoords) this.props.onCoords(null)
            }, i.prototype.updateSizing = function() {
                var t = this,
                    r = t.context,
                    n = t.props,
                    i;
                if (n.onCoords && n.clientWidth !== null && (i = this.rootElRef.current, i.offsetHeight)) n.onCoords(new tg(new ir(this.rootElRef.current, elt(this.slatElRefs.currentMap, n.slatMetas), !1, !0), this.props.dateProfile, r.options.slotDuration))
            }, i
        }(s);
    rg = function(n) {
        function i() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.rootElRef = p(), t
        }
        return u(i, n), i.prototype.render = function() {
            var i = this,
                n = this.props;
            return t(il, {
                allDayDate: null,
                moreCnt: n.hiddenSegs.length,
                allSegs: n.hiddenSegs,
                hiddenSegs: n.hiddenSegs,
                alignmentElRef: this.rootElRef,
                defaultContent: olt,
                extraDateSpan: n.extraDateSpan,
                dateProfile: n.dateProfile,
                todayRange: n.todayRange,
                popoverContent: function() {
                    return og(n.hiddenSegs, n)
                }
            }, function(r, u, f, e, o) {
                return t("a", {
                    ref: function(n) {
                        tt(r, n);
                        tt(i.rootElRef, n)
                    },
                    className: ["fc-timegrid-more-link"].concat(u).join(" "),
                    style: {
                        top: n.top,
                        bottom: n.bottom
                    },
                    onClick: o
                }, t("div", {
                    ref: f,
                    className: "fc-timegrid-more-link-inner fc-sticky"
                }, e))
            })
        }, i
    }(s);
    var ylt = c({
        hour: "numeric",
        minute: "2-digit",
        meridiem: !1
    }),
        eg = function(n) {
            function r() {
                return n !== null && n.apply(this, arguments) || this
            }
            return u(r, n), r.prototype.render = function() {
                var n = ["fc-timegrid-event", "fc-v-event", ];
                return this.props.isShort && n.push("fc-timegrid-event-short"), t(be, i({}, this.props, {
                    defaultTimeFormat: ylt,
                    extraClassNames: n
                }))
            }, r
        }(s),
        plt = function(n) {
            function i() {
                return n !== null && n.apply(this, arguments) || this
            }
            return u(i, n), i.prototype.render = function() {
                var n = this.props;
                return t(de, {
                    date: n.date,
                    dateProfile: n.dateProfile,
                    todayRange: n.todayRange,
                    extraHookProps: n.extraHookProps
                }, function(n, i) {
                    return i && t("div", {
                        className: "fc-timegrid-col-misc",
                        ref: n
                    }, i)
                })
            }, i
        }(s),
        wlt = function(n) {
            function r() {
                var t = n !== null && n.apply(this, arguments) || this;
                return t.sortEventSegs = f(kf), t.computeFgSegPlacements = f(ug), t
            }
            return u(r, n), r.prototype.render = function() {
                var r = this,
                    u = this,
                    n = u.props,
                    f = u.context,
                    e = f.options.selectMirror,
                    o = n.eventDrag && n.eventDrag.segs || n.eventResize && n.eventResize.segs || e && n.dateSelectionSegs || [],
                    s = n.eventDrag && n.eventDrag.affectedInstances || n.eventResize && n.eventResize.affectedInstances || {}, h = this.sortEventSegs(n.fgEventSegs, f.options.eventOrder);
                return t(au, {
                    elRef: n.elRef,
                    date: n.date,
                    dateProfile: n.dateProfile,
                    todayRange: n.todayRange,
                    extraHookProps: n.extraHookProps
                }, function(u, f, c) {
                    return t("td", i({
                        ref: u,
                        className: ["fc-timegrid-col"].concat(f, n.extraClassNames || []).join(" ")
                    }, c, n.extraDataAttrs), t("div", {
                        className: "fc-timegrid-col-frame"
                    }, t("div", {
                        className: "fc-timegrid-col-bg"
                    }, r.renderFillSegs(n.businessHourSegs, "non-business"), r.renderFillSegs(n.bgEventSegs, "bg-event"), r.renderFillSegs(n.dateSelectionSegs, "highlight")), t("div", {
                        className: "fc-timegrid-col-events"
                    }, r.renderFgSegs(h, s)), t("div", {
                        className: "fc-timegrid-col-events"
                    }, r.renderFgSegs(o, {}, Boolean(n.eventDrag), Boolean(n.eventResize), Boolean(e))), t("div", {
                        className: "fc-timegrid-now-indicator-container"
                    }, r.renderNowIndicator(n.nowIndicatorSegs)), t(plt, {
                        date: n.date,
                        dateProfile: n.dateProfile,
                        todayRange: n.todayRange,
                        extraHookProps: n.extraHookProps
                    })))
                })
            }, r.prototype.renderFgSegs = function(n, t, i, r, u) {
                var f = this.props;
                return f.forPrint ? og(n, f) : f.slatCoords ? this.renderPositionedFgSegs(n, t, i, r, u) : null
            }, r.prototype.renderPositionedFgSegs = function(n, r, u, f, e) {
                var h = this,
                    o = this.context.options,
                    y = o.eventMaxStack,
                    p = o.eventShortHeight,
                    w = o.eventOrderStrict,
                    s = this.props,
                    b = s.eventSelection,
                    k = s.todayRange,
                    d = s.nowDate,
                    c = u || f || e,
                    l = this.buildSegInputs(n),
                    v = c ? ug(l) : this.computeFgSegPlacements(l, w, y),
                    g = v.segRects,
                    nt = v.hiddenGroups;
                return t(a, null, this.renderHiddenGroups(nt, n), g.map(function(o) {
                    var s = n[o.segInput.index],
                        l = s.eventRange.instance.instanceId,
                        a = i(i({}, h.computeSegTopBottomCss(o.segInput)), c ? {
                            left: 0,
                            right: 0
                        } : h.computeSegLeftRightCss(o));
                    return t("div", {
                        className: "fc-timegrid-event-harness" + (o.stackForward > 0 ? " fc-timegrid-event-harness-inset" : ""),
                        key: l,
                        style: i({
                            visibility: r[l] ? "hidden" : ""
                        }, a)
                    }, t(eg, i({
                        seg: s,
                        isDragging: u,
                        isResizing: f,
                        isDateSelecting: e,
                        isSelected: l === b,
                        isShort: o.spanEnd - o.spanStart < p
                    }, ot(s, k, d))))
                }))
            }, r.prototype.renderHiddenGroups = function(n, i) {
                var u = this,
                    r = this.props,
                    f = r.extraDateSpan,
                    e = r.dateProfile,
                    o = r.todayRange,
                    s = r.nowDate,
                    h = r.eventSelection,
                    c = r.eventDrag,
                    l = r.eventResize;
                return t(a, null, n.map(function(n) {
                    var r = u.computeSegTopBottomCss(n),
                        a = blt(n.entries, i);
                    return t(rg, {
                        key: bs(rl(a)),
                        hiddenSegs: a,
                        top: r.top,
                        bottom: r.bottom,
                        extraDateSpan: f,
                        dateProfile: e,
                        todayRange: o,
                        nowDate: s,
                        eventSelection: h,
                        eventDrag: c,
                        eventResize: l
                    })
                }))
            }, r.prototype.buildSegInputs = function(n) {
                for (var i = this.props, r = i.date, u = i.slatCoords, s = this.context.options.eventMinHeight, f = [], t = 0; t < n.length; t += 1) {
                    var e = n[t],
                        o = u.computeDateTop(e.start, r),
                        h = Math.max(o + (s || 0), u.computeDateTop(e.end, r));
                    f.push({
                        index: t,
                        spanStart: Math.round(o),
                        spanEnd: Math.round(h),
                        thickness: 1
                    })
                }
                return f
            }, r.prototype.renderFillSegs = function(n, r) {
                var o = this,
                    u = this.props,
                    f, e;
                return u.slatCoords ? (f = this.buildSegInputs(n), e = f.map(function(f) {
                    var e = n[f.index];
                    return t("div", {
                        key: uh(e.eventRange),
                        className: "fc-timegrid-bg-harness",
                        style: o.computeSegTopBottomCss(f)
                    }, r === "bg-event" ? t(ge, i({
                        seg: e
                    }, ot(e, u.todayRange, u.nowDate))) : nl(r))
                }), t(a, null, e)) : null
            }, r.prototype.renderNowIndicator = function(n) {
                var i = this.props,
                    r = i.slatCoords,
                    u = i.date;
                return r ? n.map(function(n, i) {
                    return t(ke, {
                        isAxis: !1,
                        date: u,
                        key: i
                    }, function(i, f, e, o) {
                        return t("div", {
                            ref: i,
                            className: ["fc-timegrid-now-indicator-line"].concat(f).join(" "),
                            style: {
                                top: r.computeDateTop(n.start, u)
                            }
                        }, o)
                    })
                }) : null
            }, r.prototype.computeSegTopBottomCss = function(n) {
                return {
                    top: n.spanStart,
                    bottom: -n.spanEnd
                }
            }, r.prototype.computeSegLeftRightCss = function(n) {
                var e = this.context,
                    o = e.isRtl,
                    h = e.options,
                    s = h.slotEventOverlap,
                    t = n.levelCoord,
                    i = n.levelCoord + n.thickness,
                    r, u, f;
                return s && (i = Math.min(1, t + (i - t) * 2)), o ? (r = 1 - i, u = t) : (r = t, u = 1 - i), f = {
                    zIndex: n.stackDepth + 1,
                    left: r * 100 + "%",
                    right: u * 100 + "%"
                }, s && !n.stackForward && (f[o ? "marginLeft" : "marginRight"] = 20), f
            }, r
        }(s);
    sg = function(n) {
        function i() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.splitFgEventSegs = f(yu), t.splitBgEventSegs = f(yu), t.splitBusinessHourSegs = f(yu), t.splitNowIndicatorSegs = f(yu), t.splitDateSelectionSegs = f(yu), t.splitEventDrag = f(ig), t.splitEventResize = f(ig), t.rootElRef = p(), t.cellElRefs = new ht, t
        }
        return u(i, n), i.prototype.render = function() {
            var f = this,
                r = this,
                n = r.props,
                e = r.context,
                u = e.options.nowIndicator && n.slatCoords && n.slatCoords.safeComputeTop(n.nowDate),
                i = n.cells.length,
                o = this.splitFgEventSegs(n.fgEventSegs, i),
                s = this.splitBgEventSegs(n.bgEventSegs, i),
                h = this.splitBusinessHourSegs(n.businessHourSegs, i),
                c = this.splitNowIndicatorSegs(n.nowIndicatorSegs, i),
                l = this.splitDateSelectionSegs(n.dateSelectionSegs, i),
                a = this.splitEventDrag(n.eventDrag, i),
                v = this.splitEventResize(n.eventResize, i);
            return t("div", {
                className: "fc-timegrid-cols",
                ref: this.rootElRef
            }, t("table", {
                style: {
                    minWidth: n.tableMinWidth,
                    width: n.clientWidth
                }
            }, n.tableColGroupNode, t("tbody", null, t("tr", null, n.axis && t("td", {
                className: "fc-timegrid-col fc-timegrid-axis"
            }, t("div", {
                className: "fc-timegrid-col-frame"
            }, t("div", {
                className: "fc-timegrid-now-indicator-container"
            }, typeof u == "number" && t(ke, {
                isAxis: !0,
                date: n.nowDate
            }, function(n, i, r, f) {
                return t("div", {
                    ref: n,
                    className: ["fc-timegrid-now-indicator-arrow"].concat(i).join(" "),
                    style: {
                        top: u
                    }
                }, f)
            })))), n.cells.map(function(i, r) {
                return t(wlt, {
                    key: i.key,
                    elRef: f.cellElRefs.createRef(i.key),
                    dateProfile: n.dateProfile,
                    date: i.date,
                    nowDate: n.nowDate,
                    todayRange: n.todayRange,
                    extraHookProps: i.extraHookProps,
                    extraDataAttrs: i.extraDataAttrs,
                    extraClassNames: i.extraClassNames,
                    extraDateSpan: i.extraDateSpan,
                    fgEventSegs: o[r],
                    bgEventSegs: s[r],
                    businessHourSegs: h[r],
                    nowIndicatorSegs: c[r],
                    dateSelectionSegs: l[r],
                    eventDrag: a[r],
                    eventResize: v[r],
                    slatCoords: n.slatCoords,
                    eventSelection: n.eventSelection,
                    forPrint: n.forPrint
                })
            })))))
        }, i.prototype.componentDidMount = function() {
            this.updateCoords()
        }, i.prototype.componentDidUpdate = function() {
            this.updateCoords()
        }, i.prototype.updateCoords = function() {
            var n = this.props;
            if (n.onColCoords && n.clientWidth !== null) n.onColCoords(new ir(this.rootElRef.current, klt(this.cellElRefs.currentMap, n.cells), !0, !1))
        }, i
    }(s);
    pl = function(n) {
        function r() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.processSlotOptions = f(dlt), t.state = {
                slatCoords: null
            }, t.handleRootEl = function(n) {
                n ? t.context.registerInteractiveComponent(t, {
                    el: n,
                    isHitComboAllowed: t.props.isHitComboAllowed
                }) : t.context.unregisterInteractiveComponent(t)
            }, t.handleScrollRequest = function(n) {
                var r = t.props.onScrollTopRequest,
                    u = t.state.slatCoords,
                    i;
                return r && u ? (n.time && (i = u.computeTimeTop(n.time), i = Math.ceil(i), i && (i += 1), r(i)), !0) : !1
            }, t.handleColCoords = function(n) {
                t.colCoords = n
            }, t.handleSlatCoords = function(n) {
                if (t.setState({
                    slatCoords: n
                }), t.props.onSlatCoords) t.props.onSlatCoords(n)
            }, t
        }
        return u(r, n), r.prototype.render = function() {
            var i = this,
                n = i.props,
                r = i.state;
            return t("div", {
                className: "fc-timegrid-body",
                ref: this.handleRootEl,
                style: {
                    width: n.clientWidth,
                    minWidth: n.tableMinWidth
                }
            }, t(flt, {
                axis: n.axis,
                dateProfile: n.dateProfile,
                slatMetas: n.slatMetas,
                clientWidth: n.clientWidth,
                minHeight: n.expandRows ? n.clientHeight : "",
                tableMinWidth: n.tableMinWidth,
                tableColGroupNode: n.axis ? n.tableColGroupNode : null,
                onCoords: this.handleSlatCoords
            }), t(sg, {
                cells: n.cells,
                axis: n.axis,
                dateProfile: n.dateProfile,
                businessHourSegs: n.businessHourSegs,
                bgEventSegs: n.bgEventSegs,
                fgEventSegs: n.fgEventSegs,
                dateSelectionSegs: n.dateSelectionSegs,
                eventSelection: n.eventSelection,
                eventDrag: n.eventDrag,
                eventResize: n.eventResize,
                todayRange: n.todayRange,
                nowDate: n.nowDate,
                nowIndicatorSegs: n.nowIndicatorSegs,
                clientWidth: n.clientWidth,
                tableMinWidth: n.tableMinWidth,
                tableColGroupNode: n.tableColGroupNode,
                slatCoords: r.slatCoords,
                onColCoords: this.handleColCoords,
                forPrint: n.forPrint
            }))
        }, r.prototype.componentDidMount = function() {
            this.scrollResponder = this.context.createScrollResponder(this.handleScrollRequest)
        }, r.prototype.componentDidUpdate = function(n) {
            this.scrollResponder.update(n.dateProfile !== this.props.dateProfile)
        }, r.prototype.componentWillUnmount = function() {
            this.scrollResponder.detach()
        }, r.prototype.queryHit = function(n, t) {
            var s = this.context,
                h = s.dateEnv,
                w = s.options,
                u = this.colCoords,
                c = this.props.dateProfile,
                e = this.state.slatCoords,
                l = this.processSlotOptions(this.props.slotDuration, w.snapDuration),
                a = l.snapDuration,
                v = l.snapsPerSlot,
                r = u.leftToIndex(n),
                f = e.positions.topToIndex(t);
            if (r != null && f != null) {
                var b = this.props.cells[r],
                    o = e.positions.tops[f],
                    y = e.positions.getHeight(f),
                    k = (t - o) / y,
                    d = Math.floor(k * v),
                    g = f * v + d,
                    nt = this.props.cells[r].date,
                    tt = tf(c.slotMinTime, fy(a, g)),
                    p = h.add(nt, tt),
                    it = h.add(p, a);
                return {
                    dateProfile: c,
                    dateSpan: i({
                        range: {
                            start: p,
                            end: it
                        },
                        allDay: !1
                    }, b.extraDateSpan),
                    dayEl: u.els[r],
                    rect: {
                        left: u.lefts[r],
                        right: u.rights[r],
                        top: o,
                        bottom: o + y
                    },
                    layer: 0
                }
            }
            return null
        }, r
    }(it);
    wl = function(n) {
        function t() {
            return n !== null && n.apply(this, arguments) || this
        }
        return u(t, n), t.prototype.sliceRange = function(n, t) {
            for (var i, u = [], r = 0; r < t.length; r += 1) i = ii(n, t[r]), i && u.push({
                start: i.start,
                end: i.end,
                isStart: i.start.valueOf() === n.start.valueOf(),
                isEnd: i.end.valueOf() === n.end.valueOf(),
                col: r
            });
            return u
        }, t
    }(pc);
    bl = function(n) {
        function r() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.buildDayRanges = f(hg), t.slicer = new wl, t.timeColsRef = p(), t
        }
        return u(r, n), r.prototype.render = function() {
            var u = this,
                e = this,
                n = e.props,
                r = e.context,
                f = n.dateProfile,
                o = n.dayTableModel,
                s = r.options.nowIndicator,
                h = this.buildDayRanges(o, f, r.dateEnv);
            return t(rr, {
                unit: s ? "minute" : "day"
            }, function(e, c) {
                return t(pl, i({
                    ref: u.timeColsRef
                }, u.slicer.sliceProps(n, f, null, r, h), {
                    forPrint: n.forPrint,
                    axis: n.axis,
                    dateProfile: f,
                    slatMetas: n.slatMetas,
                    slotDuration: n.slotDuration,
                    cells: o.cells[0],
                    tableColGroupNode: n.tableColGroupNode,
                    tableMinWidth: n.tableMinWidth,
                    clientWidth: n.clientWidth,
                    clientHeight: n.clientHeight,
                    expandRows: n.expandRows,
                    nowDate: e,
                    nowIndicatorSegs: s && u.slicer.sliceNowDate(e, r, h),
                    todayRange: c,
                    onScrollTopRequest: n.onScrollTopRequest,
                    onSlatCoords: n.onSlatCoords
                }))
            })
        }, r
    }(it);
    kl = [{
        hours: 1
    }, {
        minutes: 30
    }, {
        minutes: 15
    }, {
        seconds: 30
    }, {
        seconds: 15
    }, ];
    dl = function(n) {
        function r() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.buildTimeColsModel = f(lg), t.buildSlatMetas = f(cg), t
        }
        return u(r, n), r.prototype.render = function() {
            var u = this,
                o = this.context,
                n = o.options,
                p = o.dateEnv,
                w = o.dateProfileGenerator,
                f = this.props,
                r = f.dateProfile,
                e = this.buildTimeColsModel(r, w),
                c = this.allDaySplitter.splitProps(f),
                l = this.buildSlatMetas(r.slotMinTime, r.slotMaxTime, n.slotLabelInterval, n.slotDuration, p),
                s = n.dayMinWidth,
                h = !s,
                b = s,
                a = n.dayHeaders && t(ve, {
                    dates: e.headerDates,
                    dateProfile: r,
                    datesRepDistinctDays: !0,
                    renderIntro: h ? this.renderHeadAxis : null
                }),
                v = n.allDaySlot !== !1 && function(o) {
                    return t(vl, i({}, c.allDay, {
                        dateProfile: r,
                        dayTableModel: e,
                        nextDayThreshold: n.nextDayThreshold,
                        tableMinWidth: o.tableMinWidth,
                        colGroupNode: o.tableColGroupNode,
                        renderRowIntro: h ? u.renderTableRowAxis : null,
                        showWeekNumbers: !1,
                        expandRows: !1,
                        headerAlignElRef: u.headerElRef,
                        clientWidth: o.clientWidth,
                        clientHeight: o.clientHeight,
                        forPrint: f.forPrint
                    }, u.getAllDayMaxEventProps()))
                }, y = function(o) {
                    return t(bl, i({}, c.timed, {
                        dayTableModel: e,
                        dateProfile: r,
                        axis: h,
                        slotDuration: n.slotDuration,
                        slatMetas: l,
                        forPrint: f.forPrint,
                        tableColGroupNode: o.tableColGroupNode,
                        tableMinWidth: o.tableMinWidth,
                        clientWidth: o.clientWidth,
                        clientHeight: o.clientHeight,
                        onSlatCoords: u.handleSlatCoords,
                        expandRows: o.expandRows,
                        onScrollTopRequest: u.handleScrollTopRequest
                    }))
                };
            return b ? this.renderHScrollLayout(a, v, y, e.colCnt, s, l, this.state.slatCoords) : this.renderSimpleLayout(a, v, y)
        }, r
    }(ng);
    var nat = {
        allDaySlot: Boolean
    }, tat = nt({
        initialView: "timeGridWeek",
        optionRefiners: nat,
        views: {
            timeGrid: {
                component: dl,
                usesMinMaxTime: !0,
                allDaySlot: !0,
                slotDuration: "00:30:00",
                slotEventOverlap: !0
            },
            timeGridDay: {
                type: "timeGrid",
                duration: {
                    days: 1
                }
            },
            timeGridWeek: {
                type: "timeGrid",
                duration: {
                    weeks: 1
                }
            }
        }
    }),
        iat = function(n) {
            function r() {
                return n !== null && n.apply(this, arguments) || this
            }
            return u(r, n), r.prototype.render = function() {
                var e = this.props,
                    r = e.dayDate,
                    h = e.todayRange,
                    u = this.context,
                    o = u.theme,
                    f = u.dateEnv,
                    n = u.options,
                    c = u.viewApi,
                    s = te(r, h),
                    l = n.listDayFormat ? f.format(r, n.listDayFormat) : "",
                    a = n.listDaySideFormat ? f.format(r, n.listDaySideFormat) : "",
                    v = n.navLinks ? nr(r) : null,
                    y = i({
                        date: f.toDate(r),
                        view: c,
                        text: l,
                        sideText: a,
                        navLinkData: v
                    }, s),
                    p = ["fc-list-day"].concat(uu(s, o));
                return t(k, {
                    hookProps: y,
                    classNames: n.dayHeaderClassNames,
                    content: n.dayHeaderContent,
                    defaultContent: rat,
                    didMount: n.dayHeaderDidMount,
                    willUnmount: n.dayHeaderWillUnmount
                }, function(n, i, u, f) {
                    return t("tr", {
                        ref: n,
                        className: p.concat(i).join(" "),
                        "data-date": pr(r)
                    }, t("th", {
                        colSpan: 3
                    }, t("div", {
                        className: "fc-list-day-cushion " + o.getClass("tableCellShaded"),
                        ref: u
                    }, f)))
                })
            }, r
        }(s);
    ag = c({
        hour: "numeric",
        minute: "2-digit",
        meridiem: "short"
    });
    vg = function(n) {
        function i() {
            return n !== null && n.apply(this, arguments) || this
        }
        return u(i, n), i.prototype.render = function() {
            var i = this,
                n = i.props,
                r = i.context,
                u = n.seg,
                f = r.options.eventTimeFormat || ag;
            return t(ur, {
                seg: u,
                timeText: "",
                disableDragging: !0,
                disableResizing: !0,
                defaultContent: uat,
                isPast: n.isPast,
                isFuture: n.isFuture,
                isToday: n.isToday,
                isSelected: n.isSelected,
                isDragging: n.isDragging,
                isResizing: n.isResizing,
                isDateSelecting: n.isDateSelecting
            }, function(n, i, e, o, s) {
                return t("tr", {
                    className: ["fc-list-event", s.event.url ? "fc-event-forced-url" : ""].concat(i).join(" "),
                    ref: n
                }, fat(u, f, r), t("td", {
                    className: "fc-list-event-graphic"
                }, t("span", {
                    className: "fc-list-event-dot",
                    style: {
                        borderColor: s.borderColor || s.backgroundColor
                    }
                })), t("td", {
                    className: "fc-list-event-title",
                    ref: e
                }, o))
            })
        }, i
    }(s);
    gl = function(n) {
        function r() {
            var t = n !== null && n.apply(this, arguments) || this;
            return t.computeDateVars = f(sat), t.eventStoreToSegs = f(t._eventStoreToSegs), t.setRootEl = function(n) {
                n ? t.context.registerInteractiveComponent(t, {
                    el: n
                }) : t.context.unregisterInteractiveComponent(t)
            }, t
        }
        return u(r, n), r.prototype.render = function() {
            var r = this,
                u = this,
                n = u.props,
                i = u.context,
                o = ["fc-list", i.theme.getClass("table"), i.options.stickyHeaderDates !== !1 ? "fc-list-sticky" : "", ],
                f = this.computeDateVars(n.dateProfile),
                s = f.dayDates,
                h = f.dayRanges,
                e = this.eventStoreToSegs(n.eventStore, n.eventUiBases, h);
            return t(ui, {
                viewSpec: i.viewSpec,
                elRef: this.setRootEl
            }, function(i, u) {
                return t("div", {
                    ref: i,
                    className: o.concat(u).join(" ")
                }, t(kc, {
                    liquid: !n.isHeightAuto,
                    overflowX: n.isHeightAuto ? "visible" : "hidden",
                    overflowY: n.isHeightAuto ? "visible" : "auto"
                }, e.length > 0 ? r.renderSegList(e, s) : r.renderEmptyMessage()))
            })
        }, r.prototype.renderEmptyMessage = function() {
            var i = this.context,
                n = i.options,
                r = i.viewApi,
                u = {
                    text: n.noEventsText,
                    view: r
                };
            return t(k, {
                hookProps: u,
                classNames: n.noEventsClassNames,
                content: n.noEventsContent,
                defaultContent: oat,
                didMount: n.noEventsDidMount,
                willUnmount: n.noEventsWillUnmount
            }, function(n, i, r, u) {
                return t("div", {
                    className: ["fc-list-empty"].concat(i).join(" "),
                    ref: n
                }, t("div", {
                    className: "fc-list-empty-cushion",
                    ref: r
                }, u))
            })
        }, r.prototype.renderSegList = function(n, r) {
            var u = this.context,
                e = u.theme,
                o = u.options,
                f = hat(n);
            return t(rr, {
                unit: "day"
            }, function(n, u) {
                for (var h, v, c, y, l, a = [], s = 0; s < f.length; s += 1) if (h = f[s], h) for (v = r[s].toISOString(), a.push(t(iat, {
                    key: v,
                    dayDate: r[s],
                    todayRange: u
                })), h = kf(h, o.eventOrder), c = 0, y = h; c < y.length; c++) l = y[c], a.push(t(vg, i({
                    key: v + ":" + l.eventRange.instance.instanceId,
                    seg: l,
                    isDragging: !1,
                    isResizing: !1,
                    isDateSelecting: !1,
                    isSelected: !1
                }, ot(l, u, n))));
                return t("table", {
                    className: "fc-list-table " + e.getClass("table")
                }, t("tbody", null, a))
            })
        }, r.prototype._eventStoreToSegs = function(n, t, i) {
            return this.eventRangesToSegs(iu(n, t, this.props.dateProfile.activeRange, this.context.options.nextDayThreshold).fg, i)
        }, r.prototype.eventRangesToSegs = function(n, t) {
            for (var f, i = [], r = 0, u = n; r < u.length; r++) f = u[r], i.push.apply(i, this.eventRangeToSegs(f, t));
            return i
        }, r.prototype.eventRangeToSegs = function(n, t) {
            for (var o = this.context.dateEnv, s = this.context.options.nextDayThreshold, u = n.range, h = n.def.allDay, r, f, e = [], i = 0; i < t.length; i += 1) if (r = ii(u, t[i]), r && (f = {
                component: this,
                eventRange: n,
                start: r.start,
                end: r.end,
                isStart: n.isStart && r.start.valueOf() === u.start.valueOf(),
                isEnd: n.isEnd && r.end.valueOf() === u.end.valueOf(),
                dayIndex: i
            }, e.push(f), !f.isEnd && !h && i + 1 < t.length && u.end < o.add(t[i + 1].start, s))) {
                f.end = u.end;
                f.isEnd = !0;
                break
            }
            return e
        }, r
    }(it);
    yg = {
        listDayFormat: pg,
        listDaySideFormat: pg,
        noEventsClassNames: r,
        noEventsContent: r,
        noEventsDidMount: r,
        noEventsWillUnmount: r
    };
    wg = nt({
        optionRefiners: yg,
        views: {
            list: {
                component: gl,
                buttonTextKey: "list",
                listDayFormat: {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
            },
            listDay: {
                type: "list",
                duration: {
                    days: 1
                },
                listDayFormat: {
                    weekday: "long"
                }
            },
            listWeek: {
                type: "list",
                duration: {
                    weeks: 1
                },
                listDayFormat: {
                    weekday: "long"
                },
                listDaySideFormat: {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
            },
            listMonth: {
                type: "list",
                duration: {
                    month: 1
                },
                listDaySideFormat: {
                    weekday: "long"
                }
            },
            listYear: {
                type: "list",
                duration: {
                    year: 1
                },
                listDaySideFormat: {
                    weekday: "long"
                }
            }
        }
    });
    ct = function(n) {
        function t() {
            return n !== null && n.apply(this, arguments) || this
        }
        return u(t, n), t
    }(vi);
    ct.prototype.classes = {
        root: "fc-theme-bootstrap",
        table: "table-bordered",
        tableCellShaded: "table-active",
        buttonGroup: "btn-group",
        button: "btn btn-primary",
        buttonActive: "active",
        popover: "popover",
        popoverHeader: "popover-header",
        popoverContent: "popover-body"
    };
    ct.prototype.baseIconClass = "fa";
    ct.prototype.iconClasses = {
        close: "fa-times",
        prev: "fa-chevron-left",
        next: "fa-chevron-right",
        prevYear: "fa-angle-double-left",
        nextYear: "fa-angle-double-right"
    };
    ct.prototype.rtlIconClasses = {
        prev: "fa-chevron-right",
        next: "fa-chevron-left",
        prevYear: "fa-angle-double-right",
        nextYear: "fa-angle-double-left"
    };
    ct.prototype.iconOverrideOption = "bootstrapFontAwesome";
    ct.prototype.iconOverrideCustomButtonOption = "bootstrapFontAwesome";
    ct.prototype.iconOverridePrefix = "fa-";
    var cat = nt({
        themeClasses: {
            bootstrap: ct
        }
    }),
        lat = {
            googleCalendarApiKey: String
        }, aat = {
            googleCalendarApiKey: String,
            googleCalendarId: String,
            googleCalendarApiBase: String,
            extraParams: r
        }, vat = "https://www.googleapis.com/calendar/v3/calendars",
        yat = {
            parseMeta: function(n) {
                var t = n.googleCalendarId;
                return (!t && n.url && (t = pat(n.url)), t) ? {
                    googleCalendarId: t,
                    googleCalendarApiKey: n.googleCalendarApiKey,
                    googleCalendarApiBase: n.googleCalendarApiBase,
                    extraParams: n.extraParams
                } : null
            },
            fetch: function(n, t, i) {
                var f = n.context,
                    s = f.dateEnv,
                    h = f.options,
                    r = n.eventSource.meta,
                    e = r.googleCalendarApiKey || h.googleCalendarApiKey;
                if (e) {
                    var c = wat(r),
                        u = r.extraParams,
                        l = typeof u == "function" ? u() : u,
                        o = bat(n.range, e, l, s);
                    fc("GET", c, o, function(n, r) {
                        n.error ? i({
                            message: "Google Calendar API: " + n.error.message,
                            errors: n.error.errors,
                            xhr: r
                        }) : t({
                            rawEvents: kat(n.items, o.timeZone),
                            xhr: r
                        })
                    }, function(n, t) {
                        i({
                            message: n,
                            xhr: t
                        })
                    })
                } else i({
                    message: "Specify a googleCalendarApiKey. See http://fullcalendar.io/docs/google_calendar/"
                })
            }
        };
    return bg = nt({
        eventSourceDefs: [yat],
        optionRefiners: lat,
        eventSourceRefiners: aat
    }), se.push(fct, bct, tat, wg, cat, bg), n.BASE_OPTION_DEFAULTS = vt, n.BASE_OPTION_REFINERS = ds, n.BaseComponent = s, n.BgEvent = ge, n.BootstrapTheme = ct, n.Calendar = nd, n.CalendarApi = sh, n.CalendarContent = gb, n.CalendarDataManager = he, n.CalendarDataProvider = wb, n.CalendarRoot = lc, n.Component = fe, n.ContentHook = tc, n.CustomContentRenderContext = ee, n.DateComponent = it, n.DateEnv = ch, n.DateProfileGenerator = oe, n.DayCellContent = de, n.DayCellRoot = au, n.DayGridView = kd, n.DayHeader = ve, n.DaySeriesModel = vc, n.DayTable = vl, n.DayTableModel = yc, n.DayTableSlicer = bd, n.DayTimeCols = bl, n.DayTimeColsSlicer = wl, n.DayTimeColsView = dl, n.DelayedRunner = ou, n.Draggable = ict, n.ElementDragging = cc, n.ElementScrollController = yw, n.Emitter = tr, n.EventApi = l, n.EventRoot = ur, n.EventSourceApi = kt, n.FeaturefulElementDragging = yi, n.Fragment = a, n.Interaction = ei, n.ListView = gl, n.MoreLinkRoot = il, n.MountHook = eu, n.NamedTimeZoneImpl = bb, n.NowIndicatorRoot = ke, n.NowTimer = rr, n.PointerDragging = io, n.PositionCache = ir, n.RefMap = ht, n.RenderHook = k, n.ScrollController = ue, n.ScrollResponder = dw, n.Scroller = kc, n.SegHierarchy = ce, n.SimpleScrollGrid = lu, n.Slicer = pc, n.Splitter = wh, n.StandardEvent = be, n.Table = al, n.TableDateCell = ik, n.TableDowCell = rk, n.TableView = hd, n.Theme = vi, n.ThirdPartyDraggable = uct, n.TimeCols = pl, n.TimeColsSlatsCoords = tg, n.TimeColsView = ng, n.ViewApi = oh, n.ViewContextType = st, n.ViewRoot = ui, n.WeekNumberRoot = no, n.WindowScrollController = pw, n.addDays = y, n.addDurations = tf, n.addMs = dt, n.addWeeks = hs, n.allowContextMenu = cv, n.allowSelection = sv, n.applyMutationToEventStore = gf, n.applyStyle = wi, n.applyStyleProp = us, n.asCleanDays = dtt, n.asRoughMinutes = iit, n.asRoughMs = g, n.asRoughSeconds = rit, n.binarySearch = hc, n.buildClassNameNormalizer = ic, n.buildDayRanges = hg, n.buildDayTableModel = dd, n.buildEntryKey = fi, n.buildEventApis = ri, n.buildEventRangeKey = uh, n.buildHashFromArray = vtt, n.buildIsoString = bs, n.buildNavLinkData = nr, n.buildSegCompareObj = rp, n.buildSegTimeText = gi, n.buildSlatMetas = cg, n.buildTimeColsModel = lg, n.collectFromHash = iy, n.combineEventUis = th, n.compareByFieldSpec = vv, n.compareByFieldSpecs = av, n.compareNumbers = pv, n.compareObjs = ps, n.computeEarliestSegStart = rl, n.computeEdges = lw, n.computeFallbackHeaderFormat = nk, n.computeHeightAndMargins = vut, n.computeInnerRect = aw, n.computeRect = re, n.computeSegDraggable = up, n.computeSegEndResizable = ep, n.computeSegStartResizable = fp, n.computeShrinkWidth = hk, n.computeSmallestCellWidth = wv, n.computeVisibleDayRange = pf, n.config = hu, n.constrainPoint = fw, n.createContext = dh, n.createDuration = o, n.createElement = t, n.createEmptyEventStore = b, n.createEventInstance = vr, n.createEventUi = gr, n.createFormatter = c, n.createPlugin = nt, n.createPortal = bw, n.createRef = p, n.diffDates = li, n.diffDayAndTime = kv, n.diffDays = lt, n.diffPoints = ow, n.diffWeeks = bv, n.diffWholeDays = ar, n.diffWholeWeeks = dv, n.disableCursor = hr, n.elementClosest = w, n.elementMatches = nf, n.enableCursor = cr, n.eventTupleToStore = di, n.filterEventStoreDefs = kr, n.filterHash = ti, n.findDirectChildren = itt, n.findElements = rv, n.flexibleCompare = yv, n.flushToDom = gh, n.formatDate = rut, n.formatDayString = pr, n.formatIsoTimeString = ey, n.formatRange = uut, n.getAllowYScrolling = ck, n.getCanVGrowWithinCell = ph, n.getClippingParents = kh, n.getDateMeta = te, n.getDayClassNames = uu, n.getDefaultEventEnd = df, n.getElSeg = ai, n.getEntrySpanEnd = oc, n.getEventClassNames = op, n.getIsRtlScrollbarOnLeft = sw, n.getRectCenter = ew, n.getRelevantEvents = cf, n.getScrollGridClassNames = wk, n.getScrollbarWidths = hw, n.getSectionClassNames = bk, n.getSectionHasLiquidHeight = dc, n.getSegMeta = ot, n.getSlotClassNames = hut, n.getStickyFooterScrollbar = gc, n.getStickyHeaderDates = cu, n.getUnequalProps = ys, n.globalLocales = dp, n.globalPlugins = se, n.greatestDurationDenominator = uf, n.groupIntersectingEntries = kb, n.guid = hi, n.hasBgRendering = tp, n.hasShrinkWidth = pk, n.identity = r, n.interactionSettingsStore = su, n.interactionSettingsToStore = le, n.intersectRanges = ii, n.intersectRects = vh, n.isArraysEqual = at, n.isColPropsEqual = ak, n.isDateSelectionValid = fk, n.isDateSpansEqual = hp, n.isInt = lr, n.isInteractionValid = ye, n.isMultiDayRange = dy, n.isPropsEqual = ft, n.isPropsValid = ok, n.isValidDate = ls, n.listenBySelector = fs, n.mapHash = ut, n.memoize = f, n.memoizeArraylike = fit, n.memoizeHashlike = eit, n.memoizeObjArg = wr, n.mergeEventStores = lf, n.multiplyDuration = fy, n.padStart = ci, n.parseBusinessHours = rw, n.parseClassNames = af, n.parseDragMeta = ae, n.parseEventDef = nu, n.parseFieldSpecs = lv, n.parseMarker = kp, n.pointInsideRect = uw, n.preventContextMenu = hv, n.preventDefault = sr, n.preventSelection = ov, n.rangeContainsMarker = et, n.rangeContainsRange = tu, n.rangesEqual = np, n.rangesIntersect = wf, n.refineEventDef = yf, n.refineProps = br, n.removeElement = gu, n.removeExact = uit, n.render = ww, n.renderChunkContent = lk, n.renderFill = nl, n.renderMicroColGroup = vk, n.renderScrollShim = we, n.requestJson = fc, n.sanitizeShrinkWidth = yk, n.setElSeg = rh, n.setRef = tt, n.sliceEventStore = iu, n.sliceEvents = kot, n.sortEventSegs = kf, n.startOfDay = h, n.translateRect = eut, n.triggerDateSelect = fh, n.unmountComponentAtNode = kw, n.unpromisify = vw, n.version = gk, n.whenTransitionDone = ev, n.wholeDivideDurations = rf, Object.defineProperty(n, "__esModule", {
        value: !0
    }), n
}({});
! function(n, t, i) {
    var e = n.L,
        r = {}, u, f;
    r.version = "0.7.7";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = r : "function" == typeof define && define.amd && define(r);
    r.noConflict = function() {
        return n.L = e, this
    };
    n.L = r;
    r.Util = {
        extend: function(n) {
            for (var t, r, f = Array.prototype.slice.call(arguments, 1), i = 0, u = f.length; u > i; i++) {
                r = f[i] || {};
                for (t in r) r.hasOwnProperty(t) && (n[t] = r[t])
            }
            return n
        },
        bind: function(n, t) {
            var i = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
            return function() {
                return n.apply(t, i || arguments)
            }
        },
        stamp: function() {
            var t = 0,
                n = "_leaflet_id";
            return function(i) {
                return i[n] = i[n] || ++t, i[n]
            }
        }(),
        invokeEach: function(n, t, i) {
            var r, u;
            if ("object" == typeof n) {
                u = Array.prototype.slice.call(arguments, 3);
                for (r in n) t.apply(i, [r, n[r]].concat(u));
                return !0
            }
            return !1
        },
        limitExecByInterval: function(n, t, i) {
            var r, u;
            return function f() {
                var e = arguments;
                return r ? void(u = !0) : (r = !0, setTimeout(function() {
                    r = !1;
                    u && (f.apply(i, e), u = !1)
                }, t), void n.apply(i, e))
            }
        },
        falseFn: function() {
            return !1
        },
        formatNum: function(n, t) {
            var i = Math.pow(10, t || 5);
            return Math.round(n * i) / i
        },
        trim: function(n) {
            return n.trim ? n.trim() : n.replace(/^\s+|\s+$/g, "")
        },
        splitWords: function(n) {
            return r.Util.trim(n).split(/\s+/)
        },
        setOptions: function(n, t) {
            return n.options = r.extend({}, n.options, t), n.options
        },
        getParamString: function(n, t, i) {
            var u = [];
            for (var r in n) u.push(encodeURIComponent(i ? r.toUpperCase() : r) + "=" + encodeURIComponent(n[r]));
            return (t && -1 !== t.indexOf("?") ? "&" : "?") + u.join("&")
        },
        template: function(n, t) {
            return n.replace(/\{ *([\w_]+) *\}/g, function(n, r) {
                var u = t[r];
                if (u === i) throw new Error("No value provided for variable " + n);
                return "function" == typeof u && (u = u(t)), u
            })
        },
        isArray: Array.isArray || function(n) {
            return "[object Array]" === Object.prototype.toString.call(n)
        },
        emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
    },
    function() {
        function t(t) {
            for (var r, u = ["webkit", "moz", "o", "ms"], i = 0; i < u.length && !r; i++) r = n[u[i] + t];
            return r
        }
        function i(t) {
            var i = +new Date,
                r = Math.max(0, 16 - (i - u));
            return u = i + r, n.setTimeout(t, r)
        }
        var u = 0,
            f = n.requestAnimationFrame || t("RequestAnimationFrame") || i,
            e = n.cancelAnimationFrame || t("CancelAnimationFrame") || t("CancelRequestAnimationFrame") || function(t) {
                n.clearTimeout(t)
            };
        r.Util.requestAnimFrame = function(t, u, e, o) {
            return t = r.bind(t, u), e && f === i ? void t() : f.call(n, t, o)
        };
        r.Util.cancelAnimFrame = function(t) {
            t && e.call(n, t)
        }
    }();
    r.extend = r.Util.extend;
    r.bind = r.Util.bind;
    r.stamp = r.Util.stamp;
    r.setOptions = r.Util.setOptions;
    r.Class = function() {};
    r.Class.extend = function(n) {
        var i = function() {
            this.initialize && this.initialize.apply(this, arguments);
            this._initHooks && this.callInitHooks()
        }, e = function() {}, t, u, f;
        e.prototype = this.prototype;
        t = new e;
        t.constructor = i;
        i.prototype = t;
        for (u in this) this.hasOwnProperty(u) && "prototype" !== u && (i[u] = this[u]);
        return n.statics && (r.extend(i, n.statics), delete n.statics), n.includes && (r.Util.extend.apply(null, [t].concat(n.includes)), delete n.includes), n.options && t.options && (n.options = r.extend({}, t.options, n.options)), r.extend(t, n), t._initHooks = [], f = this, i.__super__ = f.prototype, t.callInitHooks = function() {
            if (!this._initHooksCalled) {
                f.prototype.callInitHooks && f.prototype.callInitHooks.call(this);
                this._initHooksCalled = !0;
                for (var n = 0, i = t._initHooks.length; i > n; n++) t._initHooks[n].call(this)
            }
        }, i
    };
    r.Class.include = function(n) {
        r.extend(this.prototype, n)
    };
    r.Class.mergeOptions = function(n) {
        r.extend(this.prototype.options, n)
    };
    r.Class.addInitHook = function(n) {
        var t = Array.prototype.slice.call(arguments, 1),
            i = "function" == typeof n ? n : function() {
                this[n].apply(this, t)
            };
        this.prototype._initHooks = this.prototype._initHooks || [];
        this.prototype._initHooks.push(i)
    };
    u = "_leaflet_events";
    r.Mixin = {};
    r.Mixin.Events = {
        addEventListener: function(n, t, i) {
            if (r.Util.invokeEach(n, this.addEventListener, this, t, i)) return this;
            var o, v, l, e, s, a, h, f = this[u] = this[u] || {}, c = i && i !== this && r.stamp(i);
            for (n = r.Util.splitWords(n), o = 0, v = n.length; v > o; o++) l = {
                action: t,
                context: i || this
            }, e = n[o], c ? (s = e + "_idx", a = s + "_len", h = f[s] = f[s] || {}, h[c] || (h[c] = [], f[a] = (f[a] || 0) + 1), h[c].push(l)) : (f[e] = f[e] || [], f[e].push(l));
            return this
        },
        hasEventListeners: function(n) {
            var t = this[u];
            return !!t && (n in t && t[n].length > 0 || n + "_idx" in t && t[n + "_idx_len"] > 0)
        },
        removeEventListener: function(n, t, i) {
            if (!this[u]) return this;
            if (!n) return this.clearAllEventListeners();
            if (r.Util.invokeEach(n, this.removeEventListener, this, t, i)) return this;
            var h, y, c, f, e, l, a, s, p, o = this[u],
                v = i && i !== this && r.stamp(i);
            for (n = r.Util.splitWords(n), h = 0, y = n.length; y > h; h++) if (c = n[h], l = c + "_idx", a = l + "_len", s = o[l], t) {
                if (f = v && s ? s[v] : o[c]) {
                    for (e = f.length - 1; e >= 0; e--) f[e].action !== t || i && f[e].context !== i || (p = f.splice(e, 1), p[0].action = r.Util.falseFn);
                    i && s && 0 === f.length && (delete s[v], o[a]--)
                }
            } else delete o[c], delete o[l], delete o[a];
            return this
        },
        clearAllEventListeners: function() {
            return delete this[u], this
        },
        fireEvent: function(n, t) {
            if (!this.hasEventListeners(n)) return this;
            var f, i, e, o, h, c = r.Util.extend({}, t, {
                type: n,
                target: this
            }),
                s = this[u];
            if (s[n]) for (f = s[n].slice(), i = 0, e = f.length; e > i; i++) f[i].action.call(f[i].context, c);
            o = s[n + "_idx"];
            for (h in o) if (f = o[h].slice()) for (i = 0, e = f.length; e > i; i++) f[i].action.call(f[i].context, c);
            return this
        },
        addOneTimeEventListener: function(n, t, i) {
            if (r.Util.invokeEach(n, this.addOneTimeEventListener, this, t, i)) return this;
            var u = r.bind(function() {
                this.removeEventListener(n, t, i).removeEventListener(n, u, i)
            }, this);
            return this.addEventListener(n, t, i).addEventListener(n, u, i)
        }
    };
    r.Mixin.Events.on = r.Mixin.Events.addEventListener;
    r.Mixin.Events.off = r.Mixin.Events.removeEventListener;
    r.Mixin.Events.once = r.Mixin.Events.addOneTimeEventListener;
    r.Mixin.Events.fire = r.Mixin.Events.fireEvent,
    function() {
        var f = "ActiveXObject" in n,
            b = f && !t.addEventListener,
            u = navigator.userAgent.toLowerCase(),
            o = -1 !== u.indexOf("webkit"),
            k = -1 !== u.indexOf("chrome"),
            c = -1 !== u.indexOf("phantom"),
            d = -1 !== u.indexOf("android"),
            l = -1 !== u.search("android [23]"),
            g = -1 !== u.indexOf("gecko"),
            e = typeof orientation != i + "",
            a = !n.PointerEvent && n.MSPointerEvent,
            v = n.PointerEvent && n.navigator.pointerEnabled || a,
            nt = "devicePixelRatio" in n && n.devicePixelRatio > 1 || "matchMedia" in n && n.matchMedia("(min-resolution:144dpi)") && n.matchMedia("(min-resolution:144dpi)").matches,
            s = t.documentElement,
            y = f && "transition" in s.style,
            h = "WebKitCSSMatrix" in n && "m11" in new n.WebKitCSSMatrix && !l,
            p = "MozPerspective" in s.style,
            w = "OTransition" in s.style,
            tt = !n.L_DISABLE_3D && (y || h || p || w) && !c,
            it = !n.L_NO_TOUCH && !c && (v || "ontouchstart" in n || n.DocumentTouch && t instanceof n.DocumentTouch);
        r.Browser = {
            ie: f,
            ielt9: b,
            webkit: o,
            gecko: g && !o && !n.opera && !f,
            android: d,
            android23: l,
            chrome: k,
            ie3d: y,
            webkit3d: h,
            gecko3d: p,
            opera3d: w,
            any3d: tt,
            mobile: e,
            mobileWebkit: e && o,
            mobileWebkit3d: e && h,
            mobileOpera: e && n.opera,
            touch: it,
            msPointer: a,
            pointer: v,
            retina: nt
        }
    }();
    r.Point = function(n, t, i) {
        this.x = i ? Math.round(n) : n;
        this.y = i ? Math.round(t) : t
    };
    r.Point.prototype = {
        clone: function() {
            return new r.Point(this.x, this.y)
        },
        add: function(n) {
            return this.clone()._add(r.point(n))
        },
        _add: function(n) {
            return this.x += n.x, this.y += n.y, this
        },
        subtract: function(n) {
            return this.clone()._subtract(r.point(n))
        },
        _subtract: function(n) {
            return this.x -= n.x, this.y -= n.y, this
        },
        divideBy: function(n) {
            return this.clone()._divideBy(n)
        },
        _divideBy: function(n) {
            return this.x /= n, this.y /= n, this
        },
        multiplyBy: function(n) {
            return this.clone()._multiplyBy(n)
        },
        _multiplyBy: function(n) {
            return this.x *= n, this.y *= n, this
        },
        round: function() {
            return this.clone()._round()
        },
        _round: function() {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this
        },
        floor: function() {
            return this.clone()._floor()
        },
        _floor: function() {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
        },
        distanceTo: function(n) {
            n = r.point(n);
            var t = n.x - this.x,
                i = n.y - this.y;
            return Math.sqrt(t * t + i * i)
        },
        equals: function(n) {
            return n = r.point(n), n.x === this.x && n.y === this.y
        },
        contains: function(n) {
            return n = r.point(n), Math.abs(n.x) <= Math.abs(this.x) && Math.abs(n.y) <= Math.abs(this.y)
        },
        toString: function() {
            return "Point(" + r.Util.formatNum(this.x) + ", " + r.Util.formatNum(this.y) + ")"
        }
    };
    r.point = function(n, t, u) {
        return n instanceof r.Point ? n : r.Util.isArray(n) ? new r.Point(n[0], n[1]) : n === i || null === n ? n : new r.Point(n, t, u)
    };
    r.Bounds = function(n, t) {
        if (n) for (var r = t ? [n, t] : n, i = 0, u = r.length; u > i; i++) this.extend(r[i])
    };
    r.Bounds.prototype = {
        extend: function(n) {
            return n = r.point(n), this.min || this.max ? (this.min.x = Math.min(n.x, this.min.x), this.max.x = Math.max(n.x, this.max.x), this.min.y = Math.min(n.y, this.min.y), this.max.y = Math.max(n.y, this.max.y)) : (this.min = n.clone(), this.max = n.clone()), this
        },
        getCenter: function(n) {
            return new r.Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, n)
        },
        getBottomLeft: function() {
            return new r.Point(this.min.x, this.max.y)
        },
        getTopRight: function() {
            return new r.Point(this.max.x, this.min.y)
        },
        getSize: function() {
            return this.max.subtract(this.min)
        },
        contains: function(n) {
            var t, i;
            return n = "number" == typeof n[0] || n instanceof r.Point ? r.point(n) : r.bounds(n), n instanceof r.Bounds ? (t = n.min, i = n.max) : t = i = n, t.x >= this.min.x && i.x <= this.max.x && t.y >= this.min.y && i.y <= this.max.y
        },
        intersects: function(n) {
            n = r.bounds(n);
            var t = this.min,
                i = this.max,
                u = n.min,
                f = n.max,
                e = f.x >= t.x && u.x <= i.x,
                o = f.y >= t.y && u.y <= i.y;
            return e && o
        },
        isValid: function() {
            return !(!this.min || !this.max)
        }
    };
    r.bounds = function(n, t) {
        return !n || n instanceof r.Bounds ? n : new r.Bounds(n, t)
    };
    r.Transformation = function(n, t, i, r) {
        this._a = n;
        this._b = t;
        this._c = i;
        this._d = r
    };
    r.Transformation.prototype = {
        transform: function(n, t) {
            return this._transform(n.clone(), t)
        },
        _transform: function(n, t) {
            return t = t || 1, n.x = t * (this._a * n.x + this._b), n.y = t * (this._c * n.y + this._d), n
        },
        untransform: function(n, t) {
            return t = t || 1, new r.Point((n.x / t - this._b) / this._a, (n.y / t - this._d) / this._c)
        }
    };
    r.DomUtil = {
        get: function(n) {
            return "string" == typeof n ? t.getElementById(n) : n
        },
        getStyle: function(n, i) {
            var r = n.style[i],
                u;
            return (!r && n.currentStyle && (r = n.currentStyle[i]), (!r || "auto" === r) && t.defaultView) && (u = t.defaultView.getComputedStyle(n, null), r = u ? u[i] : null), "auto" === r ? null : r
        },
        getViewportOffset: function(n) {
            var o, u = 0,
                f = 0,
                i = n,
                e = t.body,
                s = t.documentElement;
            do {
                if (u += i.offsetTop || 0, f += i.offsetLeft || 0, u += parseInt(r.DomUtil.getStyle(i, "borderTopWidth"), 10) || 0, f += parseInt(r.DomUtil.getStyle(i, "borderLeftWidth"), 10) || 0, o = r.DomUtil.getStyle(i, "position"), i.offsetParent === e && "absolute" === o) break;
                if ("fixed" === o) {
                    u += e.scrollTop || s.scrollTop || 0;
                    f += e.scrollLeft || s.scrollLeft || 0;
                    break
                }
                if ("relative" === o && !i.offsetLeft) {
                    var c = r.DomUtil.getStyle(i, "width"),
                        l = r.DomUtil.getStyle(i, "max-width"),
                        h = i.getBoundingClientRect();
                    ("none" !== c || "none" !== l) && (f += h.left + i.clientLeft);
                    u += h.top + (e.scrollTop || s.scrollTop || 0);
                    break
                }
                i = i.offsetParent
            } while (i);
            i = n;
            do {
                if (i === e) break;
                u -= i.scrollTop || 0;
                f -= i.scrollLeft || 0;
                i = i.parentNode
            } while (i);
            return new r.Point(f, u)
        },
        documentIsLtr: function() {
            return r.DomUtil._docIsLtrCached || (r.DomUtil._docIsLtrCached = !0, r.DomUtil._docIsLtr = "ltr" === r.DomUtil.getStyle(t.body, "direction")), r.DomUtil._docIsLtr
        },
        create: function(n, i, r) {
            var u = t.createElement(n);
            return u.className = i, r && r.appendChild(u), u
        },
        hasClass: function(n, t) {
            if (n.classList !== i) return n.classList.contains(t);
            var u = r.DomUtil._getClass(n);
            return u.length > 0 && new RegExp("(^|\\s)" + t + "(\\s|$)").test(u)
        },
        addClass: function(n, t) {
            var f;
            if (n.classList !== i) for (var e = r.Util.splitWords(t), u = 0, o = e.length; o > u; u++) n.classList.add(e[u]);
            else r.DomUtil.hasClass(n, t) || (f = r.DomUtil._getClass(n), r.DomUtil._setClass(n, (f ? f + " " : "") + t))
        },
        removeClass: function(n, t) {
            n.classList !== i ? n.classList.remove(t) : r.DomUtil._setClass(n, r.Util.trim((" " + r.DomUtil._getClass(n) + " ").replace(" " + t + " ", " ")))
        },
        _setClass: function(n, t) {
            n.className.baseVal === i ? n.className = t : n.className.baseVal = t
        },
        _getClass: function(n) {
            return n.className.baseVal === i ? n.className : n.className.baseVal
        },
        setOpacity: function(n, t) {
            if ("opacity" in n.style) n.style.opacity = t;
            else if ("filter" in n.style) {
                var i = !1,
                    r = "DXImageTransform.Microsoft.Alpha";
                try {
                    i = n.filters.item(r)
                } catch (u) {
                    if (1 === t) return
                }
                t = Math.round(100 * t);
                i ? (i.Enabled = 100 !== t, i.Opacity = t) : n.style.filter += " progid:" + r + "(opacity=" + t + ")"
            }
        },
        testProp: function(n) {
            for (var r = t.documentElement.style, i = 0; i < n.length; i++) if (n[i] in r) return n[i];
            return !1
        },
        getTranslateString: function(n) {
            var t = r.Browser.webkit3d,
                i = "translate" + (t ? "3d" : "") + "(",
                u = (t ? ",0" : "") + ")";
            return i + n.x + "px," + n.y + "px" + u
        },
        getScaleString: function(n, t) {
            var i = r.DomUtil.getTranslateString(t.add(t.multiplyBy(-1 * n))),
                u = " scale(" + n + ") ";
            return i + u
        },
        setPosition: function(n, t, i) {
            n._leaflet_pos = t;
            !i && r.Browser.any3d ? n.style[r.DomUtil.TRANSFORM] = r.DomUtil.getTranslateString(t) : (n.style.left = t.x + "px", n.style.top = t.y + "px")
        },
        getPosition: function(n) {
            return n._leaflet_pos
        }
    };
    r.DomUtil.TRANSFORM = r.DomUtil.testProp(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]);
    r.DomUtil.TRANSITION = r.DomUtil.testProp(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
    r.DomUtil.TRANSITION_END = "webkitTransition" === r.DomUtil.TRANSITION || "OTransition" === r.DomUtil.TRANSITION ? r.DomUtil.TRANSITION + "End" : "transitionend",
    function() {
        if ("onselectstart" in t) r.extend(r.DomUtil, {
            disableTextSelection: function() {
                r.DomEvent.on(n, "selectstart", r.DomEvent.preventDefault)
            },
            enableTextSelection: function() {
                r.DomEvent.off(n, "selectstart", r.DomEvent.preventDefault)
            }
        });
        else {
            var i = r.DomUtil.testProp(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
            r.extend(r.DomUtil, {
                disableTextSelection: function() {
                    if (i) {
                        var n = t.documentElement.style;
                        this._userSelect = n[i];
                        n[i] = "none"
                    }
                },
                enableTextSelection: function() {
                    i && (t.documentElement.style[i] = this._userSelect, delete this._userSelect)
                }
            })
        }
        r.extend(r.DomUtil, {
            disableImageDrag: function() {
                r.DomEvent.on(n, "dragstart", r.DomEvent.preventDefault)
            },
            enableImageDrag: function() {
                r.DomEvent.off(n, "dragstart", r.DomEvent.preventDefault)
            }
        })
    }();
    r.LatLng = function(n, t, r) {
        if (n = parseFloat(n), t = parseFloat(t), isNaN(n) || isNaN(t)) throw new Error("Invalid LatLng object: (" + n + ", " + t + ")");
        this.lat = n;
        this.lng = t;
        r !== i && (this.alt = parseFloat(r))
    };
    r.extend(r.LatLng, {
        DEG_TO_RAD: Math.PI / 180,
        RAD_TO_DEG: 180 / Math.PI,
        MAX_MARGIN: 1e-9
    });
    r.LatLng.prototype = {
        equals: function(n) {
            if (!n) return !1;
            n = r.latLng(n);
            var t = Math.max(Math.abs(this.lat - n.lat), Math.abs(this.lng - n.lng));
            return t <= r.LatLng.MAX_MARGIN
        },
        toString: function(n) {
            return "LatLng(" + r.Util.formatNum(this.lat, n) + ", " + r.Util.formatNum(this.lng, n) + ")"
        },
        distanceTo: function(n) {
            n = r.latLng(n);
            var t = r.LatLng.DEG_TO_RAD,
                e = (n.lat - this.lat) * t,
                o = (n.lng - this.lng) * t,
                s = this.lat * t,
                h = n.lat * t,
                i = Math.sin(e / 2),
                u = Math.sin(o / 2),
                f = i * i + u * u * Math.cos(s) * Math.cos(h);
            return 12756274 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f))
        },
        wrap: function(n, t) {
            var i = this.lng;
            return n = n || -180, t = t || 180, i = (i + t) % (t - n) + (n > i || i === t ? t : n), new r.LatLng(this.lat, i)
        }
    };
    r.latLng = function(n, t) {
        return n instanceof r.LatLng ? n : r.Util.isArray(n) ? "number" == typeof n[0] || "string" == typeof n[0] ? new r.LatLng(n[0], n[1], n[2]) : null : n === i || null === n ? n : "object" == typeof n && "lat" in n ? new r.LatLng(n.lat, "lng" in n ? n.lng : n.lon) : t === i ? null : new r.LatLng(n, t)
    };
    r.LatLngBounds = function(n, t) {
        if (n) for (var r = t ? [n, t] : n, i = 0, u = r.length; u > i; i++) this.extend(r[i])
    };
    r.LatLngBounds.prototype = {
        extend: function(n) {
            if (!n) return this;
            var t = r.latLng(n);
            return n = null !== t ? t : r.latLngBounds(n), n instanceof r.LatLng ? this._southWest || this._northEast ? (this._southWest.lat = Math.min(n.lat, this._southWest.lat), this._southWest.lng = Math.min(n.lng, this._southWest.lng), this._northEast.lat = Math.max(n.lat, this._northEast.lat), this._northEast.lng = Math.max(n.lng, this._northEast.lng)) : (this._southWest = new r.LatLng(n.lat, n.lng), this._northEast = new r.LatLng(n.lat, n.lng)) : n instanceof r.LatLngBounds && (this.extend(n._southWest), this.extend(n._northEast)), this
        },
        pad: function(n) {
            var t = this._southWest,
                i = this._northEast,
                u = Math.abs(t.lat - i.lat) * n,
                f = Math.abs(t.lng - i.lng) * n;
            return new r.LatLngBounds(new r.LatLng(t.lat - u, t.lng - f), new r.LatLng(i.lat + u, i.lng + f))
        },
        getCenter: function() {
            return new r.LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
        },
        getSouthWest: function() {
            return this._southWest
        },
        getNorthEast: function() {
            return this._northEast
        },
        getNorthWest: function() {
            return new r.LatLng(this.getNorth(), this.getWest())
        },
        getSouthEast: function() {
            return new r.LatLng(this.getSouth(), this.getEast())
        },
        getWest: function() {
            return this._southWest.lng
        },
        getSouth: function() {
            return this._southWest.lat
        },
        getEast: function() {
            return this._northEast.lng
        },
        getNorth: function() {
            return this._northEast.lat
        },
        contains: function(n) {
            n = "number" == typeof n[0] || n instanceof r.LatLng ? r.latLng(n) : r.latLngBounds(n);
            var t, i, u = this._southWest,
                f = this._northEast;
            return n instanceof r.LatLngBounds ? (t = n.getSouthWest(), i = n.getNorthEast()) : t = i = n, t.lat >= u.lat && i.lat <= f.lat && t.lng >= u.lng && i.lng <= f.lng
        },
        intersects: function(n) {
            n = r.latLngBounds(n);
            var t = this._southWest,
                i = this._northEast,
                u = n.getSouthWest(),
                f = n.getNorthEast(),
                e = f.lat >= t.lat && u.lat <= i.lat,
                o = f.lng >= t.lng && u.lng <= i.lng;
            return e && o
        },
        toBBoxString: function() {
            return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",")
        },
        equals: function(n) {
            return n ? (n = r.latLngBounds(n), this._southWest.equals(n.getSouthWest()) && this._northEast.equals(n.getNorthEast())) : !1
        },
        isValid: function() {
            return !(!this._southWest || !this._northEast)
        }
    };
    r.latLngBounds = function(n, t) {
        return !n || n instanceof r.LatLngBounds ? n : new r.LatLngBounds(n, t)
    };
    r.Projection = {};
    r.Projection.SphericalMercator = {
        MAX_LATITUDE: 85.0511287798,
        project: function(n) {
            var i = r.LatLng.DEG_TO_RAD,
                u = this.MAX_LATITUDE,
                f = Math.max(Math.min(u, n.lat), -u),
                e = n.lng * i,
                t = f * i;
            return t = Math.log(Math.tan(Math.PI / 4 + t / 2)), new r.Point(e, t)
        },
        unproject: function(n) {
            var t = r.LatLng.RAD_TO_DEG,
                i = n.x * t,
                u = (2 * Math.atan(Math.exp(n.y)) - Math.PI / 2) * t;
            return new r.LatLng(u, i)
        }
    };
    r.Projection.LonLat = {
        project: function(n) {
            return new r.Point(n.lng, n.lat)
        },
        unproject: function(n) {
            return new r.LatLng(n.y, n.x)
        }
    };
    r.CRS = {
        latLngToPoint: function(n, t) {
            var i = this.projection.project(n),
                r = this.scale(t);
            return this.transformation._transform(i, r)
        },
        pointToLatLng: function(n, t) {
            var i = this.scale(t),
                r = this.transformation.untransform(n, i);
            return this.projection.unproject(r)
        },
        project: function(n) {
            return this.projection.project(n)
        },
        scale: function(n) {
            return 256 * Math.pow(2, n)
        },
        getSize: function(n) {
            var t = this.scale(n);
            return r.point(t, t)
        }
    };
    r.CRS.Simple = r.extend({}, r.CRS, {
        projection: r.Projection.LonLat,
        transformation: new r.Transformation(1, 0, -1, 0),
        scale: function(n) {
            return Math.pow(2, n)
        }
    });
    r.CRS.EPSG3857 = r.extend({}, r.CRS, {
        code: "EPSG:3857",
        projection: r.Projection.SphericalMercator,
        transformation: new r.Transformation(.5 / Math.PI, .5, -.5 / Math.PI, .5),
        project: function(n) {
            var t = this.projection.project(n);
            return t.multiplyBy(6378137)
        }
    });
    r.CRS.EPSG900913 = r.extend({}, r.CRS.EPSG3857, {
        code: "EPSG:900913"
    });
    r.CRS.EPSG4326 = r.extend({}, r.CRS, {
        code: "EPSG:4326",
        projection: r.Projection.LonLat,
        transformation: new r.Transformation(1 / 360, .5, -1 / 360, .5)
    });
    r.Map = r.Class.extend({
        includes: r.Mixin.Events,
        options: {
            crs: r.CRS.EPSG3857,
            fadeAnimation: r.DomUtil.TRANSITION && !r.Browser.android23,
            trackResize: !0,
            markerZoomAnimation: r.DomUtil.TRANSITION && r.Browser.any3d
        },
        initialize: function(n, t) {
            t = r.setOptions(this, t);
            this._initContainer(n);
            this._initLayout();
            this._onResize = r.bind(this._onResize, this);
            this._initEvents();
            t.maxBounds && this.setMaxBounds(t.maxBounds);
            t.center && t.zoom !== i && this.setView(r.latLng(t.center), t.zoom, {
                reset: !0
            });
            this._handlers = [];
            this._layers = {};
            this._zoomBoundLayers = {};
            this._tileLayersNum = 0;
            this.callInitHooks();
            this._addLayers(t.layers)
        },
        setView: function(n, t) {
            return t = t === i ? this.getZoom() : t, this._resetView(r.latLng(n), this._limitZoom(t)), this
        },
        setZoom: function(n, t) {
            return this._loaded ? this.setView(this.getCenter(), n, {
                zoom: t
            }) : (this._zoom = this._limitZoom(n), this)
        },
        zoomIn: function(n, t) {
            return this.setZoom(this._zoom + (n || 1), t)
        },
        zoomOut: function(n, t) {
            return this.setZoom(this._zoom - (n || 1), t)
        },
        setZoomAround: function(n, t, i) {
            var f = this.getZoomScale(t),
                u = this.getSize().divideBy(2),
                e = n instanceof r.Point ? n : this.latLngToContainerPoint(n),
                o = e.subtract(u).multiplyBy(1 - 1 / f),
                s = this.containerPointToLatLng(u.add(o));
            return this.setView(s, t, {
                zoom: i
            })
        },
        fitBounds: function(n, t) {
            t = t || {};
            n = n.getBounds ? n.getBounds() : r.latLngBounds(n);
            var u = r.point(t.paddingTopLeft || t.padding || [0, 0]),
                f = r.point(t.paddingBottomRight || t.padding || [0, 0]),
                i = this.getBoundsZoom(n, !1, u.add(f));
            i = t.maxZoom ? Math.min(t.maxZoom, i) : i;
            var e = f.subtract(u).divideBy(2),
                o = this.project(n.getSouthWest(), i),
                s = this.project(n.getNorthEast(), i),
                h = this.unproject(o.add(s).divideBy(2).add(e), i);
            return this.setView(h, i, t)
        },
        fitWorld: function(n) {
            return this.fitBounds([
                [-90, -180],
                [90, 180]
            ], n)
        },
        panTo: function(n, t) {
            return this.setView(n, this._zoom, {
                pan: t
            })
        },
        panBy: function(n) {
            return this.fire("movestart"), this._rawPanBy(r.point(n)), this.fire("move"), this.fire("moveend")
        },
        setMaxBounds: function(n) {
            return n = r.latLngBounds(n), this.options.maxBounds = n, n ? (this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds, this)) : this.off("moveend", this._panInsideMaxBounds, this)
        },
        panInsideBounds: function(n, t) {
            var i = this.getCenter(),
                r = this._limitCenter(i, this._zoom, n);
            return i.equals(r) ? this : this.panTo(r, t)
        },
        addLayer: function(n) {
            var t = r.stamp(n);
            return this._layers[t] ? this : (this._layers[t] = n, !n.options || isNaN(n.options.maxZoom) && isNaN(n.options.minZoom) || (this._zoomBoundLayers[t] = n, this._updateZoomLevels()), this.options.zoomAnimation && r.TileLayer && n instanceof r.TileLayer && (this._tileLayersNum++, this._tileLayersToLoad++, n.on("load", this._onTileLayerLoad, this)), this._loaded && this._layerAdd(n), this)
        },
        removeLayer: function(n) {
            var t = r.stamp(n);
            return this._layers[t] ? (this._loaded && n.onRemove(this), delete this._layers[t], this._loaded && this.fire("layerremove", {
                layer: n
            }), this._zoomBoundLayers[t] && (delete this._zoomBoundLayers[t], this._updateZoomLevels()), this.options.zoomAnimation && r.TileLayer && n instanceof r.TileLayer && (this._tileLayersNum--, this._tileLayersToLoad--, n.off("load", this._onTileLayerLoad, this)), this) : this
        },
        hasLayer: function(n) {
            return n ? r.stamp(n) in this._layers : !1
        },
        eachLayer: function(n, t) {
            for (var i in this._layers) n.call(t, this._layers[i]);
            return this
        },
        invalidateSize: function(n) {
            var i;
            if (!this._loaded) return this;
            n = r.extend({
                animate: !1,
                pan: !0
            }, n === !0 ? {
                animate: !0
            } : n);
            i = this.getSize();
            this._sizeChanged = !0;
            this._initialCenter = null;
            var u = this.getSize(),
                f = i.divideBy(2).round(),
                e = u.divideBy(2).round(),
                t = f.subtract(e);
            return t.x || t.y ? (n.animate && n.pan ? this.panBy(t) : (n.pan && this._rawPanBy(t), this.fire("move"), n.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(r.bind(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
                oldSize: i,
                newSize: u
            })) : this
        },
        addHandler: function(n, t) {
            if (!t) return this;
            var i = this[n] = new t(this);
            return this._handlers.push(i), this.options[n] && i.enable(), this
        },
        remove: function() {
            this._loaded && this.fire("unload");
            this._initEvents("off");
            try {
                delete this._container._leaflet
            } catch (n) {
                this._container._leaflet = i
            }
            return this._clearPanes(), this._clearControlPos && this._clearControlPos(), this._clearHandlers(), this
        },
        getCenter: function() {
            return this._checkIfLoaded(), this._initialCenter && !this._moved() ? this._initialCenter : this.layerPointToLatLng(this._getCenterLayerPoint())
        },
        getZoom: function() {
            return this._zoom
        },
        getBounds: function() {
            var n = this.getPixelBounds(),
                t = this.unproject(n.getBottomLeft()),
                i = this.unproject(n.getTopRight());
            return new r.LatLngBounds(t, i)
        },
        getMinZoom: function() {
            return this.options.minZoom === i ? this._layersMinZoom === i ? 0 : this._layersMinZoom : this.options.minZoom
        },
        getMaxZoom: function() {
            return this.options.maxZoom === i ? this._layersMaxZoom === i ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom
        },
        getBoundsZoom: function(n, t, i) {
            n = r.latLngBounds(n);
            var f, u = this.getMinZoom() - (t ? 1 : 0),
                s = this.getMaxZoom(),
                e = this.getSize(),
                h = n.getNorthWest(),
                c = n.getSouthEast(),
                o = !0;
            i = r.point(i || [0, 0]);
            do u++, f = this.project(c, u).subtract(this.project(h, u)).add(i), o = t ? f.x < e.x || f.y < e.y : e.contains(f);
            while (o && s >= u);
            return o && t ? null : t ? u : u - 1
        },
        getSize: function() {
            return (!this._size || this._sizeChanged) && (this._size = new r.Point(this._container.clientWidth, this._container.clientHeight), this._sizeChanged = !1), this._size.clone()
        },
        getPixelBounds: function() {
            var n = this._getTopLeftPoint();
            return new r.Bounds(n, n.add(this.getSize()))
        },
        getPixelOrigin: function() {
            return this._checkIfLoaded(), this._initialTopLeftPoint
        },
        getPanes: function() {
            return this._panes
        },
        getContainer: function() {
            return this._container
        },
        getZoomScale: function(n) {
            var t = this.options.crs;
            return t.scale(n) / t.scale(this._zoom)
        },
        getScaleZoom: function(n) {
            return this._zoom + Math.log(n) / Math.LN2
        },
        project: function(n, t) {
            return t = t === i ? this._zoom : t, this.options.crs.latLngToPoint(r.latLng(n), t)
        },
        unproject: function(n, t) {
            return t = t === i ? this._zoom : t, this.options.crs.pointToLatLng(r.point(n), t)
        },
        layerPointToLatLng: function(n) {
            var t = r.point(n).add(this.getPixelOrigin());
            return this.unproject(t)
        },
        latLngToLayerPoint: function(n) {
            var t = this.project(r.latLng(n))._round();
            return t._subtract(this.getPixelOrigin())
        },
        containerPointToLayerPoint: function(n) {
            return r.point(n).subtract(this._getMapPanePos())
        },
        layerPointToContainerPoint: function(n) {
            return r.point(n).add(this._getMapPanePos())
        },
        containerPointToLatLng: function(n) {
            var t = this.containerPointToLayerPoint(r.point(n));
            return this.layerPointToLatLng(t)
        },
        latLngToContainerPoint: function(n) {
            return this.layerPointToContainerPoint(this.latLngToLayerPoint(r.latLng(n)))
        },
        mouseEventToContainerPoint: function(n) {
            return r.DomEvent.getMousePosition(n, this._container)
        },
        mouseEventToLayerPoint: function(n) {
            return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(n))
        },
        mouseEventToLatLng: function(n) {
            return this.layerPointToLatLng(this.mouseEventToLayerPoint(n))
        },
        _initContainer: function(n) {
            var t = this._container = r.DomUtil.get(n);
            if (!t) throw new Error("Map container not found.");
            if (t._leaflet) throw new Error("Map container is already initialized.");
            t._leaflet = !0
        },
        _initLayout: function() {
            var t = this._container,
                n;
            r.DomUtil.addClass(t, "leaflet-container" + (r.Browser.touch ? " leaflet-touch" : "") + (r.Browser.retina ? " leaflet-retina" : "") + (r.Browser.ielt9 ? " leaflet-oldie" : "") + (this.options.fadeAnimation ? " leaflet-fade-anim" : ""));
            n = r.DomUtil.getStyle(t, "position");
            "absolute" !== n && "relative" !== n && "fixed" !== n && (t.style.position = "relative");
            this._initPanes();
            this._initControlPos && this._initControlPos()
        },
        _initPanes: function() {
            var n = this._panes = {}, t;
            this._mapPane = n.mapPane = this._createPane("leaflet-map-pane", this._container);
            this._tilePane = n.tilePane = this._createPane("leaflet-tile-pane", this._mapPane);
            n.objectsPane = this._createPane("leaflet-objects-pane", this._mapPane);
            n.shadowPane = this._createPane("leaflet-shadow-pane");
            n.overlayPane = this._createPane("leaflet-overlay-pane");
            n.markerPane = this._createPane("leaflet-marker-pane");
            n.popupPane = this._createPane("leaflet-popup-pane");
            t = " leaflet-zoom-hide";
            this.options.markerZoomAnimation || (r.DomUtil.addClass(n.markerPane, t), r.DomUtil.addClass(n.shadowPane, t), r.DomUtil.addClass(n.popupPane, t))
        },
        _createPane: function(n, t) {
            return r.DomUtil.create("div", n, t || this._panes.objectsPane)
        },
        _clearPanes: function() {
            this._container.removeChild(this._mapPane)
        },
        _addLayers: function(n) {
            n = n ? r.Util.isArray(n) ? n : [n] : [];
            for (var t = 0, i = n.length; i > t; t++) this.addLayer(n[t])
        },
        _resetView: function(n, t, i, u) {
            var f = this._zoom !== t,
                e;
            u || (this.fire("movestart"), f && this.fire("zoomstart"));
            this._zoom = t;
            this._initialCenter = n;
            this._initialTopLeftPoint = this._getNewTopLeftPoint(n);
            i ? this._initialTopLeftPoint._add(this._getMapPanePos()) : r.DomUtil.setPosition(this._mapPane, new r.Point(0, 0));
            this._tileLayersToLoad = this._tileLayersNum;
            e = !this._loaded;
            this._loaded = !0;
            this.fire("viewreset", {
                hard: !i
            });
            e && (this.fire("load"), this.eachLayer(this._layerAdd, this));
            this.fire("move");
            (f || u) && this.fire("zoomend");
            this.fire("moveend", {
                hard: !i
            })
        },
        _rawPanBy: function(n) {
            r.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(n))
        },
        _getZoomSpan: function() {
            return this.getMaxZoom() - this.getMinZoom()
        },
        _updateZoomLevels: function() {
            var t, r = 1 / 0,
                u = -(1 / 0),
                f = this._getZoomSpan(),
                n;
            for (t in this._zoomBoundLayers) n = this._zoomBoundLayers[t], isNaN(n.options.minZoom) || (r = Math.min(r, n.options.minZoom)), isNaN(n.options.maxZoom) || (u = Math.max(u, n.options.maxZoom));
            t === i ? this._layersMaxZoom = this._layersMinZoom = i : (this._layersMaxZoom = u, this._layersMinZoom = r);
            f !== this._getZoomSpan() && this.fire("zoomlevelschange")
        },
        _panInsideMaxBounds: function() {
            this.panInsideBounds(this.options.maxBounds)
        },
        _checkIfLoaded: function() {
            if (!this._loaded) throw new Error("Set map center and zoom first.");
        },
        _initEvents: function(t) {
            if (r.DomEvent) {
                t = t || "on";
                r.DomEvent[t](this._container, "click", this._onMouseClick, this);
                for (var f = ["dblclick", "mousedown", "mouseup", "mouseenter", "mouseleave", "mousemove", "contextmenu"], i = 0, u = f.length; u > i; i++) r.DomEvent[t](this._container, f[i], this._fireMouseEvent, this);
                this.options.trackResize && r.DomEvent[t](n, "resize", this._onResize, this)
            }
        },
        _onResize: function() {
            r.Util.cancelAnimFrame(this._resizeRequest);
            this._resizeRequest = r.Util.requestAnimFrame(function() {
                this.invalidateSize({
                    debounceMoveend: !0
                })
            }, this, !1, this._container)
        },
        _onMouseClick: function(n) {
            !this._loaded || !n._simulated && (this.dragging && this.dragging.moved() || this.boxZoom && this.boxZoom.moved()) || r.DomEvent._skipped(n) || (this.fire("preclick"), this._fireMouseEvent(n))
        },
        _fireMouseEvent: function(n) {
            var t;
            if (this._loaded && !r.DomEvent._skipped(n) && (t = n.type, t = "mouseenter" === t ? "mouseover" : "mouseleave" === t ? "mouseout" : t, this.hasEventListeners(t))) {
                "contextmenu" === t && r.DomEvent.preventDefault(n);
                var i = this.mouseEventToContainerPoint(n),
                    u = this.containerPointToLayerPoint(i),
                    f = this.layerPointToLatLng(u);
                this.fire(t, {
                    latlng: f,
                    layerPoint: u,
                    containerPoint: i,
                    originalEvent: n
                })
            }
        },
        _onTileLayerLoad: function() {
            this._tileLayersToLoad--;
            this._tileLayersNum && !this._tileLayersToLoad && this.fire("tilelayersload")
        },
        _clearHandlers: function() {
            for (var n = 0, t = this._handlers.length; t > n; n++) this._handlers[n].disable()
        },
        whenReady: function(n, t) {
            return this._loaded ? n.call(t || this, this) : this.on("load", n, t), this
        },
        _layerAdd: function(n) {
            n.onAdd(this);
            this.fire("layeradd", {
                layer: n
            })
        },
        _getMapPanePos: function() {
            return r.DomUtil.getPosition(this._mapPane)
        },
        _moved: function() {
            var n = this._getMapPanePos();
            return n && !n.equals([0, 0])
        },
        _getTopLeftPoint: function() {
            return this.getPixelOrigin().subtract(this._getMapPanePos())
        },
        _getNewTopLeftPoint: function(n, t) {
            var i = this.getSize()._divideBy(2);
            return this.project(n, t)._subtract(i)._round()
        },
        _latLngToNewLayerPoint: function(n, t, i) {
            var r = this._getNewTopLeftPoint(i, t).add(this._getMapPanePos());
            return this.project(n, t)._subtract(r)
        },
        _getCenterLayerPoint: function() {
            return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
        },
        _getCenterOffset: function(n) {
            return this.latLngToLayerPoint(n).subtract(this._getCenterLayerPoint())
        },
        _limitCenter: function(n, t, i) {
            if (!i) return n;
            var u = this.project(n, t),
                f = this.getSize().divideBy(2),
                e = new r.Bounds(u.subtract(f), u.add(f)),
                o = this._getBoundsOffset(e, i, t);
            return this.unproject(u.add(o), t)
        },
        _limitOffset: function(n, t) {
            if (!t) return n;
            var i = this.getPixelBounds(),
                u = new r.Bounds(i.min.add(n), i.max.add(n));
            return n.add(this._getBoundsOffset(u, t))
        },
        _getBoundsOffset: function(n, t, i) {
            var u = this.project(t.getNorthWest(), i).subtract(n.min),
                f = this.project(t.getSouthEast(), i).subtract(n.max),
                e = this._rebound(u.x, -f.x),
                o = this._rebound(u.y, -f.y);
            return new r.Point(e, o)
        },
        _rebound: function(n, t) {
            return n + t > 0 ? Math.round(n - t) / 2 : Math.max(0, Math.ceil(n)) - Math.max(0, Math.floor(t))
        },
        _limitZoom: function(n) {
            var t = this.getMinZoom(),
                i = this.getMaxZoom();
            return Math.max(t, Math.min(i, n))
        }
    });
    r.map = function(n, t) {
        return new r.Map(n, t)
    };
    r.Projection.Mercator = {
        MAX_LATITUDE: 85.0840591556,
        R_MINOR: 6356752.3142451793,
        R_MAJOR: 6378137,
        project: function(n) {
            var f = r.LatLng.DEG_TO_RAD,
                e = this.MAX_LATITUDE,
                c = Math.max(Math.min(e, n.lat), -e),
                u = this.R_MAJOR,
                l = this.R_MINOR,
                a = n.lng * f * u,
                t = c * f,
                o = l / u,
                s = Math.sqrt(1 - o * o),
                i = s * Math.sin(t),
                h;
            return i = Math.pow((1 - i) / (1 + i), .5 * s), h = Math.tan(.5 * (.5 * Math.PI - t)) / i, t = -u * Math.log(h), new r.Point(a, t)
        },
        unproject: function(n) {
            for (var i, e = r.LatLng.RAD_TO_DEG, u = this.R_MAJOR, c = this.R_MINOR, l = n.x * e / u, o = c / u, s = Math.sqrt(1 - o * o), h = Math.exp(-n.y / u), t = Math.PI / 2 - 2 * Math.atan(h), a = 15, f = .1; Math.abs(f) > 1e-7 && --a > 0;) i = s * Math.sin(t), f = Math.PI / 2 - 2 * Math.atan(h * Math.pow((1 - i) / (1 + i), .5 * s)) - t, t += f;
            return new r.LatLng(t * e, l)
        }
    };
    r.CRS.EPSG3395 = r.extend({}, r.CRS, {
        code: "EPSG:3395",
        projection: r.Projection.Mercator,
        transformation: function() {
            var t = r.Projection.Mercator,
                i = t.R_MAJOR,
                n = .5 / (Math.PI * i);
            return new r.Transformation(n, .5, -n, .5)
        }()
    });
    r.TileLayer = r.Class.extend({
        includes: r.Mixin.Events,
        options: {
            minZoom: 0,
            maxZoom: 18,
            tileSize: 256,
            subdomains: "abc",
            errorTileUrl: "",
            attribution: "",
            zoomOffset: 0,
            opacity: 1,
            unloadInvisibleTiles: r.Browser.mobile,
            updateWhenIdle: r.Browser.mobile
        },
        initialize: function(n, t) {
            t = r.setOptions(this, t);
            t.detectRetina && r.Browser.retina && t.maxZoom > 0 && (t.tileSize = Math.floor(t.tileSize / 2), t.zoomOffset++, t.minZoom > 0 && t.minZoom--, this.options.maxZoom--);
            t.bounds && (t.bounds = r.latLngBounds(t.bounds));
            this._url = n;
            var i = this.options.subdomains;
            "string" == typeof i && (this.options.subdomains = i.split(""))
        },
        onAdd: function(n) {
            this._map = n;
            this._animated = n._zoomAnimated;
            this._initContainer();
            n.on({
                viewreset: this._reset,
                moveend: this._update
            }, this);
            this._animated && n.on({
                zoomanim: this._animateZoom,
                zoomend: this._endZoomAnim
            }, this);
            this.options.updateWhenIdle || (this._limitedUpdate = r.Util.limitExecByInterval(this._update, 150, this), n.on("move", this._limitedUpdate, this));
            this._reset();
            this._update()
        },
        addTo: function(n) {
            return n.addLayer(this), this
        },
        onRemove: function(n) {
            this._container.parentNode.removeChild(this._container);
            n.off({
                viewreset: this._reset,
                moveend: this._update
            }, this);
            this._animated && n.off({
                zoomanim: this._animateZoom,
                zoomend: this._endZoomAnim
            }, this);
            this.options.updateWhenIdle || n.off("move", this._limitedUpdate, this);
            this._container = null;
            this._map = null
        },
        bringToFront: function() {
            var n = this._map._panes.tilePane;
            return this._container && (n.appendChild(this._container), this._setAutoZIndex(n, Math.max)), this
        },
        bringToBack: function() {
            var n = this._map._panes.tilePane;
            return this._container && (n.insertBefore(this._container, n.firstChild), this._setAutoZIndex(n, Math.min)), this
        },
        getAttribution: function() {
            return this.options.attribution
        },
        getContainer: function() {
            return this._container
        },
        setOpacity: function(n) {
            return this.options.opacity = n, this._map && this._updateOpacity(), this
        },
        setZIndex: function(n) {
            return this.options.zIndex = n, this._updateZIndex(), this
        },
        setUrl: function(n, t) {
            return this._url = n, t || this.redraw(), this
        },
        redraw: function() {
            return this._map && (this._reset({
                hard: !0
            }), this._update()), this
        },
        _updateZIndex: function() {
            this._container && this.options.zIndex !== i && (this._container.style.zIndex = this.options.zIndex)
        },
        _setAutoZIndex: function(n, t) {
            for (var u, f = n.children, r = -t(1 / 0, -(1 / 0)), i = 0, e = f.length; e > i; i++) f[i] !== this._container && (u = parseInt(f[i].style.zIndex, 10), isNaN(u) || (r = t(r, u)));
            this.options.zIndex = this._container.style.zIndex = (isFinite(r) ? r : 0) + t(1, -1)
        },
        _updateOpacity: function() {
            var n, t = this._tiles;
            if (r.Browser.ielt9) for (n in t) r.DomUtil.setOpacity(t[n], this.options.opacity);
            else r.DomUtil.setOpacity(this._container, this.options.opacity)
        },
        _initContainer: function() {
            var t = this._map._panes.tilePane,
                n;
            this._container || ((this._container = r.DomUtil.create("div", "leaflet-layer"), this._updateZIndex(), this._animated) ? (n = "leaflet-tile-container", this._bgBuffer = r.DomUtil.create("div", n, this._container), this._tileContainer = r.DomUtil.create("div", n, this._container)) : this._tileContainer = this._container, t.appendChild(this._container), this.options.opacity < 1 && this._updateOpacity())
        },
        _reset: function(n) {
            for (var t in this._tiles) this.fire("tileunload", {
                tile: this._tiles[t]
            });
            this._tiles = {};
            this._tilesToLoad = 0;
            this.options.reuseTiles && (this._unusedTiles = []);
            this._tileContainer.innerHTML = "";
            this._animated && n && n.hard && this._clearBgBuffer();
            this._initContainer()
        },
        _getTileSize: function() {
            var n = this._map,
                r = n.getZoom() + this.options.zoomOffset,
                t = this.options.maxNativeZoom,
                i = this.options.tileSize;
            return t && r > t && (i = Math.round(n.getZoomScale(r) / n.getZoomScale(t) * i)), i
        },
        _update: function() {
            var n;
            if (this._map) {
                var t = this._map,
                    i = t.getPixelBounds(),
                    u = t.getZoom(),
                    f = this._getTileSize();
                u > this.options.maxZoom || u < this.options.minZoom || (n = r.bounds(i.min.divideBy(f)._floor(), i.max.divideBy(f)._floor()), this._addTilesFromCenterOut(n), (this.options.unloadInvisibleTiles || this.options.reuseTiles) && this._removeOtherTiles(n))
            }
        },
        _addTilesFromCenterOut: function(n) {
            for (var i, o, f = [], h = n.getCenter(), e, s, u = n.min.y; u <= n.max.y; u++) for (i = n.min.x; i <= n.max.x; i++) o = new r.Point(i, u), this._tileShouldBeLoaded(o) && f.push(o);
            if (e = f.length, 0 !== e) {
                for (f.sort(function(n, t) {
                    return n.distanceTo(h) - t.distanceTo(h)
                }), s = t.createDocumentFragment(), this._tilesToLoad || this.fire("loading"), this._tilesToLoad += e, i = 0; e > i; i++) this._addTile(f[i], s);
                this._tileContainer.appendChild(s)
            }
        },
        _tileShouldBeLoaded: function(n) {
            var t, i;
            if (n.x + ":" + n.y in this._tiles || (t = this.options, !t.continuousWorld && (i = this._getWrapTileNum(), t.noWrap && (n.x < 0 || n.x >= i.x) || n.y < 0 || n.y >= i.y))) return !1;
            if (t.bounds) {
                var r = this._getTileSize(),
                    e = n.multiplyBy(r),
                    o = e.add([r, r]),
                    u = this._map.unproject(e),
                    f = this._map.unproject(o);
                if (t.continuousWorld || t.noWrap || (u = u.wrap(), f = f.wrap()), !t.bounds.intersects([u, f])) return !1
            }
            return !0
        },
        _removeOtherTiles: function(n) {
            var t, i, r;
            for (var u in this._tiles) t = u.split(":"), i = parseInt(t[0], 10), r = parseInt(t[1], 10), (i < n.min.x || i > n.max.x || r < n.min.y || r > n.max.y) && this._removeTile(u)
        },
        _removeTile: function(n) {
            var t = this._tiles[n];
            this.fire("tileunload", {
                tile: t,
                url: t.src
            });
            this.options.reuseTiles ? (r.DomUtil.removeClass(t, "leaflet-tile-loaded"), this._unusedTiles.push(t)) : t.parentNode === this._tileContainer && this._tileContainer.removeChild(t);
            r.Browser.android || (t.onload = null, t.src = r.Util.emptyImageUrl);
            delete this._tiles[n]
        },
        _addTile: function(n, t) {
            var u = this._getTilePos(n),
                i = this._getTile();
            r.DomUtil.setPosition(i, u, r.Browser.chrome);
            this._tiles[n.x + ":" + n.y] = i;
            this._loadTile(i, n);
            i.parentNode !== this._tileContainer && t.appendChild(i)
        },
        _getZoomForUrl: function() {
            var n = this.options,
                t = this._map.getZoom();
            return n.zoomReverse && (t = n.maxZoom - t), t += n.zoomOffset, n.maxNativeZoom ? Math.min(t, n.maxNativeZoom) : t
        },
        _getTilePos: function(n) {
            var t = this._map.getPixelOrigin(),
                i = this._getTileSize();
            return n.multiplyBy(i).subtract(t)
        },
        getTileUrl: function(n) {
            return r.Util.template(this._url, r.extend({
                s: this._getSubdomain(n),
                z: n.z,
                x: n.x,
                y: n.y
            }, this.options))
        },
        _getWrapTileNum: function() {
            var n = this._map.options.crs,
                t = n.getSize(this._map.getZoom());
            return t.divideBy(this._getTileSize())._floor()
        },
        _adjustTilePoint: function(n) {
            var t = this._getWrapTileNum();
            this.options.continuousWorld || this.options.noWrap || (n.x = (n.x % t.x + t.x) % t.x);
            this.options.tms && (n.y = t.y - n.y - 1);
            n.z = this._getZoomForUrl()
        },
        _getSubdomain: function(n) {
            var t = Math.abs(n.x + n.y) % this.options.subdomains.length;
            return this.options.subdomains[t]
        },
        _getTile: function() {
            if (this.options.reuseTiles && this._unusedTiles.length > 0) {
                var n = this._unusedTiles.pop();
                return this._resetTile(n), n
            }
            return this._createTile()
        },
        _resetTile: function() {},
        _createTile: function() {
            var n = r.DomUtil.create("img", "leaflet-tile");
            return n.style.width = n.style.height = this._getTileSize() + "px", n.galleryimg = "no", n.onselectstart = n.onmousemove = r.Util.falseFn, r.Browser.ielt9 && this.options.opacity !== i && r.DomUtil.setOpacity(n, this.options.opacity), r.Browser.mobileWebkit3d && (n.style.WebkitBackfaceVisibility = "hidden"), n
        },
        _loadTile: function(n, t) {
            n._layer = this;
            n.onload = this._tileOnLoad;
            n.onerror = this._tileOnError;
            this._adjustTilePoint(t);
            n.src = this.getTileUrl(t);
            this.fire("tileloadstart", {
                tile: n,
                url: n.src
            })
        },
        _tileLoaded: function() {
            this._tilesToLoad--;
            this._animated && r.DomUtil.addClass(this._tileContainer, "leaflet-zoom-animated");
            this._tilesToLoad || (this.fire("load"), this._animated && (clearTimeout(this._clearBgBufferTimer), this._clearBgBufferTimer = setTimeout(r.bind(this._clearBgBuffer, this), 500)))
        },
        _tileOnLoad: function() {
            var n = this._layer;
            this.src !== r.Util.emptyImageUrl && (r.DomUtil.addClass(this, "leaflet-tile-loaded"), n.fire("tileload", {
                tile: this,
                url: this.src
            }));
            n._tileLoaded()
        },
        _tileOnError: function() {
            var n = this._layer,
                t;
            n.fire("tileerror", {
                tile: this,
                url: this.src
            });
            t = n.options.errorTileUrl;
            t && (this.src = t);
            n._tileLoaded()
        }
    });
    r.tileLayer = function(n, t) {
        return new r.TileLayer(n, t)
    };
    r.TileLayer.WMS = r.TileLayer.extend({
        defaultWmsParams: {
            service: "WMS",
            request: "GetMap",
            version: "1.1.1",
            layers: "",
            styles: "",
            format: "image/jpeg",
            transparent: !1
        },
        initialize: function(n, t) {
            var i, f, u;
            this._url = n;
            i = r.extend({}, this.defaultWmsParams);
            f = t.tileSize || this.options.tileSize;
            i.width = t.detectRetina && r.Browser.retina ? i.height = 2 * f : i.height = f;
            for (u in t) this.options.hasOwnProperty(u) || "crs" === u || (i[u] = t[u]);
            this.wmsParams = i;
            r.setOptions(this, t)
        },
        onAdd: function(n) {
            this._crs = this.options.crs || n.options.crs;
            this._wmsVersion = parseFloat(this.wmsParams.version);
            var t = this._wmsVersion >= 1.3 ? "crs" : "srs";
            this.wmsParams[t] = this._crs.code;
            r.TileLayer.prototype.onAdd.call(this, n)
        },
        getTileUrl: function(n) {
            var f = this._map,
                u = this.options.tileSize,
                e = n.multiplyBy(u),
                s = e.add([u, u]),
                t = this._crs.project(f.unproject(e, n.z)),
                i = this._crs.project(f.unproject(s, n.z)),
                h = this._wmsVersion >= 1.3 && this._crs === r.CRS.EPSG4326 ? [i.y, t.x, t.y, i.x].join(",") : [t.x, i.y, i.x, t.y].join(","),
                o = r.Util.template(this._url, {
                    s: this._getSubdomain(n)
                });
            return o + r.Util.getParamString(this.wmsParams, o, !0) + "&BBOX=" + h
        },
        setParams: function(n, t) {
            return r.extend(this.wmsParams, n), t || this.redraw(), this
        }
    });
    r.tileLayer.wms = function(n, t) {
        return new r.TileLayer.WMS(n, t)
    };
    r.TileLayer.Canvas = r.TileLayer.extend({
        options: {
            async: !1
        },
        initialize: function(n) {
            r.setOptions(this, n)
        },
        redraw: function() {
            this._map && (this._reset({
                hard: !0
            }), this._update());
            for (var n in this._tiles) this._redrawTile(this._tiles[n]);
            return this
        },
        _redrawTile: function(n) {
            this.drawTile(n, n._tilePoint, this._map._zoom)
        },
        _createTile: function() {
            var n = r.DomUtil.create("canvas", "leaflet-tile");
            return n.width = n.height = this.options.tileSize, n.onselectstart = n.onmousemove = r.Util.falseFn, n
        },
        _loadTile: function(n, t) {
            n._layer = this;
            n._tilePoint = t;
            this._redrawTile(n);
            this.options.async || this.tileDrawn(n)
        },
        drawTile: function() {},
        tileDrawn: function(n) {
            this._tileOnLoad.call(n)
        }
    });
    r.tileLayer.canvas = function(n) {
        return new r.TileLayer.Canvas(n)
    };
    r.ImageOverlay = r.Class.extend({
        includes: r.Mixin.Events,
        options: {
            opacity: 1
        },
        initialize: function(n, t, i) {
            this._url = n;
            this._bounds = r.latLngBounds(t);
            r.setOptions(this, i)
        },
        onAdd: function(n) {
            this._map = n;
            this._image || this._initImage();
            n._panes.overlayPane.appendChild(this._image);
            n.on("viewreset", this._reset, this);
            n.options.zoomAnimation && r.Browser.any3d && n.on("zoomanim", this._animateZoom, this);
            this._reset()
        },
        onRemove: function(n) {
            n.getPanes().overlayPane.removeChild(this._image);
            n.off("viewreset", this._reset, this);
            n.options.zoomAnimation && n.off("zoomanim", this._animateZoom, this)
        },
        addTo: function(n) {
            return n.addLayer(this), this
        },
        setOpacity: function(n) {
            return this.options.opacity = n, this._updateOpacity(), this
        },
        bringToFront: function() {
            return this._image && this._map._panes.overlayPane.appendChild(this._image), this
        },
        bringToBack: function() {
            var n = this._map._panes.overlayPane;
            return this._image && n.insertBefore(this._image, n.firstChild), this
        },
        setUrl: function(n) {
            this._url = n;
            this._image.src = this._url
        },
        getAttribution: function() {
            return this.options.attribution
        },
        _initImage: function() {
            this._image = r.DomUtil.create("img", "leaflet-image-layer");
            this._map.options.zoomAnimation && r.Browser.any3d ? r.DomUtil.addClass(this._image, "leaflet-zoom-animated") : r.DomUtil.addClass(this._image, "leaflet-zoom-hide");
            this._updateOpacity();
            r.extend(this._image, {
                galleryimg: "no",
                onselectstart: r.Util.falseFn,
                onmousemove: r.Util.falseFn,
                onload: r.bind(this._onImageLoad, this),
                src: this._url
            })
        },
        _animateZoom: function(n) {
            var t = this._map,
                f = this._image,
                i = t.getZoomScale(n.zoom),
                e = this._bounds.getNorthWest(),
                o = this._bounds.getSouthEast(),
                u = t._latLngToNewLayerPoint(e, n.zoom, n.center),
                s = t._latLngToNewLayerPoint(o, n.zoom, n.center)._subtract(u),
                h = u._add(s._multiplyBy(.5 * (1 - 1 / i)));
            f.style[r.DomUtil.TRANSFORM] = r.DomUtil.getTranslateString(h) + " scale(" + i + ") "
        },
        _reset: function() {
            var n = this._image,
                t = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
                i = this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(t);
            r.DomUtil.setPosition(n, t);
            n.style.width = i.x + "px";
            n.style.height = i.y + "px"
        },
        _onImageLoad: function() {
            this.fire("load")
        },
        _updateOpacity: function() {
            r.DomUtil.setOpacity(this._image, this.options.opacity)
        }
    });
    r.imageOverlay = function(n, t, i) {
        return new r.ImageOverlay(n, t, i)
    };
    r.Icon = r.Class.extend({
        options: {
            className: ""
        },
        initialize: function(n) {
            r.setOptions(this, n)
        },
        createIcon: function(n) {
            return this._createIcon("icon", n)
        },
        createShadow: function(n) {
            return this._createIcon("shadow", n)
        },
        _createIcon: function(n, t) {
            var i = this._getIconUrl(n),
                r;
            if (!i) {
                if ("icon" === n) throw new Error("iconUrl not set in Icon options (see the docs).");
                return null
            }
            return r = t && "IMG" === t.tagName ? this._createImg(i, t) : this._createImg(i), this._setIconStyles(r, n), r
        },
        _setIconStyles: function(n, t) {
            var i, u = this.options,
                f = r.point(u[t + "Size"]);
            i = "shadow" === t ? r.point(u.shadowAnchor || u.iconAnchor) : r.point(u.iconAnchor);
            !i && f && (i = f.divideBy(2, !0));
            n.className = "leaflet-marker-" + t + " " + u.className;
            i && (n.style.marginLeft = -i.x + "px", n.style.marginTop = -i.y + "px");
            f && (n.style.width = f.x + "px", n.style.height = f.y + "px")
        },
        _createImg: function(n, i) {
            return i = i || t.createElement("img"), i.src = n, i
        },
        _getIconUrl: function(n) {
            return r.Browser.retina && this.options[n + "RetinaUrl"] ? this.options[n + "RetinaUrl"] : this.options[n + "Url"]
        }
    });
    r.icon = function(n) {
        return new r.Icon(n)
    };
    r.Icon.Default = r.Icon.extend({
        options: {
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        },
        _getIconUrl: function(n) {
            var i = n + "Url",
                t;
            if (this.options[i]) return this.options[i];
            if (r.Browser.retina && "icon" === n && (n += "-2x"), t = r.Icon.Default.imagePath, !t) throw new Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");
            return t + "/marker-" + n + ".png"
        }
    });
    r.Icon.Default.imagePath = function() {
        for (var i, o, r, f = t.getElementsByTagName("script"), e = /[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/, n = 0, u = f.length; u > n; n++) if (i = f[n].src, o = i.match(e)) return r = i.split(e)[0], (r ? r + "/" : "") + "images"
    }();
    r.Marker = r.Class.extend({
        includes: r.Mixin.Events,
        options: {
            icon: new r.Icon.Default,
            title: "",
            alt: "",
            clickable: !0,
            draggable: !1,
            keyboard: !0,
            zIndexOffset: 0,
            opacity: 1,
            riseOnHover: !1,
            riseOffset: 250
        },
        initialize: function(n, t) {
            r.setOptions(this, t);
            this._latlng = r.latLng(n)
        },
        onAdd: function(n) {
            this._map = n;
            n.on("viewreset", this.update, this);
            this._initIcon();
            this.update();
            this.fire("add");
            n.options.zoomAnimation && n.options.markerZoomAnimation && n.on("zoomanim", this._animateZoom, this)
        },
        addTo: function(n) {
            return n.addLayer(this), this
        },
        onRemove: function(n) {
            this.dragging && this.dragging.disable();
            this._removeIcon();
            this._removeShadow();
            this.fire("remove");
            n.off({
                viewreset: this.update,
                zoomanim: this._animateZoom
            }, this);
            this._map = null
        },
        getLatLng: function() {
            return this._latlng
        },
        setLatLng: function(n) {
            return this._latlng = r.latLng(n), this.update(), this.fire("move", {
                latlng: this._latlng
            })
        },
        setZIndexOffset: function(n) {
            return this.options.zIndexOffset = n, this.update(), this
        },
        setIcon: function(n) {
            return this.options.icon = n, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup), this
        },
        update: function() {
            return this._icon && this._setPos(this._map.latLngToLayerPoint(this._latlng).round()), this
        },
        _initIcon: function() {
            var n = this.options,
                e = this._map,
                h = e.options.zoomAnimation && e.options.markerZoomAnimation,
                o = h ? "leaflet-zoom-animated" : "leaflet-zoom-hide",
                t = n.icon.createIcon(this._icon),
                s = !1,
                i, u, f;
            t !== this._icon && (this._icon && this._removeIcon(), s = !0, n.title && (t.title = n.title), n.alt && (t.alt = n.alt));
            r.DomUtil.addClass(t, o);
            n.keyboard && (t.tabIndex = "0");
            this._icon = t;
            this._initInteraction();
            n.riseOnHover && r.DomEvent.on(t, "mouseover", this._bringToFront, this).on(t, "mouseout", this._resetZIndex, this);
            i = n.icon.createShadow(this._shadow);
            u = !1;
            i !== this._shadow && (this._removeShadow(), u = !0);
            i && r.DomUtil.addClass(i, o);
            this._shadow = i;
            n.opacity < 1 && this._updateOpacity();
            f = this._map._panes;
            s && f.markerPane.appendChild(this._icon);
            i && u && f.shadowPane.appendChild(this._shadow)
        },
        _removeIcon: function() {
            this.options.riseOnHover && r.DomEvent.off(this._icon, "mouseover", this._bringToFront).off(this._icon, "mouseout", this._resetZIndex);
            this._map._panes.markerPane.removeChild(this._icon);
            this._icon = null
        },
        _removeShadow: function() {
            this._shadow && this._map._panes.shadowPane.removeChild(this._shadow);
            this._shadow = null
        },
        _setPos: function(n) {
            r.DomUtil.setPosition(this._icon, n);
            this._shadow && r.DomUtil.setPosition(this._shadow, n);
            this._zIndex = n.y + this.options.zIndexOffset;
            this._resetZIndex()
        },
        _updateZIndex: function(n) {
            this._icon.style.zIndex = this._zIndex + n
        },
        _animateZoom: function(n) {
            var t = this._map._latLngToNewLayerPoint(this._latlng, n.zoom, n.center).round();
            this._setPos(t)
        },
        _initInteraction: function() {
            var n, i, t;
            if (this.options.clickable) {
                for (n = this._icon, i = ["dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"], r.DomUtil.addClass(n, "leaflet-clickable"), r.DomEvent.on(n, "click", this._onMouseClick, this), r.DomEvent.on(n, "keypress", this._onKeyPress, this), t = 0; t < i.length; t++) r.DomEvent.on(n, i[t], this._fireMouseEvent, this);
                r.Handler.MarkerDrag && (this.dragging = new r.Handler.MarkerDrag(this), this.options.draggable && this.dragging.enable())
            }
        },
        _onMouseClick: function(n) {
            var t = this.dragging && this.dragging.moved();
            (this.hasEventListeners(n.type) || t) && r.DomEvent.stopPropagation(n);
            t || (this.dragging && this.dragging._enabled || !this._map.dragging || !this._map.dragging.moved()) && this.fire(n.type, {
                originalEvent: n,
                latlng: this._latlng
            })
        },
        _onKeyPress: function(n) {
            13 === n.keyCode && this.fire("click", {
                originalEvent: n,
                latlng: this._latlng
            })
        },
        _fireMouseEvent: function(n) {
            this.fire(n.type, {
                originalEvent: n,
                latlng: this._latlng
            });
            "contextmenu" === n.type && this.hasEventListeners(n.type) && r.DomEvent.preventDefault(n);
            "mousedown" !== n.type ? r.DomEvent.stopPropagation(n) : r.DomEvent.preventDefault(n)
        },
        setOpacity: function(n) {
            return this.options.opacity = n, this._map && this._updateOpacity(), this
        },
        _updateOpacity: function() {
            r.DomUtil.setOpacity(this._icon, this.options.opacity);
            this._shadow && r.DomUtil.setOpacity(this._shadow, this.options.opacity)
        },
        _bringToFront: function() {
            this._updateZIndex(this.options.riseOffset)
        },
        _resetZIndex: function() {
            this._updateZIndex(0)
        }
    });
    r.marker = function(n, t) {
        return new r.Marker(n, t)
    };
    r.DivIcon = r.Icon.extend({
        options: {
            iconSize: [12, 12],
            className: "leaflet-div-icon",
            html: !1
        },
        createIcon: function(n) {
            var r = n && "DIV" === n.tagName ? n : t.createElement("div"),
                i = this.options;
            return r.innerHTML = i.html !== !1 ? i.html : "", i.bgPos && (r.style.backgroundPosition = -i.bgPos.x + "px " + -i.bgPos.y + "px"), this._setIconStyles(r, "icon"), r
        },
        createShadow: function() {
            return null
        }
    });
    r.divIcon = function(n) {
        return new r.DivIcon(n)
    };
    r.Map.mergeOptions({
        closePopupOnClick: !0
    });
    r.Popup = r.Class.extend({
        includes: r.Mixin.Events,
        options: {
            minWidth: 50,
            maxWidth: 300,
            autoPan: !0,
            closeButton: !0,
            offset: [0, 7],
            autoPanPadding: [5, 5],
            keepInView: !1,
            className: "",
            zoomAnimation: !0
        },
        initialize: function(n, t) {
            r.setOptions(this, n);
            this._source = t;
            this._animated = r.Browser.any3d && this.options.zoomAnimation;
            this._isOpen = !1
        },
        onAdd: function(n) {
            this._map = n;
            this._container || this._initLayout();
            var t = n.options.fadeAnimation;
            t && r.DomUtil.setOpacity(this._container, 0);
            n._panes.popupPane.appendChild(this._container);
            n.on(this._getEvents(), this);
            this.update();
            t && r.DomUtil.setOpacity(this._container, 1);
            this.fire("open");
            n.fire("popupopen", {
                popup: this
            });
            this._source && this._source.fire("popupopen", {
                popup: this
            })
        },
        addTo: function(n) {
            return n.addLayer(this), this
        },
        openOn: function(n) {
            return n.openPopup(this), this
        },
        onRemove: function(n) {
            n._panes.popupPane.removeChild(this._container);
            r.Util.falseFn(this._container.offsetWidth);
            n.off(this._getEvents(), this);
            n.options.fadeAnimation && r.DomUtil.setOpacity(this._container, 0);
            this._map = null;
            this.fire("close");
            n.fire("popupclose", {
                popup: this
            });
            this._source && this._source.fire("popupclose", {
                popup: this
            })
        },
        getLatLng: function() {
            return this._latlng
        },
        setLatLng: function(n) {
            return this._latlng = r.latLng(n), this._map && (this._updatePosition(), this._adjustPan()), this
        },
        getContent: function() {
            return this._content
        },
        setContent: function(n) {
            return this._content = n, this.update(), this
        },
        update: function() {
            this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan())
        },
        _getEvents: function() {
            var n = {
                viewreset: this._updatePosition
            };
            return this._animated && (n.zoomanim = this._zoomAnimation), ("closeOnClick" in this.options ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (n.preclick = this._close), this.options.keepInView && (n.moveend = this._adjustPan), n
        },
        _close: function() {
            this._map && this._map.closePopup(this)
        },
        _initLayout: function() {
            var t, n = "leaflet-popup",
                f = n + " " + this.options.className + " leaflet-zoom-" + (this._animated ? "animated" : "hide"),
                u = this._container = r.DomUtil.create("div", f),
                i;
            this.options.closeButton && (t = this._closeButton = r.DomUtil.create("a", n + "-close-button", u), t.href = "#close", t.innerHTML = "&#215;", r.DomEvent.disableClickPropagation(t), r.DomEvent.on(t, "click", this._onCloseButtonClick, this));
            i = this._wrapper = r.DomUtil.create("div", n + "-content-wrapper", u);
            r.DomEvent.disableClickPropagation(i);
            this._contentNode = r.DomUtil.create("div", n + "-content", i);
            r.DomEvent.disableScrollPropagation(this._contentNode);
            r.DomEvent.on(i, "contextmenu", r.DomEvent.stopPropagation);
            this._tipContainer = r.DomUtil.create("div", n + "-tip-container", u);
            this._tip = r.DomUtil.create("div", n + "-tip", this._tipContainer)
        },
        _updateContent: function() {
            if (this._content) {
                if ("string" == typeof this._content) this._contentNode.innerHTML = this._content;
                else {
                    for (; this._contentNode.hasChildNodes();) this._contentNode.removeChild(this._contentNode.firstChild);
                    this._contentNode.appendChild(this._content)
                }
                this.fire("contentupdate")
            }
        },
        _updateLayout: function() {
            var i = this._contentNode,
                n = i.style,
                t;
            n.width = "";
            n.whiteSpace = "nowrap";
            t = i.offsetWidth;
            t = Math.min(t, this.options.maxWidth);
            t = Math.max(t, this.options.minWidth);
            n.width = t + 1 + "px";
            n.whiteSpace = "";
            n.height = "";
            var e = i.offsetHeight,
                u = this.options.maxHeight,
                f = "leaflet-popup-scrolled";
            u && e > u ? (n.height = u + "px", r.DomUtil.addClass(i, f)) : r.DomUtil.removeClass(i, f);
            this._containerWidth = this._container.offsetWidth
        },
        _updatePosition: function() {
            if (this._map) {
                var n = this._map.latLngToLayerPoint(this._latlng),
                    t = this._animated,
                    i = r.point(this.options.offset);
                t && r.DomUtil.setPosition(this._container, n);
                this._containerBottom = -i.y - (t ? 0 : n.y);
                this._containerLeft = -Math.round(this._containerWidth / 2) + i.x + (t ? 0 : n.x);
                this._container.style.bottom = this._containerBottom + "px";
                this._container.style.left = this._containerLeft + "px"
            }
        },
        _zoomAnimation: function(n) {
            var t = this._map._latLngToNewLayerPoint(this._latlng, n.zoom, n.center);
            r.DomUtil.setPosition(this._container, t)
        },
        _adjustPan: function() {
            if (this.options.autoPan) {
                var o = this._map,
                    s = this._container.offsetHeight,
                    h = this._containerWidth,
                    c = new r.Point(this._containerLeft, -s - this._containerBottom);
                this._animated && c._add(r.DomUtil.getPosition(this._container));
                var n = o.layerPointToContainerPoint(c),
                    l = r.point(this.options.autoPanPadding),
                    u = r.point(this.options.autoPanPaddingTopLeft || l),
                    f = r.point(this.options.autoPanPaddingBottomRight || l),
                    e = o.getSize(),
                    t = 0,
                    i = 0;
                n.x + h + f.x > e.x && (t = n.x + h - e.x + f.x);
                n.x - t - u.x < 0 && (t = n.x - u.x);
                n.y + s + f.y > e.y && (i = n.y + s - e.y + f.y);
                n.y - i - u.y < 0 && (i = n.y - u.y);
                (t || i) && o.fire("autopanstart").panBy([t, i])
            }
        },
        _onCloseButtonClick: function(n) {
            this._close();
            r.DomEvent.stop(n)
        }
    });
    r.popup = function(n, t) {
        return new r.Popup(n, t)
    };
    r.Map.include({
        openPopup: function(n, t, i) {
            if (this.closePopup(), !(n instanceof r.Popup)) {
                var u = n;
                n = new r.Popup(i).setLatLng(t).setContent(u)
            }
            return n._isOpen = !0, this._popup = n, this.addLayer(n)
        },
        closePopup: function(n) {
            return n && n !== this._popup || (n = this._popup, this._popup = null), n && (this.removeLayer(n), n._isOpen = !1), this
        }
    });
    r.Marker.include({
        openPopup: function() {
            return this._popup && this._map && !this._map.hasLayer(this._popup) && (this._popup.setLatLng(this._latlng), this._map.openPopup(this._popup)), this
        },
        closePopup: function() {
            return this._popup && this._popup._close(), this
        },
        togglePopup: function() {
            return this._popup && (this._popup._isOpen ? this.closePopup() : this.openPopup()), this
        },
        bindPopup: function(n, t) {
            var i = r.point(this.options.icon.options.popupAnchor || [0, 0]);
            return i = i.add(r.Popup.prototype.options.offset), t && t.offset && (i = i.add(t.offset)), t = r.extend({
                offset: i
            }, t), this._popupHandlersAdded || (this.on("click", this.togglePopup, this).on("remove", this.closePopup, this).on("move", this._movePopup, this), this._popupHandlersAdded = !0), n instanceof r.Popup ? (r.setOptions(n, t), this._popup = n, n._source = this) : this._popup = new r.Popup(t, this).setContent(n), this
        },
        setPopupContent: function(n) {
            return this._popup && this._popup.setContent(n), this
        },
        unbindPopup: function() {
            return this._popup && (this._popup = null, this.off("click", this.togglePopup, this).off("remove", this.closePopup, this).off("move", this._movePopup, this), this._popupHandlersAdded = !1), this
        },
        getPopup: function() {
            return this._popup
        },
        _movePopup: function(n) {
            this._popup.setLatLng(n.latlng)
        }
    });
    r.LayerGroup = r.Class.extend({
        initialize: function(n) {
            this._layers = {};
            var t, i;
            if (n) for (t = 0, i = n.length; i > t; t++) this.addLayer(n[t])
        },
        addLayer: function(n) {
            var t = this.getLayerId(n);
            return this._layers[t] = n, this._map && this._map.addLayer(n), this
        },
        removeLayer: function(n) {
            var t = n in this._layers ? n : this.getLayerId(n);
            return this._map && this._layers[t] && this._map.removeLayer(this._layers[t]), delete this._layers[t], this
        },
        hasLayer: function(n) {
            return n ? n in this._layers || this.getLayerId(n) in this._layers : !1
        },
        clearLayers: function() {
            return this.eachLayer(this.removeLayer, this), this
        },
        invoke: function(n) {
            var i, t, r = Array.prototype.slice.call(arguments, 1);
            for (i in this._layers) t = this._layers[i], t[n] && t[n].apply(t, r);
            return this
        },
        onAdd: function(n) {
            this._map = n;
            this.eachLayer(n.addLayer, n)
        },
        onRemove: function(n) {
            this.eachLayer(n.removeLayer, n);
            this._map = null
        },
        addTo: function(n) {
            return n.addLayer(this), this
        },
        eachLayer: function(n, t) {
            for (var i in this._layers) n.call(t, this._layers[i]);
            return this
        },
        getLayer: function(n) {
            return this._layers[n]
        },
        getLayers: function() {
            var n = [];
            for (var t in this._layers) n.push(this._layers[t]);
            return n
        },
        setZIndex: function(n) {
            return this.invoke("setZIndex", n)
        },
        getLayerId: function(n) {
            return r.stamp(n)
        }
    });
    r.layerGroup = function(n) {
        return new r.LayerGroup(n)
    };
    r.FeatureGroup = r.LayerGroup.extend({
        includes: r.Mixin.Events,
        statics: {
            EVENTS: "click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose"
        },
        addLayer: function(n) {
            return this.hasLayer(n) ? this : ("on" in n && n.on(r.FeatureGroup.EVENTS, this._propagateEvent, this), r.LayerGroup.prototype.addLayer.call(this, n), this._popupContent && n.bindPopup && n.bindPopup(this._popupContent, this._popupOptions), this.fire("layeradd", {
                layer: n
            }))
        },
        removeLayer: function(n) {
            return this.hasLayer(n) ? (n in this._layers && (n = this._layers[n]), "off" in n && n.off(r.FeatureGroup.EVENTS, this._propagateEvent, this), r.LayerGroup.prototype.removeLayer.call(this, n), this._popupContent && this.invoke("unbindPopup"), this.fire("layerremove", {
                layer: n
            })) : this
        },
        bindPopup: function(n, t) {
            return this._popupContent = n, this._popupOptions = t, this.invoke("bindPopup", n, t)
        },
        openPopup: function(n) {
            for (var t in this._layers) {
                this._layers[t].openPopup(n);
                break
            }
            return this
        },
        setStyle: function(n) {
            return this.invoke("setStyle", n)
        },
        bringToFront: function() {
            return this.invoke("bringToFront")
        },
        bringToBack: function() {
            return this.invoke("bringToBack")
        },
        getBounds: function() {
            var n = new r.LatLngBounds;
            return this.eachLayer(function(t) {
                n.extend(t instanceof r.Marker ? t.getLatLng() : t.getBounds())
            }), n
        },
        _propagateEvent: function(n) {
            n = r.extend({
                layer: n.target,
                target: this
            }, n);
            this.fire(n.type, n)
        }
    });
    r.featureGroup = function(n) {
        return new r.FeatureGroup(n)
    };
    r.Path = r.Class.extend({
        includes: [r.Mixin.Events],
        statics: {
            CLIP_PADDING: function() {
                var t = r.Browser.mobile ? 1280 : 2e3,
                    i = (t / Math.max(n.outerWidth, n.outerHeight) - 1) / 2;
                return Math.max(0, Math.min(.5, i))
            }()
        },
        options: {
            stroke: !0,
            color: "#0033ff",
            dashArray: null,
            lineCap: null,
            lineJoin: null,
            weight: 5,
            opacity: .5,
            fill: !1,
            fillColor: null,
            fillOpacity: .2,
            clickable: !0
        },
        initialize: function(n) {
            r.setOptions(this, n)
        },
        onAdd: function(n) {
            this._map = n;
            this._container || (this._initElements(), this._initEvents());
            this.projectLatlngs();
            this._updatePath();
            this._container && this._map._pathRoot.appendChild(this._container);
            this.fire("add");
            n.on({
                viewreset: this.projectLatlngs,
                moveend: this._updatePath
            }, this)
        },
        addTo: function(n) {
            return n.addLayer(this), this
        },
        onRemove: function(n) {
            n._pathRoot.removeChild(this._container);
            this.fire("remove");
            this._map = null;
            r.Browser.vml && (this._container = null, this._stroke = null, this._fill = null);
            n.off({
                viewreset: this.projectLatlngs,
                moveend: this._updatePath
            }, this)
        },
        projectLatlngs: function() {},
        setStyle: function(n) {
            return r.setOptions(this, n), this._container && this._updateStyle(), this
        },
        redraw: function() {
            return this._map && (this.projectLatlngs(), this._updatePath()), this
        }
    });
    r.Map.include({
        _updatePathViewport: function() {
            var n = r.Path.CLIP_PADDING,
                t = this.getSize(),
                u = r.DomUtil.getPosition(this._mapPane),
                i = u.multiplyBy(-1)._subtract(t.multiplyBy(n)._round()),
                f = i.add(t.multiplyBy(1 + 2 * n)._round());
            this._pathViewport = new r.Bounds(i, f)
        }
    });
    r.Path.SVG_NS = "http://www.w3.org/2000/svg";
    r.Browser.svg = !(!t.createElementNS || !t.createElementNS(r.Path.SVG_NS, "svg").createSVGRect);
    r.Path = r.Path.extend({
        statics: {
            SVG: r.Browser.svg
        },
        bringToFront: function() {
            var t = this._map._pathRoot,
                n = this._container;
            return n && t.lastChild !== n && t.appendChild(n), this
        },
        bringToBack: function() {
            var t = this._map._pathRoot,
                n = this._container,
                i = t.firstChild;
            return n && i !== n && t.insertBefore(n, i), this
        },
        getPathString: function() {},
        _createElement: function(n) {
            return t.createElementNS(r.Path.SVG_NS, n)
        },
        _initElements: function() {
            this._map._initPathRoot();
            this._initPath();
            this._initStyle()
        },
        _initPath: function() {
            this._container = this._createElement("g");
            this._path = this._createElement("path");
            this.options.className && r.DomUtil.addClass(this._path, this.options.className);
            this._container.appendChild(this._path)
        },
        _initStyle: function() {
            this.options.stroke && (this._path.setAttribute("stroke-linejoin", "round"), this._path.setAttribute("stroke-linecap", "round"));
            this.options.fill && this._path.setAttribute("fill-rule", "evenodd");
            this.options.pointerEvents && this._path.setAttribute("pointer-events", this.options.pointerEvents);
            this.options.clickable || this.options.pointerEvents || this._path.setAttribute("pointer-events", "none");
            this._updateStyle()
        },
        _updateStyle: function() {
            this.options.stroke ? (this._path.setAttribute("stroke", this.options.color), this._path.setAttribute("stroke-opacity", this.options.opacity), this._path.setAttribute("stroke-width", this.options.weight), this.options.dashArray ? this._path.setAttribute("stroke-dasharray", this.options.dashArray) : this._path.removeAttribute("stroke-dasharray"), this.options.lineCap && this._path.setAttribute("stroke-linecap", this.options.lineCap), this.options.lineJoin && this._path.setAttribute("stroke-linejoin", this.options.lineJoin)) : this._path.setAttribute("stroke", "none");
            this.options.fill ? (this._path.setAttribute("fill", this.options.fillColor || this.options.color), this._path.setAttribute("fill-opacity", this.options.fillOpacity)) : this._path.setAttribute("fill", "none")
        },
        _updatePath: function() {
            var n = this.getPathString();
            n || (n = "M0 0");
            this._path.setAttribute("d", n)
        },
        _initEvents: function() {
            if (this.options.clickable) {
                (r.Browser.svg || !r.Browser.vml) && r.DomUtil.addClass(this._path, "leaflet-clickable");
                r.DomEvent.on(this._container, "click", this._onMouseClick, this);
                for (var t = ["dblclick", "mousedown", "mouseover", "mouseout", "mousemove", "contextmenu"], n = 0; n < t.length; n++) r.DomEvent.on(this._container, t[n], this._fireMouseEvent, this)
            }
        },
        _onMouseClick: function(n) {
            this._map.dragging && this._map.dragging.moved() || this._fireMouseEvent(n)
        },
        _fireMouseEvent: function(n) {
            if (this._map && this.hasEventListeners(n.type)) {
                var t = this._map,
                    i = t.mouseEventToContainerPoint(n),
                    u = t.containerPointToLayerPoint(i),
                    f = t.layerPointToLatLng(u);
                this.fire(n.type, {
                    latlng: f,
                    layerPoint: u,
                    containerPoint: i,
                    originalEvent: n
                });
                "contextmenu" === n.type && r.DomEvent.preventDefault(n);
                "mousemove" !== n.type && r.DomEvent.stopPropagation(n)
            }
        }
    });
    r.Map.include({
        _initPathRoot: function() {
            this._pathRoot || (this._pathRoot = r.Path.prototype._createElement("svg"), this._panes.overlayPane.appendChild(this._pathRoot), this.options.zoomAnimation && r.Browser.any3d ? (r.DomUtil.addClass(this._pathRoot, "leaflet-zoom-animated"), this.on({
                zoomanim: this._animatePathZoom,
                zoomend: this._endPathZoom
            })) : r.DomUtil.addClass(this._pathRoot, "leaflet-zoom-hide"), this.on("moveend", this._updateSvgViewport), this._updateSvgViewport())
        },
        _animatePathZoom: function(n) {
            var t = this.getZoomScale(n.zoom),
                i = this._getCenterOffset(n.center)._multiplyBy(-t)._add(this._pathViewport.min);
            this._pathRoot.style[r.DomUtil.TRANSFORM] = r.DomUtil.getTranslateString(i) + " scale(" + t + ") ";
            this._pathZooming = !0
        },
        _endPathZoom: function() {
            this._pathZooming = !1
        },
        _updateSvgViewport: function() {
            if (!this._pathZooming) {
                this._updatePathViewport();
                var i = this._pathViewport,
                    t = i.min,
                    u = i.max,
                    f = u.x - t.x,
                    e = u.y - t.y,
                    n = this._pathRoot,
                    o = this._panes.overlayPane;
                r.Browser.mobileWebkit && o.removeChild(n);
                r.DomUtil.setPosition(n, t);
                n.setAttribute("width", f);
                n.setAttribute("height", e);
                n.setAttribute("viewBox", [t.x, t.y, f, e].join(" "));
                r.Browser.mobileWebkit && o.appendChild(n)
            }
        }
    });
    r.Path.include({
        bindPopup: function(n, t) {
            return n instanceof r.Popup ? this._popup = n : ((!this._popup || t) && (this._popup = new r.Popup(t, this)), this._popup.setContent(n)), this._popupHandlersAdded || (this.on("click", this._openPopup, this).on("remove", this.closePopup, this), this._popupHandlersAdded = !0), this
        },
        unbindPopup: function() {
            return this._popup && (this._popup = null, this.off("click", this._openPopup).off("remove", this.closePopup), this._popupHandlersAdded = !1), this
        },
        openPopup: function(n) {
            return this._popup && (n = n || this._latlng || this._latlngs[Math.floor(this._latlngs.length / 2)], this._openPopup({
                latlng: n
            })), this
        },
        closePopup: function() {
            return this._popup && this._popup._close(), this
        },
        _openPopup: function(n) {
            this._popup.setLatLng(n.latlng);
            this._map.openPopup(this._popup)
        }
    });
    r.Browser.vml = !r.Browser.svg && function() {
        var i, n;
        try {
            return i = t.createElement("div"), i.innerHTML = '<v:shape adj="1"/>', n = i.firstChild, n.style.behavior = "url(#default#VML)", n && "object" == typeof n.adj
        } catch (r) {
            return !1
        }
    }();
    r.Path = r.Browser.svg || !r.Browser.vml ? r.Path : r.Path.extend({
        statics: {
            VML: !0,
            CLIP_PADDING: .02
        },
        _createElement: function() {
            try {
                return t.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"),
                function(n) {
                    return t.createElement("<lvml:" + n + ' class="lvml">')
                }
            } catch (n) {
                return function(n) {
                    return t.createElement("<" + n + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
                }
            }
        }(),
        _initPath: function() {
            var n = this._container = this._createElement("shape");
            r.DomUtil.addClass(n, "leaflet-vml-shape" + (this.options.className ? " " + this.options.className : ""));
            this.options.clickable && r.DomUtil.addClass(n, "leaflet-clickable");
            n.coordsize = "1 1";
            this._path = this._createElement("path");
            n.appendChild(this._path);
            this._map._pathRoot.appendChild(n)
        },
        _initStyle: function() {
            this._updateStyle()
        },
        _updateStyle: function() {
            var t = this._stroke,
                i = this._fill,
                n = this.options,
                u = this._container;
            u.stroked = n.stroke;
            u.filled = n.fill;
            n.stroke ? (t || (t = this._stroke = this._createElement("stroke"), t.endcap = "round", u.appendChild(t)), t.weight = n.weight + "px", t.color = n.color, t.opacity = n.opacity, t.dashStyle = n.dashArray ? r.Util.isArray(n.dashArray) ? n.dashArray.join(" ") : n.dashArray.replace(/( *, *)/g, " ") : "", n.lineCap && (t.endcap = n.lineCap.replace("butt", "flat")), n.lineJoin && (t.joinstyle = n.lineJoin)) : t && (u.removeChild(t), this._stroke = null);
            n.fill ? (i || (i = this._fill = this._createElement("fill"), u.appendChild(i)), i.color = n.fillColor || n.color, i.opacity = n.fillOpacity) : i && (u.removeChild(i), this._fill = null)
        },
        _updatePath: function() {
            var n = this._container.style;
            n.display = "none";
            this._path.v = this.getPathString() + " ";
            n.display = ""
        }
    });
    r.Map.include(r.Browser.svg || !r.Browser.vml ? {} : {
        _initPathRoot: function() {
            if (!this._pathRoot) {
                var n = this._pathRoot = t.createElement("div");
                n.className = "leaflet-vml-container";
                this._panes.overlayPane.appendChild(n);
                this.on("moveend", this._updatePathViewport);
                this._updatePathViewport()
            }
        }
    });
    r.Browser.canvas = function() {
        return !!t.createElement("canvas").getContext
    }();
    r.Path = r.Path.SVG && !n.L_PREFER_CANVAS || !r.Browser.canvas ? r.Path : r.Path.extend({
        statics: {
            CANVAS: !0,
            SVG: !1
        },
        redraw: function() {
            return this._map && (this.projectLatlngs(), this._requestUpdate()), this
        },
        setStyle: function(n) {
            return r.setOptions(this, n), this._map && (this._updateStyle(), this._requestUpdate()), this
        },
        onRemove: function(n) {
            n.off("viewreset", this.projectLatlngs, this).off("moveend", this._updatePath, this);
            this.options.clickable && (this._map.off("click", this._onClick, this), this._map.off("mousemove", this._onMouseMove, this));
            this._requestUpdate();
            this.fire("remove");
            this._map = null
        },
        _requestUpdate: function() {
            this._map && !r.Path._updateRequest && (r.Path._updateRequest = r.Util.requestAnimFrame(this._fireMapMoveEnd, this._map))
        },
        _fireMapMoveEnd: function() {
            r.Path._updateRequest = null;
            this.fire("moveend")
        },
        _initElements: function() {
            this._map._initPathRoot();
            this._ctx = this._map._canvasCtx
        },
        _updateStyle: function() {
            var n = this.options;
            n.stroke && (this._ctx.lineWidth = n.weight, this._ctx.strokeStyle = n.color);
            n.fill && (this._ctx.fillStyle = n.fillColor || n.color);
            n.lineCap && (this._ctx.lineCap = n.lineCap);
            n.lineJoin && (this._ctx.lineJoin = n.lineJoin)
        },
        _drawPath: function() {
            var n, t, u, f, i, e;
            for (this._ctx.beginPath(), n = 0, u = this._parts.length; u > n; n++) {
                for (t = 0, f = this._parts[n].length; f > t; t++) i = this._parts[n][t], e = (0 === t ? "move" : "line") + "To", this._ctx[e](i.x, i.y);
                this instanceof r.Polygon && this._ctx.closePath()
            }
        },
        _checkIfEmpty: function() {
            return !this._parts.length
        },
        _updatePath: function() {
            if (!this._checkIfEmpty()) {
                var n = this._ctx,
                    t = this.options;
                this._drawPath();
                n.save();
                this._updateStyle();
                t.fill && (n.globalAlpha = t.fillOpacity, n.fill(t.fillRule || "evenodd"));
                t.stroke && (n.globalAlpha = t.opacity, n.stroke());
                n.restore()
            }
        },
        _initEvents: function() {
            this.options.clickable && (this._map.on("mousemove", this._onMouseMove, this), this._map.on("click dblclick contextmenu", this._fireMouseEvent, this))
        },
        _fireMouseEvent: function(n) {
            this._containsPoint(n.layerPoint) && this.fire(n.type, n)
        },
        _onMouseMove: function(n) {
            this._map && !this._map._animatingZoom && (this._containsPoint(n.layerPoint) ? (this._ctx.canvas.style.cursor = "pointer", this._mouseInside = !0, this.fire("mouseover", n)) : this._mouseInside && (this._ctx.canvas.style.cursor = "", this._mouseInside = !1, this.fire("mouseout", n)))
        }
    });
    r.Map.include(r.Path.SVG && !n.L_PREFER_CANVAS || !r.Browser.canvas ? {} : {
        _initPathRoot: function() {
            var i, n = this._pathRoot;
            n || (n = this._pathRoot = t.createElement("canvas"), n.style.position = "absolute", i = this._canvasCtx = n.getContext("2d"), i.lineCap = "round", i.lineJoin = "round", this._panes.overlayPane.appendChild(n), this.options.zoomAnimation && (this._pathRoot.className = "leaflet-zoom-animated", this.on("zoomanim", this._animatePathZoom), this.on("zoomend", this._endPathZoom)), this.on("moveend", this._updateCanvasViewport), this._updateCanvasViewport())
        },
        _updateCanvasViewport: function() {
            if (!this._pathZooming) {
                this._updatePathViewport();
                var i = this._pathViewport,
                    n = i.min,
                    u = i.max.subtract(n),
                    t = this._pathRoot;
                r.DomUtil.setPosition(t, n);
                t.width = u.x;
                t.height = u.y;
                t.getContext("2d").translate(-n.x, -n.y)
            }
        }
    });
    r.LineUtil = {
        simplify: function(n, t) {
            if (!t || !n.length) return n.slice();
            var i = t * t;
            return n = this._reducePoints(n, i), n = this._simplifyDP(n, i)
        },
        pointToSegmentDistance: function(n, t, i) {
            return Math.sqrt(this._sqClosestPointOnSegment(n, t, i, !0))
        },
        closestPointOnSegment: function(n, t, i) {
            return this._sqClosestPointOnSegment(n, t, i)
        },
        _simplifyDP: function(n, t) {
            var u = n.length,
                o = typeof Uint8Array != i + "" ? Uint8Array : Array,
                f = new o(u),
                r, e;
            for (f[0] = f[u - 1] = 1, this._simplifyDPStep(n, f, t, 0, u - 1), e = [], r = 0; u > r; r++) f[r] && e.push(n[r]);
            return e
        },
        _simplifyDPStep: function(n, t, i, r, u) {
            for (var e, o, s = 0, f = r + 1; u - 1 >= f; f++) o = this._sqClosestPointOnSegment(n[f], n[r], n[u], !0), o > s && (e = f, s = o);
            s > i && (t[e] = 1, this._simplifyDPStep(n, t, i, r, e), this._simplifyDPStep(n, t, i, e, u))
        },
        _reducePoints: function(n, t) {
            for (var r = [n[0]], i = 1, u = 0, f = n.length; f > i; i++) this._sqDist(n[i], n[u]) > t && (r.push(n[i]), u = i);
            return f - 1 > u && r.push(n[f - 1]), r
        },
        clipSegment: function(n, t, i, r) {
            var o, e, s, u = r ? this._lastCode : this._getBitCode(n, i),
                f = this._getBitCode(t, i);
            for (this._lastCode = f;;) {
                if (!(u | f)) return [n, t];
                if (u & f) return !1;
                o = u || f;
                e = this._getEdgeIntersection(n, t, o, i);
                s = this._getBitCode(e, i);
                o === u ? (n = e, u = s) : (t = e, f = s)
            }
        },
        _getEdgeIntersection: function(n, t, i, u) {
            var f = t.x - n.x,
                e = t.y - n.y,
                o = u.min,
                s = u.max;
            return 8 & i ? new r.Point(n.x + f * (s.y - n.y) / e, s.y) : 4 & i ? new r.Point(n.x + f * (o.y - n.y) / e, o.y) : 2 & i ? new r.Point(s.x, n.y + e * (s.x - n.x) / f) : 1 & i ? new r.Point(o.x, n.y + e * (o.x - n.x) / f) : void 0
        },
        _getBitCode: function(n, t) {
            var i = 0;
            return n.x < t.min.x ? i |= 1 : n.x > t.max.x && (i |= 2), n.y < t.min.y ? i |= 4 : n.y > t.max.y && (i |= 8), i
        },
        _sqDist: function(n, t) {
            var i = t.x - n.x,
                r = t.y - n.y;
            return i * i + r * r
        },
        _sqClosestPointOnSegment: function(n, t, i, u) {
            var h, o = t.x,
                s = t.y,
                f = i.x - o,
                e = i.y - s,
                c = f * f + e * e;
            return c > 0 && (h = ((n.x - o) * f + (n.y - s) * e) / c, h > 1 ? (o = i.x, s = i.y) : h > 0 && (o += f * h, s += e * h)), f = n.x - o, e = n.y - s, u ? f * f + e * e : new r.Point(o, s)
        }
    };
    r.Polyline = r.Path.extend({
        initialize: function(n, t) {
            r.Path.prototype.initialize.call(this, t);
            this._latlngs = this._convertLatLngs(n)
        },
        options: {
            smoothFactor: 1,
            noClip: !1
        },
        projectLatlngs: function() {
            this._originalPoints = [];
            for (var n = 0, t = this._latlngs.length; t > n; n++) this._originalPoints[n] = this._map.latLngToLayerPoint(this._latlngs[n])
        },
        getPathString: function() {
            for (var n = 0, i = this._parts.length, t = ""; i > n; n++) t += this._getPathPartStr(this._parts[n]);
            return t
        },
        getLatLngs: function() {
            return this._latlngs
        },
        setLatLngs: function(n) {
            return this._latlngs = this._convertLatLngs(n), this.redraw()
        },
        addLatLng: function(n) {
            return this._latlngs.push(r.latLng(n)), this.redraw()
        },
        spliceLatLngs: function() {
            var n = [].splice.apply(this._latlngs, arguments);
            return this._convertLatLngs(this._latlngs, !0), this.redraw(), n
        },
        closestLayerPoint: function(n) {
            for (var h, u, f, e = 1 / 0, c = this._parts, t = null, o = 0, l = c.length; l > o; o++) for (var s = c[o], i = 1, a = s.length; a > i; i++) u = s[i - 1], f = s[i], h = r.LineUtil._sqClosestPointOnSegment(n, u, f, !0), e > h && (e = h, t = r.LineUtil._sqClosestPointOnSegment(n, u, f));
            return t && (t.distance = Math.sqrt(e)), t
        },
        getBounds: function() {
            return new r.LatLngBounds(this.getLatLngs())
        },
        _convertLatLngs: function(n, t) {
            for (var f = t ? n : [], i = 0, u = n.length; u > i; i++) {
                if (r.Util.isArray(n[i]) && "number" != typeof n[i][0]) return;
                f[i] = r.latLng(n[i])
            }
            return f
        },
        _initEvents: function() {
            r.Path.prototype._initEvents.call(this)
        },
        _getPathPartStr: function(n) {
            for (var t, f = r.Path.VML, i = 0, e = n.length, u = ""; e > i; i++) t = n[i], f && t._round(), u += (i ? "L" : "M") + t.x + " " + t.y;
            return u
        },
        _clipPoints: function() {
            var n, t, i, u = this._originalPoints,
                e = u.length;
            if (this.options.noClip) return void(this._parts = [u]);
            this._parts = [];
            var f = this._parts,
                o = this._map._pathViewport,
                s = r.LineUtil;
            for (n = 0, t = 0; e - 1 > n; n++) i = s.clipSegment(u[n], u[n + 1], o, n), i && (f[t] = f[t] || [], f[t].push(i[0]), (i[1] !== u[n + 1] || n === e - 2) && (f[t].push(i[1]), t++))
        },
        _simplifyPoints: function() {
            for (var t = this._parts, i = r.LineUtil, n = 0, u = t.length; u > n; n++) t[n] = i.simplify(t[n], this.options.smoothFactor)
        },
        _updatePath: function() {
            this._map && (this._clipPoints(), this._simplifyPoints(), r.Path.prototype._updatePath.call(this))
        }
    });
    r.polyline = function(n, t) {
        return new r.Polyline(n, t)
    };
    r.PolyUtil = {};
    r.PolyUtil.clipPolygon = function(n, t) {
        for (var e, a, l, o, s, f, u, v = [1, 4, 2, 8], c = r.LineUtil, i = 0, h = n.length; h > i; i++) n[i]._code = c._getBitCode(n[i], t);
        for (l = 0; 4 > l; l++) {
            for (f = v[l], e = [], i = 0, h = n.length, a = h - 1; h > i; a = i++) o = n[i], s = n[a], o._code & f ? s._code & f || (u = c._getEdgeIntersection(s, o, f, t), u._code = c._getBitCode(u, t), e.push(u)) : (s._code & f && (u = c._getEdgeIntersection(s, o, f, t), u._code = c._getBitCode(u, t), e.push(u)), e.push(o));
            n = e
        }
        return n
    };
    r.Polygon = r.Polyline.extend({
        options: {
            fill: !0
        },
        initialize: function(n, t) {
            r.Polyline.prototype.initialize.call(this, n, t);
            this._initWithHoles(n)
        },
        _initWithHoles: function(n) {
            var t, u, i;
            if (n && r.Util.isArray(n[0]) && "number" != typeof n[0][0]) for (this._latlngs = this._convertLatLngs(n[0]), this._holes = n.slice(1), t = 0, u = this._holes.length; u > t; t++) i = this._holes[t] = this._convertLatLngs(this._holes[t]), i[0].equals(i[i.length - 1]) && i.pop();
            n = this._latlngs;
            n.length >= 2 && n[0].equals(n[n.length - 1]) && n.pop()
        },
        projectLatlngs: function() {
            if (r.Polyline.prototype.projectLatlngs.call(this), this._holePoints = [], this._holes) for (var t, u, n = 0, i = this._holes.length; i > n; n++) for (this._holePoints[n] = [], t = 0, u = this._holes[n].length; u > t; t++) this._holePoints[n][t] = this._map.latLngToLayerPoint(this._holes[n][t])
        },
        setLatLngs: function(n) {
            return n && r.Util.isArray(n[0]) && "number" != typeof n[0][0] ? (this._initWithHoles(n), this.redraw()) : r.Polyline.prototype.setLatLngs.call(this, n)
        },
        _clipPoints: function() {
            var f = this._originalPoints,
                i = [],
                n, u, t;
            if (this._parts = [f].concat(this._holePoints), !this.options.noClip) {
                for (n = 0, u = this._parts.length; u > n; n++) t = r.PolyUtil.clipPolygon(this._parts[n], this._map._pathViewport), t.length && i.push(t);
                this._parts = i
            }
        },
        _getPathPartStr: function(n) {
            var t = r.Polyline.prototype._getPathPartStr.call(this, n);
            return t + (r.Browser.svg ? "z" : "x")
        }
    });
    r.polygon = function(n, t) {
        return new r.Polygon(n, t)
    },
    function() {
        function n(n) {
            return r.FeatureGroup.extend({
                initialize: function(n, t) {
                    this._layers = {};
                    this._options = t;
                    this.setLatLngs(n)
                },
                setLatLngs: function(t) {
                    var i = 0,
                        r = t.length;
                    for (this.eachLayer(function(n) {
                        r > i ? n.setLatLngs(t[i++]) : this.removeLayer(n)
                    }, this); r > i;) this.addLayer(new n(t[i++], this._options));
                    return this
                },
                getLatLngs: function() {
                    var n = [];
                    return this.eachLayer(function(t) {
                        n.push(t.getLatLngs())
                    }), n
                }
            })
        }
        r.MultiPolyline = n(r.Polyline);
        r.MultiPolygon = n(r.Polygon);
        r.multiPolyline = function(n, t) {
            return new r.MultiPolyline(n, t)
        };
        r.multiPolygon = function(n, t) {
            return new r.MultiPolygon(n, t)
        }
    }();
    r.Rectangle = r.Polygon.extend({
        initialize: function(n, t) {
            r.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(n), t)
        },
        setBounds: function(n) {
            this.setLatLngs(this._boundsToLatLngs(n))
        },
        _boundsToLatLngs: function(n) {
            return n = r.latLngBounds(n), [n.getSouthWest(), n.getNorthWest(), n.getNorthEast(), n.getSouthEast()]
        }
    });
    r.rectangle = function(n, t) {
        return new r.Rectangle(n, t)
    };
    r.Circle = r.Path.extend({
        initialize: function(n, t, i) {
            r.Path.prototype.initialize.call(this, i);
            this._latlng = r.latLng(n);
            this._mRadius = t
        },
        options: {
            fill: !0
        },
        setLatLng: function(n) {
            return this._latlng = r.latLng(n), this.redraw()
        },
        setRadius: function(n) {
            return this._mRadius = n, this.redraw()
        },
        projectLatlngs: function() {
            var t = this._getLngRadius(),
                n = this._latlng,
                i = this._map.latLngToLayerPoint([n.lat, n.lng - t]);
            this._point = this._map.latLngToLayerPoint(n);
            this._radius = Math.max(this._point.x - i.x, 1)
        },
        getBounds: function() {
            var t = this._getLngRadius(),
                i = this._mRadius / 40075017 * 360,
                n = this._latlng;
            return new r.LatLngBounds([n.lat - i, n.lng - t], [n.lat + i, n.lng + t])
        },
        getLatLng: function() {
            return this._latlng
        },
        getPathString: function() {
            var t = this._point,
                n = this._radius;
            return this._checkIfEmpty() ? "" : r.Browser.svg ? "M" + t.x + "," + (t.y - n) + "A" + n + "," + n + ",0,1,1," + (t.x - .1) + "," + (t.y - n) + " z" : (t._round(), n = Math.round(n), "AL " + t.x + "," + t.y + " " + n + "," + n + " 0,23592600")
        },
        getRadius: function() {
            return this._mRadius
        },
        _getLatRadius: function() {
            return this._mRadius / 40075017 * 360
        },
        _getLngRadius: function() {
            return this._getLatRadius() / Math.cos(r.LatLng.DEG_TO_RAD * this._latlng.lat)
        },
        _checkIfEmpty: function() {
            if (!this._map) return !1;
            var n = this._map._pathViewport,
                t = this._radius,
                i = this._point;
            return i.x - t > n.max.x || i.y - t > n.max.y || i.x + t < n.min.x || i.y + t < n.min.y
        }
    });
    r.circle = function(n, t, i) {
        return new r.Circle(n, t, i)
    };
    r.CircleMarker = r.Circle.extend({
        options: {
            radius: 10,
            weight: 2
        },
        initialize: function(n, t) {
            r.Circle.prototype.initialize.call(this, n, null, t);
            this._radius = this.options.radius
        },
        projectLatlngs: function() {
            this._point = this._map.latLngToLayerPoint(this._latlng)
        },
        _updateStyle: function() {
            r.Circle.prototype._updateStyle.call(this);
            this.setRadius(this.options.radius)
        },
        setLatLng: function(n) {
            return r.Circle.prototype.setLatLng.call(this, n), this._popup && this._popup._isOpen && this._popup.setLatLng(n), this
        },
        setRadius: function(n) {
            return this.options.radius = this._radius = n, this.redraw()
        },
        getRadius: function() {
            return this._radius
        }
    });
    r.circleMarker = function(n, t) {
        return new r.CircleMarker(n, t)
    };
    r.Polyline.include(r.Path.CANVAS ? {
        _containsPoint: function(n, t) {
            var u, i, e, s, o, h, f, c = this.options.weight / 2;
            for (r.Browser.touch && (c += 10), u = 0, s = this._parts.length; s > u; u++) for (f = this._parts[u], i = 0, o = f.length, e = o - 1; o > i; e = i++) if ((t || 0 !== i) && (h = r.LineUtil.pointToSegmentDistance(n, f[e], f[i]), c >= h)) return !0;
            return !1
        }
    } : {});
    r.Polygon.include(r.Path.CANVAS ? {
        _containsPoint: function(n) {
            var i, t, u, f, e, o, c, s, h = !1;
            if (r.Polyline.prototype._containsPoint.call(this, n, !0)) return !0;
            for (f = 0, c = this._parts.length; c > f; f++) for (i = this._parts[f], e = 0, s = i.length, o = s - 1; s > e; o = e++) t = i[e], u = i[o], t.y > n.y != u.y > n.y && n.x < (u.x - t.x) * (n.y - t.y) / (u.y - t.y) + t.x && (h = !h);
            return h
        }
    } : {});
    r.Circle.include(r.Path.CANVAS ? {
        _drawPath: function() {
            var n = this._point;
            this._ctx.beginPath();
            this._ctx.arc(n.x, n.y, this._radius, 0, 2 * Math.PI, !1)
        },
        _containsPoint: function(n) {
            var t = this._point,
                i = this.options.stroke ? this.options.weight / 2 : 0;
            return n.distanceTo(t) <= this._radius + i
        }
    } : {});
    r.CircleMarker.include(r.Path.CANVAS ? {
        _updateStyle: function() {
            r.Path.prototype._updateStyle.call(this)
        }
    } : {});
    r.GeoJSON = r.FeatureGroup.extend({
        initialize: function(n, t) {
            r.setOptions(this, t);
            this._layers = {};
            n && this.addData(n)
        },
        addData: function(n) {
            var u, o, f, e = r.Util.isArray(n) ? n : n.features,
                t, i;
            if (e) {
                for (u = 0, o = e.length; o > u; u++) f = e[u], (f.geometries || f.geometry || f.features || f.coordinates) && this.addData(e[u]);
                return this
            }
            return t = this.options, !t.filter || t.filter(n) ? (i = r.GeoJSON.geometryToLayer(n, t.pointToLayer, t.coordsToLatLng, t), i.feature = r.GeoJSON.asFeature(n), i.defaultOptions = i.options, this.resetStyle(i), t.onEachFeature && t.onEachFeature(n, i), this.addLayer(i)) : void 0
        },
        resetStyle: function(n) {
            var t = this.options.style;
            t && (r.Util.extend(n.options, n.defaultOptions), this._setLayerStyle(n, t))
        },
        setStyle: function(n) {
            this.eachLayer(function(t) {
                this._setLayerStyle(t, n)
            }, this)
        },
        _setLayerStyle: function(n, t) {
            "function" == typeof t && (t = t(n.feature));
            n.setStyle && n.setStyle(t)
        }
    });
    r.extend(r.GeoJSON, {
        geometryToLayer: function(n, t, i, u) {
            var s, e, o, h, c = "Feature" === n.type ? n.geometry : n,
                f = c.coordinates,
                l = [];
            switch (i = i || this.coordsToLatLng, c.type) {
                case "Point":
                    return s = i(f), t ? t(n, s):
                        new r.Marker(s);
                    case "MultiPoint":
                        for (o = 0, h = f.length; h > o; o++) s = i(f[o]), l.push(t ? t(n, s) : new r.Marker(s));
                        return new r.FeatureGroup(l);
                    case "LineString":
                        return e = this.coordsToLatLngs(f, 0, i), new r.Polyline(e, u);
                    case "Polygon":
                        if (2 === f.length && !f[1].length) throw new Error("Invalid GeoJSON object.");
                        return e = this.coordsToLatLngs(f, 1, i), new r.Polygon(e, u);
                    case "MultiLineString":
                        return e = this.coordsToLatLngs(f, 1, i), new r.MultiPolyline(e, u);
                    case "MultiPolygon":
                        return e = this.coordsToLatLngs(f, 2, i), new r.MultiPolygon(e, u);
                    case "GeometryCollection":
                        for (o = 0, h = c.geometries.length; h > o; o++) l.push(this.geometryToLayer({
                            geometry: c.geometries[o],
                            type: "Feature",
                            properties: n.properties
                        }, t, i, u));
                        return new r.FeatureGroup(l);
                    default:
                        throw new Error("Invalid GeoJSON object.");
            }
        },
        coordsToLatLng: function(n) {
            return new r.LatLng(n[1], n[0], n[2])
        },
        coordsToLatLngs: function(n, t, i) {
            for (var u, e = [], r = 0, f = n.length; f > r; r++) u = t ? this.coordsToLatLngs(n[r], t - 1, i) : (i || this.coordsToLatLng)(n[r]), e.push(u);
            return e
        },
        latLngToCoords: function(n) {
            var t = [n.lng, n.lat];
            return n.alt !== i && t.push(n.alt), t
        },
        latLngsToCoords: function(n) {
            for (var i = [], t = 0, u = n.length; u > t; t++) i.push(r.GeoJSON.latLngToCoords(n[t]));
            return i
        },
        getFeature: function(n, t) {
            return n.feature ? r.extend({}, n.feature, {
                geometry: t
            }) : r.GeoJSON.asFeature(t)
        },
        asFeature: function(n) {
            return "Feature" === n.type ? n : {
                type: "Feature",
                properties: {},
                geometry: n
            }
        }
    });
    f = {
        toGeoJSON: function() {
            return r.GeoJSON.getFeature(this, {
                type: "Point",
                coordinates: r.GeoJSON.latLngToCoords(this.getLatLng())
            })
        }
    };
    r.Marker.include(f);
    r.Circle.include(f);
    r.CircleMarker.include(f);
    r.Polyline.include({
        toGeoJSON: function() {
            return r.GeoJSON.getFeature(this, {
                type: "LineString",
                coordinates: r.GeoJSON.latLngsToCoords(this.getLatLngs())
            })
        }
    });
    r.Polygon.include({
        toGeoJSON: function() {
            var n, u, t, i = [r.GeoJSON.latLngsToCoords(this.getLatLngs())];
            if (i[0].push(i[0][0]), this._holes) for (n = 0, u = this._holes.length; u > n; n++) t = r.GeoJSON.latLngsToCoords(this._holes[n]), t.push(t[0]), i.push(t);
            return r.GeoJSON.getFeature(this, {
                type: "Polygon",
                coordinates: i
            })
        }
    }),
    function() {
        function n(n) {
            return function() {
                var t = [];
                return this.eachLayer(function(n) {
                    t.push(n.toGeoJSON().geometry.coordinates)
                }), r.GeoJSON.getFeature(this, {
                    type: n,
                    coordinates: t
                })
            }
        }
        r.MultiPolyline.include({
            toGeoJSON: n("MultiLineString")
        });
        r.MultiPolygon.include({
            toGeoJSON: n("MultiPolygon")
        });
        r.LayerGroup.include({
            toGeoJSON: function() {
                var i, t = this.feature && this.feature.geometry,
                    u = [],
                    f;
                return t && "MultiPoint" === t.type ? n("MultiPoint").call(this) : (f = t && "GeometryCollection" === t.type, this.eachLayer(function(n) {
                    n.toGeoJSON && (i = n.toGeoJSON(), u.push(f ? i.geometry : r.GeoJSON.asFeature(i)))
                }), f ? r.GeoJSON.getFeature(this, {
                    geometries: u,
                    type: "GeometryCollection"
                }) : {
                    type: "FeatureCollection",
                    features: u
                })
            }
        })
    }();
    r.geoJson = function(n, t) {
        return new r.GeoJSON(n, t)
    };
    r.DomEvent = {
        addListener: function(n, t, i, u) {
            var f, e, s, o = r.stamp(i),
                h = "_leaflet_" + t + o;
            return n[h] ? this : (f = function(t) {
                return i.call(u || n, t || r.DomEvent._getEvent())
            }, r.Browser.pointer && 0 === t.indexOf("touch") ? this.addPointerListener(n, t, f, o) : (r.Browser.touch && "dblclick" === t && this.addDoubleTapListener && this.addDoubleTapListener(n, f, o), "addEventListener" in n ? "mousewheel" === t ? (n.addEventListener("DOMMouseScroll", f, !1), n.addEventListener(t, f, !1)) : "mouseenter" === t || "mouseleave" === t ? (e = f, s = "mouseenter" === t ? "mouseover" : "mouseout", f = function(t) {
                if (r.DomEvent._checkMouse(n, t)) return e(t)
            }, n.addEventListener(s, f, !1)) : "click" === t && r.Browser.android ? (e = f, f = function(n) {
                return r.DomEvent._filterClick(n, e)
            }, n.addEventListener(t, f, !1)) : n.addEventListener(t, f, !1) : "attachEvent" in n && n.attachEvent("on" + t, f), n[h] = f, this))
        },
        removeListener: function(n, t, i) {
            var f = r.stamp(i),
                e = "_leaflet_" + t + f,
                u = n[e];
            return u ? (r.Browser.pointer && 0 === t.indexOf("touch") ? this.removePointerListener(n, t, f) : r.Browser.touch && "dblclick" === t && this.removeDoubleTapListener ? this.removeDoubleTapListener(n, f) : "removeEventListener" in n ? "mousewheel" === t ? (n.removeEventListener("DOMMouseScroll", u, !1), n.removeEventListener(t, u, !1)) : "mouseenter" === t || "mouseleave" === t ? n.removeEventListener("mouseenter" === t ? "mouseover" : "mouseout", u, !1) : n.removeEventListener(t, u, !1) : "detachEvent" in n && n.detachEvent("on" + t, u), n[e] = null, this) : this
        },
        stopPropagation: function(n) {
            return n.stopPropagation ? n.stopPropagation() : n.cancelBubble = !0, r.DomEvent._skipped(n), this
        },
        disableScrollPropagation: function(n) {
            var t = r.DomEvent.stopPropagation;
            return r.DomEvent.on(n, "mousewheel", t).on(n, "MozMousePixelScroll", t)
        },
        disableClickPropagation: function(n) {
            for (var i = r.DomEvent.stopPropagation, t = r.Draggable.START.length - 1; t >= 0; t--) r.DomEvent.on(n, r.Draggable.START[t], i);
            return r.DomEvent.on(n, "click", r.DomEvent._fakeStop).on(n, "dblclick", i)
        },
        preventDefault: function(n) {
            return n.preventDefault ? n.preventDefault() : n.returnValue = !1, this
        },
        stop: function(n) {
            return r.DomEvent.preventDefault(n).stopPropagation(n)
        },
        getMousePosition: function(n, t) {
            if (!t) return new r.Point(n.clientX, n.clientY);
            var i = t.getBoundingClientRect();
            return new r.Point(n.clientX - i.left - t.clientLeft, n.clientY - i.top - t.clientTop)
        },
        getWheelDelta: function(n) {
            var t = 0;
            return n.wheelDelta && (t = n.wheelDelta / 120), n.detail && (t = -n.detail / 3), t
        },
        _skipEvents: {},
        _fakeStop: function(n) {
            r.DomEvent._skipEvents[n.type] = !0
        },
        _skipped: function(n) {
            var t = this._skipEvents[n.type];
            return this._skipEvents[n.type] = !1, t
        },
        _checkMouse: function(n, t) {
            var i = t.relatedTarget;
            if (!i) return !0;
            try {
                for (; i && i !== n;) i = i.parentNode
            } catch (r) {
                return !1
            }
            return i !== n
        },
        _getEvent: function() {
            var t = n.event,
                i;
            if (!t) for (i = arguments.callee.caller; i && (t = i.arguments[0], !t || n.Event !== t.constructor);) i = i.caller;
            return t
        },
        _filterClick: function(n, t) {
            var u = n.timeStamp || n.originalEvent.timeStamp,
                i = r.DomEvent._lastClick && u - r.DomEvent._lastClick;
            return i && i > 100 && 500 > i || n.target._simulatedClick && !n._simulated ? void r.DomEvent.stop(n) : (r.DomEvent._lastClick = u, t(n))
        }
    };
    r.DomEvent.on = r.DomEvent.addListener;
    r.DomEvent.off = r.DomEvent.removeListener;
    r.Draggable = r.Class.extend({
        includes: r.Mixin.Events,
        statics: {
            START: r.Browser.touch ? ["touchstart", "mousedown"] : ["mousedown"],
            END: {
                mousedown: "mouseup",
                touchstart: "touchend",
                pointerdown: "touchend",
                MSPointerDown: "touchend"
            },
            MOVE: {
                mousedown: "mousemove",
                touchstart: "touchmove",
                pointerdown: "touchmove",
                MSPointerDown: "touchmove"
            }
        },
        initialize: function(n, t) {
            this._element = n;
            this._dragStartTarget = t || n
        },
        enable: function() {
            if (!this._enabled) {
                for (var n = r.Draggable.START.length - 1; n >= 0; n--) r.DomEvent.on(this._dragStartTarget, r.Draggable.START[n], this._onDown, this);
                this._enabled = !0
            }
        },
        disable: function() {
            if (this._enabled) {
                for (var n = r.Draggable.START.length - 1; n >= 0; n--) r.DomEvent.off(this._dragStartTarget, r.Draggable.START[n], this._onDown, this);
                this._enabled = !1;
                this._moved = !1
            }
        },
        _onDown: function(n) {
            if (this._moved = !1, !n.shiftKey && (1 === n.which || 1 === n.button || n.touches) && (r.DomEvent.stopPropagation(n), !r.Draggable._disabled && (r.DomUtil.disableImageDrag(), r.DomUtil.disableTextSelection(), !this._moving))) {
                var i = n.touches ? n.touches[0] : n;
                this._startPoint = new r.Point(i.clientX, i.clientY);
                this._startPos = this._newPos = r.DomUtil.getPosition(this._element);
                r.DomEvent.on(t, r.Draggable.MOVE[n.type], this._onMove, this).on(t, r.Draggable.END[n.type], this._onUp, this)
            }
        },
        _onMove: function(n) {
            if (n.touches && n.touches.length > 1) return void(this._moved = !0);
            var u = n.touches && 1 === n.touches.length ? n.touches[0] : n,
                f = new r.Point(u.clientX, u.clientY),
                i = f.subtract(this._startPoint);
            (i.x || i.y) && (r.Browser.touch && Math.abs(i.x) + Math.abs(i.y) < 3 || (r.DomEvent.preventDefault(n), this._moved || (this.fire("dragstart"), this._moved = !0, this._startPos = r.DomUtil.getPosition(this._element).subtract(i), r.DomUtil.addClass(t.body, "leaflet-dragging"), this._lastTarget = n.target || n.srcElement, r.DomUtil.addClass(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(i), this._moving = !0, r.Util.cancelAnimFrame(this._animRequest), this._animRequest = r.Util.requestAnimFrame(this._updatePosition, this, !0, this._dragStartTarget)))
        },
        _updatePosition: function() {
            this.fire("predrag");
            r.DomUtil.setPosition(this._element, this._newPos);
            this.fire("drag")
        },
        _onUp: function() {
            r.DomUtil.removeClass(t.body, "leaflet-dragging");
            this._lastTarget && (r.DomUtil.removeClass(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null);
            for (var n in r.Draggable.MOVE) r.DomEvent.off(t, r.Draggable.MOVE[n], this._onMove).off(t, r.Draggable.END[n], this._onUp);
            r.DomUtil.enableImageDrag();
            r.DomUtil.enableTextSelection();
            this._moved && this._moving && (r.Util.cancelAnimFrame(this._animRequest), this.fire("dragend", {
                distance: this._newPos.distanceTo(this._startPos)
            }));
            this._moving = !1
        }
    });
    r.Handler = r.Class.extend({
        initialize: function(n) {
            this._map = n
        },
        enable: function() {
            this._enabled || (this._enabled = !0, this.addHooks())
        },
        disable: function() {
            this._enabled && (this._enabled = !1, this.removeHooks())
        },
        enabled: function() {
            return !!this._enabled
        }
    });
    r.Map.mergeOptions({
        dragging: !0,
        inertia: !r.Browser.android23,
        inertiaDeceleration: 3400,
        inertiaMaxSpeed: 1 / 0,
        inertiaThreshold: r.Browser.touch ? 32 : 18,
        easeLinearity: .25,
        worldCopyJump: !1
    });
    r.Map.Drag = r.Handler.extend({
        addHooks: function() {
            if (!this._draggable) {
                var n = this._map;
                this._draggable = new r.Draggable(n._mapPane, n._container);
                this._draggable.on({
                    dragstart: this._onDragStart,
                    drag: this._onDrag,
                    dragend: this._onDragEnd
                }, this);
                n.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDrag, this), n.on("viewreset", this._onViewReset, this), n.whenReady(this._onViewReset, this))
            }
            this._draggable.enable()
        },
        removeHooks: function() {
            this._draggable.disable()
        },
        moved: function() {
            return this._draggable && this._draggable._moved
        },
        _onDragStart: function() {
            var n = this._map;
            n._panAnim && n._panAnim.stop();
            n.fire("movestart").fire("dragstart");
            n.options.inertia && (this._positions = [], this._times = [])
        },
        _onDrag: function() {
            if (this._map.options.inertia) {
                var n = this._lastTime = +new Date,
                    t = this._lastPos = this._draggable._newPos;
                this._positions.push(t);
                this._times.push(n);
                n - this._times[0] > 200 && (this._positions.shift(), this._times.shift())
            }
            this._map.fire("move").fire("drag")
        },
        _onViewReset: function() {
            var n = this._map.getSize()._divideBy(2),
                t = this._map.latLngToLayerPoint([0, 0]);
            this._initialWorldOffset = t.subtract(n).x;
            this._worldWidth = this._map.project([0, 180]).x
        },
        _onPreDrag: function() {
            var i = this._worldWidth,
                t = Math.round(i / 2),
                n = this._initialWorldOffset,
                r = this._draggable._newPos.x,
                u = (r - t + n) % i + t - n,
                f = (r + t + n) % i - t - n,
                e = Math.abs(u + n) < Math.abs(f + n) ? u : f;
            this._draggable._newPos.x = e
        },
        _onDragEnd: function(n) {
            var t = this._map,
                i = t.options,
                e = +new Date - this._lastTime,
                l = !i.inertia || e > i.inertiaThreshold || !this._positions[0];
            if (t.fire("dragend", n), l) t.fire("moveend");
            else {
                var a = this._lastPos.subtract(this._positions[0]),
                    v = (this._lastTime + e - this._times[0]) / 1e3,
                    f = i.easeLinearity,
                    o = a.multiplyBy(f / v),
                    s = o.distanceTo([0, 0]),
                    h = Math.min(i.inertiaMaxSpeed, s),
                    y = o.multiplyBy(h / s),
                    c = h / (i.inertiaDeceleration * f),
                    u = y.multiplyBy(-c / 2).round();
                u.x && u.y ? (u = t._limitOffset(u, t.options.maxBounds), r.Util.requestAnimFrame(function() {
                    t.panBy(u, {
                        duration: c,
                        easeLinearity: f,
                        noMoveStart: !0
                    })
                })) : t.fire("moveend")
            }
        }
    });
    r.Map.addInitHook("addHandler", "dragging", r.Map.Drag);
    r.Map.mergeOptions({
        doubleClickZoom: !0
    });
    r.Map.DoubleClickZoom = r.Handler.extend({
        addHooks: function() {
            this._map.on("dblclick", this._onDoubleClick, this)
        },
        removeHooks: function() {
            this._map.off("dblclick", this._onDoubleClick, this)
        },
        _onDoubleClick: function(n) {
            var t = this._map,
                i = t.getZoom() + (n.originalEvent.shiftKey ? -1 : 1);
            "center" === t.options.doubleClickZoom ? t.setZoom(i) : t.setZoomAround(n.containerPoint, i)
        }
    });
    r.Map.addInitHook("addHandler", "doubleClickZoom", r.Map.DoubleClickZoom);
    r.Map.mergeOptions({
        scrollWheelZoom: !0
    });
    r.Map.ScrollWheelZoom = r.Handler.extend({
        addHooks: function() {
            r.DomEvent.on(this._map._container, "mousewheel", this._onWheelScroll, this);
            r.DomEvent.on(this._map._container, "MozMousePixelScroll", r.DomEvent.preventDefault);
            this._delta = 0
        },
        removeHooks: function() {
            r.DomEvent.off(this._map._container, "mousewheel", this._onWheelScroll);
            r.DomEvent.off(this._map._container, "MozMousePixelScroll", r.DomEvent.preventDefault)
        },
        _onWheelScroll: function(n) {
            var i = r.DomEvent.getWheelDelta(n),
                t;
            this._delta += i;
            this._lastMousePos = this._map.mouseEventToContainerPoint(n);
            this._startTime || (this._startTime = +new Date);
            t = Math.max(40 - (+new Date - this._startTime), 0);
            clearTimeout(this._timer);
            this._timer = setTimeout(r.bind(this._performZoom, this), t);
            r.DomEvent.preventDefault(n);
            r.DomEvent.stopPropagation(n)
        },
        _performZoom: function() {
            var t = this._map,
                n = this._delta,
                i = t.getZoom();
            n = n > 0 ? Math.ceil(n) : Math.floor(n);
            n = Math.max(Math.min(n, 4), -4);
            n = t._limitZoom(i + n) - i;
            this._delta = 0;
            this._startTime = null;
            n && ("center" === t.options.scrollWheelZoom ? t.setZoom(i + n) : t.setZoomAround(this._lastMousePos, i + n))
        }
    });
    r.Map.addInitHook("addHandler", "scrollWheelZoom", r.Map.ScrollWheelZoom);
    r.extend(r.DomEvent, {
        _touchstart: r.Browser.msPointer ? "MSPointerDown" : r.Browser.pointer ? "pointerdown" : "touchstart",
        _touchend: r.Browser.msPointer ? "MSPointerUp" : r.Browser.pointer ? "pointerup" : "touchend",
        addDoubleTapListener: function(n, i, u) {
            function c(n) {
                var i, t, u;
                (r.Browser.pointer ? (e.push(n.pointerId), i = e.length) : i = n.touches.length, i > 1) || (t = Date.now(), u = t - (s || t), f = n.touches ? n.touches[0] : n, l = u > 0 && p >= u, s = t)
            }
            function o(n) {
                var u, t, o, h;
                if (r.Browser.pointer) {
                    if (u = e.indexOf(n.pointerId), -1 === u) return;
                    e.splice(u, 1)
                }
                if (l) {
                    if (r.Browser.pointer) {
                        o = {};
                        for (h in f) t = f[h], o[h] = "function" == typeof t ? t.bind(f) : t;
                        f = o
                    }
                    f.type = "dblclick";
                    i(f);
                    s = null
                }
            }
            var s, f, l = !1,
                p = 250,
                a = "_leaflet_",
                v = this._touchstart,
                y = this._touchend,
                e = [],
                h;
            return n[a + v + u] = c, n[a + y + u] = o, h = r.Browser.pointer ? t.documentElement : n, n.addEventListener(v, c, !1), h.addEventListener(y, o, !1), r.Browser.pointer && h.addEventListener(r.DomEvent.POINTER_CANCEL, o, !1), this
        },
        removeDoubleTapListener: function(n, i) {
            var u = "_leaflet_";
            return n.removeEventListener(this._touchstart, n[u + this._touchstart + i], !1), (r.Browser.pointer ? t.documentElement : n).removeEventListener(this._touchend, n[u + this._touchend + i], !1), r.Browser.pointer && t.documentElement.removeEventListener(r.DomEvent.POINTER_CANCEL, n[u + this._touchend + i], !1), this
        }
    });
    r.extend(r.DomEvent, {
        POINTER_DOWN: r.Browser.msPointer ? "MSPointerDown" : "pointerdown",
        POINTER_MOVE: r.Browser.msPointer ? "MSPointerMove" : "pointermove",
        POINTER_UP: r.Browser.msPointer ? "MSPointerUp" : "pointerup",
        POINTER_CANCEL: r.Browser.msPointer ? "MSPointerCancel" : "pointercancel",
        _pointers: [],
        _pointerDocumentListener: !1,
        addPointerListener: function(n, t, i, r) {
            switch (t) {
                case "touchstart":
                    return this.addPointerListenerStart(n, t, i, r);
                case "touchend":
                    return this.addPointerListenerEnd(n, t, i, r);
                case "touchmove":
                    return this.addPointerListenerMove(n, t, i, r);
                default:
                    throw "Unknown touch event type";
            }
        },
        addPointerListenerStart: function(n, i, u, f) {
            var e = this._pointers,
                s = function(n) {
                    "mouse" !== n.pointerType && n.pointerType !== n.MSPOINTER_TYPE_MOUSE && r.DomEvent.preventDefault(n);
                    for (var i = !1, t = 0; t < e.length; t++) if (e[t].pointerId === n.pointerId) {
                        i = !0;
                        break
                    }
                    i || e.push(n);
                    n.touches = e.slice();
                    n.changedTouches = [n];
                    u(n)
                }, o;
            return (n["_leaflet_touchstart" + f] = s, n.addEventListener(this.POINTER_DOWN, s, !1), this._pointerDocumentListener) || (o = function(n) {
                for (var t = 0; t < e.length; t++) if (e[t].pointerId === n.pointerId) {
                    e.splice(t, 1);
                    break
                }
            }, t.documentElement.addEventListener(this.POINTER_UP, o, !1), t.documentElement.addEventListener(this.POINTER_CANCEL, o, !1), this._pointerDocumentListener = !0), this
        },
        addPointerListenerMove: function(n, t, i, r) {
            function f(n) {
                if (n.pointerType !== n.MSPOINTER_TYPE_MOUSE && "mouse" !== n.pointerType || 0 !== n.buttons) {
                    for (var t = 0; t < u.length; t++) if (u[t].pointerId === n.pointerId) {
                        u[t] = n;
                        break
                    }
                    n.touches = u.slice();
                    n.changedTouches = [n];
                    i(n)
                }
            }
            var u = this._pointers;
            return n["_leaflet_touchmove" + r] = f, n.addEventListener(this.POINTER_MOVE, f, !1), this
        },
        addPointerListenerEnd: function(n, t, i, r) {
            var u = this._pointers,
                f = function(n) {
                    for (var t = 0; t < u.length; t++) if (u[t].pointerId === n.pointerId) {
                        u.splice(t, 1);
                        break
                    }
                    n.touches = u.slice();
                    n.changedTouches = [n];
                    i(n)
                };
            return n["_leaflet_touchend" + r] = f, n.addEventListener(this.POINTER_UP, f, !1), n.addEventListener(this.POINTER_CANCEL, f, !1), this
        },
        removePointerListener: function(n, t, i) {
            var r = n["_leaflet_" + t + i];
            switch (t) {
                case "touchstart":
                    n.removeEventListener(this.POINTER_DOWN, r, !1);
                    break;
                case "touchmove":
                    n.removeEventListener(this.POINTER_MOVE, r, !1);
                    break;
                case "touchend":
                    n.removeEventListener(this.POINTER_UP, r, !1);
                    n.removeEventListener(this.POINTER_CANCEL, r, !1)
            }
            return this
        }
    });
    r.Map.mergeOptions({
        touchZoom: r.Browser.touch && !r.Browser.android23,
        bounceAtZoomLimits: !0
    });
    r.Map.TouchZoom = r.Handler.extend({
        addHooks: function() {
            r.DomEvent.on(this._map._container, "touchstart", this._onTouchStart, this)
        },
        removeHooks: function() {
            r.DomEvent.off(this._map._container, "touchstart", this._onTouchStart, this)
        },
        _onTouchStart: function(n) {
            var i = this._map;
            if (n.touches && 2 === n.touches.length && !i._animatingZoom && !this._zooming) {
                var u = i.mouseEventToLayerPoint(n.touches[0]),
                    f = i.mouseEventToLayerPoint(n.touches[1]),
                    e = i._getCenterLayerPoint();
                this._startCenter = u.add(f)._divideBy(2);
                this._startDist = u.distanceTo(f);
                this._moved = !1;
                this._zooming = !0;
                this._centerOffset = e.subtract(this._startCenter);
                i._panAnim && i._panAnim.stop();
                r.DomEvent.on(t, "touchmove", this._onTouchMove, this).on(t, "touchend", this._onTouchEnd, this);
                r.DomEvent.preventDefault(n)
            }
        },
        _onTouchMove: function(n) {
            var t = this._map,
                i, u;
            n.touches && 2 === n.touches.length && this._zooming && (i = t.mouseEventToLayerPoint(n.touches[0]), u = t.mouseEventToLayerPoint(n.touches[1]), this._scale = i.distanceTo(u) / this._startDist, this._delta = i._add(u)._divideBy(2)._subtract(this._startCenter), 1 !== this._scale && (t.options.bounceAtZoomLimits || !(t.getZoom() === t.getMinZoom() && this._scale < 1 || t.getZoom() === t.getMaxZoom() && this._scale > 1)) && (this._moved || (r.DomUtil.addClass(t._mapPane, "leaflet-touching"), t.fire("movestart").fire("zoomstart"), this._moved = !0), r.Util.cancelAnimFrame(this._animRequest), this._animRequest = r.Util.requestAnimFrame(this._updateOnMove, this, !0, this._map._container), r.DomEvent.preventDefault(n)))
        },
        _updateOnMove: function() {
            var n = this._map,
                t = this._getScaleOrigin(),
                i = n.layerPointToLatLng(t),
                r = n.getScaleZoom(this._scale);
            n._animateZoom(i, r, this._startCenter, this._scale, this._delta, !1, !0)
        },
        _onTouchEnd: function() {
            var n;
            if (!this._moved || !this._zooming) return void(this._zooming = !1);
            n = this._map;
            this._zooming = !1;
            r.DomUtil.removeClass(n._mapPane, "leaflet-touching");
            r.Util.cancelAnimFrame(this._animRequest);
            r.DomEvent.off(t, "touchmove", this._onTouchMove).off(t, "touchend", this._onTouchEnd);
            var u = this._getScaleOrigin(),
                o = n.layerPointToLatLng(u),
                f = n.getZoom(),
                i = n.getScaleZoom(this._scale) - f,
                s = i > 0 ? Math.ceil(i) : Math.floor(i),
                e = n._limitZoom(f + s),
                h = n.getZoomScale(e) / this._scale;
            n._animateZoom(o, e, u, h)
        },
        _getScaleOrigin: function() {
            var n = this._centerOffset.subtract(this._delta).divideBy(this._scale);
            return this._startCenter.add(n)
        }
    });
    r.Map.addInitHook("addHandler", "touchZoom", r.Map.TouchZoom);
    r.Map.mergeOptions({
        tap: !0,
        tapTolerance: 15
    });
    r.Map.Tap = r.Handler.extend({
        addHooks: function() {
            r.DomEvent.on(this._map._container, "touchstart", this._onDown, this)
        },
        removeHooks: function() {
            r.DomEvent.off(this._map._container, "touchstart", this._onDown, this)
        },
        _onDown: function(n) {
            if (n.touches) {
                if (r.DomEvent.preventDefault(n), this._fireClick = !0, n.touches.length > 1) return this._fireClick = !1, void clearTimeout(this._holdTimeout);
                var i = n.touches[0],
                    u = i.target;
                this._startPos = this._newPos = new r.Point(i.clientX, i.clientY);
                u.tagName && "a" === u.tagName.toLowerCase() && r.DomUtil.addClass(u, "leaflet-active");
                this._holdTimeout = setTimeout(r.bind(function() {
                    this._isTapValid() && (this._fireClick = !1, this._onUp(), this._simulateEvent("contextmenu", i))
                }, this), 1e3);
                r.DomEvent.on(t, "touchmove", this._onMove, this).on(t, "touchend", this._onUp, this)
            }
        },
        _onUp: function(n) {
            if (clearTimeout(this._holdTimeout), r.DomEvent.off(t, "touchmove", this._onMove, this).off(t, "touchend", this._onUp, this), this._fireClick && n && n.changedTouches) {
                var u = n.changedTouches[0],
                    i = u.target;
                i && i.tagName && "a" === i.tagName.toLowerCase() && r.DomUtil.removeClass(i, "leaflet-active");
                this._isTapValid() && this._simulateEvent("click", u)
            }
        },
        _isTapValid: function() {
            return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
        },
        _onMove: function(n) {
            var t = n.touches[0];
            this._newPos = new r.Point(t.clientX, t.clientY)
        },
        _simulateEvent: function(i, r) {
            var u = t.createEvent("MouseEvents");
            u._simulated = !0;
            r.target._simulatedClick = !0;
            u.initMouseEvent(i, !0, !0, n, 1, r.screenX, r.screenY, r.clientX, r.clientY, !1, !1, !1, !1, 0, null);
            r.target.dispatchEvent(u)
        }
    });
    r.Browser.touch && !r.Browser.pointer && r.Map.addInitHook("addHandler", "tap", r.Map.Tap);
    r.Map.mergeOptions({
        boxZoom: !0
    });
    r.Map.BoxZoom = r.Handler.extend({
        initialize: function(n) {
            this._map = n;
            this._container = n._container;
            this._pane = n._panes.overlayPane;
            this._moved = !1
        },
        addHooks: function() {
            r.DomEvent.on(this._container, "mousedown", this._onMouseDown, this)
        },
        removeHooks: function() {
            r.DomEvent.off(this._container, "mousedown", this._onMouseDown);
            this._moved = !1
        },
        moved: function() {
            return this._moved
        },
        _onMouseDown: function(n) {
            return this._moved = !1, !n.shiftKey || 1 !== n.which && 1 !== n.button ? !1 : (r.DomUtil.disableTextSelection(), r.DomUtil.disableImageDrag(), this._startLayerPoint = this._map.mouseEventToLayerPoint(n), void r.DomEvent.on(t, "mousemove", this._onMouseMove, this).on(t, "mouseup", this._onMouseUp, this).on(t, "keydown", this._onKeyDown, this))
        },
        _onMouseMove: function(n) {
            this._moved || (this._box = r.DomUtil.create("div", "leaflet-zoom-box", this._pane), r.DomUtil.setPosition(this._box, this._startLayerPoint), this._container.style.cursor = "crosshair", this._map.fire("boxzoomstart"));
            var t = this._startLayerPoint,
                i = this._box,
                u = this._map.mouseEventToLayerPoint(n),
                f = u.subtract(t),
                e = new r.Point(Math.min(u.x, t.x), Math.min(u.y, t.y));
            r.DomUtil.setPosition(i, e);
            this._moved = !0;
            i.style.width = Math.max(0, Math.abs(f.x) - 4) + "px";
            i.style.height = Math.max(0, Math.abs(f.y) - 4) + "px"
        },
        _finish: function() {
            this._moved && (this._pane.removeChild(this._box), this._container.style.cursor = "");
            r.DomUtil.enableTextSelection();
            r.DomUtil.enableImageDrag();
            r.DomEvent.off(t, "mousemove", this._onMouseMove).off(t, "mouseup", this._onMouseUp).off(t, "keydown", this._onKeyDown)
        },
        _onMouseUp: function(n) {
            var t, i, u;
            this._finish();
            t = this._map;
            i = t.mouseEventToLayerPoint(n);
            this._startLayerPoint.equals(i) || (u = new r.LatLngBounds(t.layerPointToLatLng(this._startLayerPoint), t.layerPointToLatLng(i)), t.fitBounds(u), t.fire("boxzoomend", {
                boxZoomBounds: u
            }))
        },
        _onKeyDown: function(n) {
            27 === n.keyCode && this._finish()
        }
    });
    r.Map.addInitHook("addHandler", "boxZoom", r.Map.BoxZoom);
    r.Map.mergeOptions({
        keyboard: !0,
        keyboardPanOffset: 80,
        keyboardZoomOffset: 1
    });
    r.Map.Keyboard = r.Handler.extend({
        keyCodes: {
            left: [37],
            right: [39],
            down: [40],
            up: [38],
            zoomIn: [187, 107, 61, 171],
            zoomOut: [189, 109, 173]
        },
        initialize: function(n) {
            this._map = n;
            this._setPanOffset(n.options.keyboardPanOffset);
            this._setZoomOffset(n.options.keyboardZoomOffset)
        },
        addHooks: function() {
            var n = this._map._container; - 1 === n.tabIndex && (n.tabIndex = "0");
            r.DomEvent.on(n, "focus", this._onFocus, this).on(n, "blur", this._onBlur, this).on(n, "mousedown", this._onMouseDown, this);
            this._map.on("focus", this._addHooks, this).on("blur", this._removeHooks, this)
        },
        removeHooks: function() {
            this._removeHooks();
            var n = this._map._container;
            r.DomEvent.off(n, "focus", this._onFocus, this).off(n, "blur", this._onBlur, this).off(n, "mousedown", this._onMouseDown, this);
            this._map.off("focus", this._addHooks, this).off("blur", this._removeHooks, this)
        },
        _onMouseDown: function() {
            if (!this._focused) {
                var i = t.body,
                    r = t.documentElement,
                    u = i.scrollTop || r.scrollTop,
                    f = i.scrollLeft || r.scrollLeft;
                this._map._container.focus();
                n.scrollTo(f, u)
            }
        },
        _onFocus: function() {
            this._focused = !0;
            this._map.fire("focus")
        },
        _onBlur: function() {
            this._focused = !1;
            this._map.fire("blur")
        },
        _setPanOffset: function(n) {
            for (var u = this._panKeys = {}, r = this.keyCodes, t = 0, i = r.left.length; i > t; t++) u[r.left[t]] = [-1 * n, 0];
            for (t = 0, i = r.right.length; i > t; t++) u[r.right[t]] = [n, 0];
            for (t = 0, i = r.down.length; i > t; t++) u[r.down[t]] = [0, n];
            for (t = 0, i = r.up.length; i > t; t++) u[r.up[t]] = [0, -1 * n]
        },
        _setZoomOffset: function(n) {
            for (var u = this._zoomKeys = {}, r = this.keyCodes, t = 0, i = r.zoomIn.length; i > t; t++) u[r.zoomIn[t]] = n;
            for (t = 0, i = r.zoomOut.length; i > t; t++) u[r.zoomOut[t]] = -n
        },
        _addHooks: function() {
            r.DomEvent.on(t, "keydown", this._onKeyDown, this)
        },
        _removeHooks: function() {
            r.DomEvent.off(t, "keydown", this._onKeyDown, this)
        },
        _onKeyDown: function(n) {
            var i = n.keyCode,
                t = this._map;
            if (i in this._panKeys) {
                if (t._panAnim && t._panAnim._inProgress) return;
                t.panBy(this._panKeys[i]);
                t.options.maxBounds && t.panInsideBounds(t.options.maxBounds)
            } else {
                if (!(i in this._zoomKeys)) return;
                t.setZoom(t.getZoom() + this._zoomKeys[i])
            }
            r.DomEvent.stop(n)
        }
    });
    r.Map.addInitHook("addHandler", "keyboard", r.Map.Keyboard);
    r.Handler.MarkerDrag = r.Handler.extend({
        initialize: function(n) {
            this._marker = n
        },
        addHooks: function() {
            var n = this._marker._icon;
            this._draggable || (this._draggable = new r.Draggable(n, n));
            this._draggable.on("dragstart", this._onDragStart, this).on("drag", this._onDrag, this).on("dragend", this._onDragEnd, this);
            this._draggable.enable();
            r.DomUtil.addClass(this._marker._icon, "leaflet-marker-draggable")
        },
        removeHooks: function() {
            this._draggable.off("dragstart", this._onDragStart, this).off("drag", this._onDrag, this).off("dragend", this._onDragEnd, this);
            this._draggable.disable();
            r.DomUtil.removeClass(this._marker._icon, "leaflet-marker-draggable")
        },
        moved: function() {
            return this._draggable && this._draggable._moved
        },
        _onDragStart: function() {
            this._marker.closePopup().fire("movestart").fire("dragstart")
        },
        _onDrag: function() {
            var n = this._marker,
                t = n._shadow,
                i = r.DomUtil.getPosition(n._icon),
                u = n._map.layerPointToLatLng(i);
            t && r.DomUtil.setPosition(t, i);
            n._latlng = u;
            n.fire("move", {
                latlng: u
            }).fire("drag")
        },
        _onDragEnd: function(n) {
            this._marker.fire("moveend").fire("dragend", n)
        }
    });
    r.Control = r.Class.extend({
        options: {
            position: "topright"
        },
        initialize: function(n) {
            r.setOptions(this, n)
        },
        getPosition: function() {
            return this.options.position
        },
        setPosition: function(n) {
            var t = this._map;
            return t && t.removeControl(this), this.options.position = n, t && t.addControl(this), this
        },
        getContainer: function() {
            return this._container
        },
        addTo: function(n) {
            this._map = n;
            var t = this._container = this.onAdd(n),
                u = this.getPosition(),
                i = n._controlCorners[u];
            return r.DomUtil.addClass(t, "leaflet-control"), -1 !== u.indexOf("bottom") ? i.insertBefore(t, i.firstChild) : i.appendChild(t), this
        },
        removeFrom: function(n) {
            var t = this.getPosition(),
                i = n._controlCorners[t];
            return i.removeChild(this._container), this._map = null, this.onRemove && this.onRemove(n), this
        },
        _refocusOnMap: function() {
            this._map && this._map.getContainer().focus()
        }
    });
    r.control = function(n) {
        return new r.Control(n)
    };
    r.Map.include({
        addControl: function(n) {
            return n.addTo(this), this
        },
        removeControl: function(n) {
            return n.removeFrom(this), this
        },
        _initControlPos: function() {
            function n(n, f) {
                var e = t + n + " " + t + f;
                i[n + f] = r.DomUtil.create("div", e, u)
            }
            var i = this._controlCorners = {}, t = "leaflet-",
                u = this._controlContainer = r.DomUtil.create("div", t + "control-container", this._container);
            n("top", "left");
            n("top", "right");
            n("bottom", "left");
            n("bottom", "right")
        },
        _clearControlPos: function() {
            this._container.removeChild(this._controlContainer)
        }
    });
    r.Control.Zoom = r.Control.extend({
        options: {
            position: "topleft",
            zoomInText: "+",
            zoomInTitle: "Zoom in",
            zoomOutText: "-",
            zoomOutTitle: "Zoom out"
        },
        onAdd: function(n) {
            var t = "leaflet-control-zoom",
                i = r.DomUtil.create("div", t + " leaflet-bar");
            return this._map = n, this._zoomInButton = this._createButton(this.options.zoomInText, this.options.zoomInTitle, t + "-in", i, this._zoomIn, this), this._zoomOutButton = this._createButton(this.options.zoomOutText, this.options.zoomOutTitle, t + "-out", i, this._zoomOut, this), this._updateDisabled(), n.on("zoomend zoomlevelschange", this._updateDisabled, this), i
        },
        onRemove: function(n) {
            n.off("zoomend zoomlevelschange", this._updateDisabled, this)
        },
        _zoomIn: function(n) {
            this._map.zoomIn(n.shiftKey ? 3 : 1)
        },
        _zoomOut: function(n) {
            this._map.zoomOut(n.shiftKey ? 3 : 1)
        },
        _createButton: function(n, t, i, u, f, e) {
            var o = r.DomUtil.create("a", i, u),
                s;
            return o.innerHTML = n, o.href = "#", o.title = t, s = r.DomEvent.stopPropagation, r.DomEvent.on(o, "click", s).on(o, "mousedown", s).on(o, "dblclick", s).on(o, "click", r.DomEvent.preventDefault).on(o, "click", f, e).on(o, "click", this._refocusOnMap, e), o
        },
        _updateDisabled: function() {
            var n = this._map,
                t = "leaflet-disabled";
            r.DomUtil.removeClass(this._zoomInButton, t);
            r.DomUtil.removeClass(this._zoomOutButton, t);
            n._zoom === n.getMinZoom() && r.DomUtil.addClass(this._zoomOutButton, t);
            n._zoom === n.getMaxZoom() && r.DomUtil.addClass(this._zoomInButton, t)
        }
    });
    r.Map.mergeOptions({
        zoomControl: !0
    });
    r.Map.addInitHook(function() {
        this.options.zoomControl && (this.zoomControl = new r.Control.Zoom, this.addControl(this.zoomControl))
    });
    r.control.zoom = function(n) {
        return new r.Control.Zoom(n)
    };
    r.Control.Attribution = r.Control.extend({
        options: {
            position: "bottomright",
            prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet<\/a>'
        },
        initialize: function(n) {
            r.setOptions(this, n);
            this._attributions = {}
        },
        onAdd: function(n) {
            this._container = r.DomUtil.create("div", "leaflet-control-attribution");
            r.DomEvent.disableClickPropagation(this._container);
            for (var t in n._layers) n._layers[t].getAttribution && this.addAttribution(n._layers[t].getAttribution());
            return n.on("layeradd", this._onLayerAdd, this).on("layerremove", this._onLayerRemove, this), this._update(), this._container
        },
        onRemove: function(n) {
            n.off("layeradd", this._onLayerAdd).off("layerremove", this._onLayerRemove)
        },
        setPrefix: function(n) {
            return this.options.prefix = n, this._update(), this
        },
        addAttribution: function(n) {
            if (n) return (this._attributions[n] || (this._attributions[n] = 0), this._attributions[n]++, this._update(), this)
        },
        removeAttribution: function(n) {
            if (n) return (this._attributions[n] && (this._attributions[n]--, this._update()), this)
        },
        _update: function() {
            var n, i, t;
            if (this._map) {
                n = [];
                for (i in this._attributions) this._attributions[i] && n.push(i);
                t = [];
                this.options.prefix && t.push(this.options.prefix);
                n.length && t.push(n.join(", "));
                this._container.innerHTML = t.join(" | ")
            }
        },
        _onLayerAdd: function(n) {
            n.layer.getAttribution && this.addAttribution(n.layer.getAttribution())
        },
        _onLayerRemove: function(n) {
            n.layer.getAttribution && this.removeAttribution(n.layer.getAttribution())
        }
    });
    r.Map.mergeOptions({
        attributionControl: !0
    });
    r.Map.addInitHook(function() {
        this.options.attributionControl && (this.attributionControl = (new r.Control.Attribution).addTo(this))
    });
    r.control.attribution = function(n) {
        return new r.Control.Attribution(n)
    };
    r.Control.Scale = r.Control.extend({
        options: {
            position: "bottomleft",
            maxWidth: 100,
            metric: !0,
            imperial: !0,
            updateWhenIdle: !1
        },
        onAdd: function(n) {
            this._map = n;
            var t = "leaflet-control-scale",
                i = r.DomUtil.create("div", t),
                u = this.options;
            return this._addScales(u, t, i), n.on(u.updateWhenIdle ? "moveend" : "move", this._update, this), n.whenReady(this._update, this), i
        },
        onRemove: function(n) {
            n.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
        },
        _addScales: function(n, t, i) {
            n.metric && (this._mScale = r.DomUtil.create("div", t + "-line", i));
            n.imperial && (this._iScale = r.DomUtil.create("div", t + "-line", i))
        },
        _update: function() {
            var n = this._map.getBounds(),
                u = n.getCenter().lat,
                f = 6378137 * Math.PI * Math.cos(u * Math.PI / 180),
                e = f * (n.getNorthEast().lng - n.getSouthWest().lng) / 180,
                t = this._map.getSize(),
                i = this.options,
                r = 0;
            t.x > 0 && (r = e * (i.maxWidth / t.x));
            this._updateScales(i, r)
        },
        _updateScales: function(n, t) {
            n.metric && t && this._updateMetric(t);
            n.imperial && t && this._updateImperial(t)
        },
        _updateMetric: function(n) {
            var t = this._getRoundNum(n);
            this._mScale.style.width = this._getScaleWidth(t / n) + "px";
            this._mScale.innerHTML = 1e3 > t ? t + " m" : t / 1e3 + " km"
        },
        _updateImperial: function(n) {
            var r, u, f, t = 3.2808399 * n,
                i = this._iScale;
            t > 5280 ? (r = t / 5280, u = this._getRoundNum(r), i.style.width = this._getScaleWidth(u / r) + "px", i.innerHTML = u + " mi") : (f = this._getRoundNum(t), i.style.width = this._getScaleWidth(f / t) + "px", i.innerHTML = f + " ft")
        },
        _getScaleWidth: function(n) {
            return Math.round(this.options.maxWidth * n) - 10
        },
        _getRoundNum: function(n) {
            var i = Math.pow(10, (Math.floor(n) + "").length - 1),
                t = n / i;
            return t = t >= 10 ? 10 : t >= 5 ? 5 : t >= 3 ? 3 : t >= 2 ? 2 : 1, i * t
        }
    });
    r.control.scale = function(n) {
        return new r.Control.Scale(n)
    };
    r.Control.Layers = r.Control.extend({
        options: {
            collapsed: !0,
            position: "topright",
            autoZIndex: !0
        },
        initialize: function(n, t, i) {
            r.setOptions(this, i);
            this._layers = {};
            this._lastZIndex = 0;
            this._handlingClick = !1;
            for (var u in n) this._addLayer(n[u], u);
            for (u in t) this._addLayer(t[u], u, !0)
        },
        onAdd: function(n) {
            return this._initLayout(), this._update(), n.on("layeradd", this._onLayerChange, this).on("layerremove", this._onLayerChange, this), this._container
        },
        onRemove: function(n) {
            n.off("layeradd", this._onLayerChange, this).off("layerremove", this._onLayerChange, this)
        },
        addBaseLayer: function(n, t) {
            return this._addLayer(n, t), this._update(), this
        },
        addOverlay: function(n, t) {
            return this._addLayer(n, t, !0), this._update(), this
        },
        removeLayer: function(n) {
            var t = r.stamp(n);
            return delete this._layers[t], this._update(), this
        },
        _initLayout: function() {
            var t = "leaflet-control-layers",
                n = this._container = r.DomUtil.create("div", t),
                i, u;
            n.setAttribute("aria-haspopup", !0);
            r.Browser.touch ? r.DomEvent.on(n, "click", r.DomEvent.stopPropagation) : r.DomEvent.disableClickPropagation(n).disableScrollPropagation(n);
            i = this._form = r.DomUtil.create("form", t + "-list");
            this.options.collapsed ? (r.Browser.android || r.DomEvent.on(n, "mouseover", this._expand, this).on(n, "mouseout", this._collapse, this), u = this._layersLink = r.DomUtil.create("a", t + "-toggle", n), u.href = "#", u.title = "Layers", r.Browser.touch ? r.DomEvent.on(u, "click", r.DomEvent.stop).on(u, "click", this._expand, this) : r.DomEvent.on(u, "focus", this._expand, this), r.DomEvent.on(i, "click", function() {
                setTimeout(r.bind(this._onInputClick, this), 0)
            }, this), this._map.on("click", this._collapse, this)) : this._expand();
            this._baseLayersList = r.DomUtil.create("div", t + "-base", i);
            this._separator = r.DomUtil.create("div", t + "-separator", i);
            this._overlaysList = r.DomUtil.create("div", t + "-overlays", i);
            n.appendChild(i)
        },
        _addLayer: function(n, t, i) {
            var u = r.stamp(n);
            this._layers[u] = {
                layer: n,
                name: t,
                overlay: i
            };
            this.options.autoZIndex && n.setZIndex && (this._lastZIndex++, n.setZIndex(this._lastZIndex))
        },
        _update: function() {
            if (this._container) {
                this._baseLayersList.innerHTML = "";
                this._overlaysList.innerHTML = "";
                var r, n, t = !1,
                    i = !1;
                for (r in this._layers) n = this._layers[r], this._addItem(n), i = i || n.overlay, t = t || !n.overlay;
                this._separator.style.display = i && t ? "" : "none"
            }
        },
        _onLayerChange: function(n) {
            var t = this._layers[r.stamp(n.layer)],
                i;
            t && (this._handlingClick || this._update(), i = t.overlay ? "layeradd" === n.type ? "overlayadd" : "overlayremove" : "layeradd" === n.type ? "baselayerchange" : null, i && this._map.fire(i, t))
        },
        _createRadioElement: function(n, i) {
            var r = '<input type="radio" class="leaflet-control-layers-selector" name="' + n + '"',
                u;
            return i && (r += ' checked="checked"'), r += "/>", u = t.createElement("div"), u.innerHTML = r, u.firstChild
        },
        _addItem: function(n) {
            var i, u = t.createElement("label"),
                e = this._map.hasLayer(n.layer),
                f, o;
            return n.overlay ? (i = t.createElement("input"), i.type = "checkbox", i.className = "leaflet-control-layers-selector", i.defaultChecked = e) : i = this._createRadioElement("leaflet-base-layers", e), i.layerId = r.stamp(n.layer), r.DomEvent.on(i, "click", this._onInputClick, this), f = t.createElement("span"), f.innerHTML = " " + n.name, u.appendChild(i), u.appendChild(f), o = n.overlay ? this._overlaysList : this._baseLayersList, o.appendChild(u), u
        },
        _onInputClick: function() {
            var t, i, n, r = this._form.getElementsByTagName("input"),
                u = r.length;
            for (this._handlingClick = !0, t = 0; u > t; t++) i = r[t], n = this._layers[i.layerId], i.checked && !this._map.hasLayer(n.layer) ? this._map.addLayer(n.layer) : !i.checked && this._map.hasLayer(n.layer) && this._map.removeLayer(n.layer);
            this._handlingClick = !1;
            this._refocusOnMap()
        },
        _expand: function() {
            r.DomUtil.addClass(this._container, "leaflet-control-layers-expanded")
        },
        _collapse: function() {
            this._container.className = this._container.className.replace(" leaflet-control-layers-expanded", "")
        }
    });
    r.control.layers = function(n, t, i) {
        return new r.Control.Layers(n, t, i)
    };
    r.PosAnimation = r.Class.extend({
        includes: r.Mixin.Events,
        run: function(n, t, i, u) {
            this.stop();
            this._el = n;
            this._inProgress = !0;
            this._newPos = t;
            this.fire("start");
            n.style[r.DomUtil.TRANSITION] = "all " + (i || .25) + "s cubic-bezier(0,0," + (u || .5) + ",1)";
            r.DomEvent.on(n, r.DomUtil.TRANSITION_END, this._onTransitionEnd, this);
            r.DomUtil.setPosition(n, t);
            r.Util.falseFn(n.offsetWidth);
            this._stepTimer = setInterval(r.bind(this._onStep, this), 50)
        },
        stop: function() {
            this._inProgress && (r.DomUtil.setPosition(this._el, this._getPos()), this._onTransitionEnd(), r.Util.falseFn(this._el.offsetWidth))
        },
        _onStep: function() {
            var n = this._getPos();
            return n ? (this._el._leaflet_pos = n, void this.fire("step")) : void this._onTransitionEnd()
        },
        _transformRe: /([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,
        _getPos: function() {
            var i, u, t, e = this._el,
                f = n.getComputedStyle(e);
            if (r.Browser.any3d) {
                if (t = f[r.DomUtil.TRANSFORM].match(this._transformRe), !t) return;
                i = parseFloat(t[1]);
                u = parseFloat(t[2])
            } else i = parseFloat(f.left), u = parseFloat(f.top);
            return new r.Point(i, u, !0)
        },
        _onTransitionEnd: function() {
            r.DomEvent.off(this._el, r.DomUtil.TRANSITION_END, this._onTransitionEnd, this);
            this._inProgress && (this._inProgress = !1, this._el.style[r.DomUtil.TRANSITION] = "", this._el._leaflet_pos = this._newPos, clearInterval(this._stepTimer), this.fire("step").fire("end"))
        }
    });
    r.Map.include({
        setView: function(n, t, u) {
            if (t = t === i ? this._zoom : this._limitZoom(t), n = this._limitCenter(r.latLng(n), t, this.options.maxBounds), u = u || {}, this._panAnim && this._panAnim.stop(), this._loaded && !u.reset && u !== !0) {
                u.animate !== i && (u.zoom = r.extend({
                    animate: u.animate
                }, u.zoom), u.pan = r.extend({
                    animate: u.animate
                }, u.pan));
                var f = this._zoom !== t ? this._tryAnimatedZoom && this._tryAnimatedZoom(n, t, u.zoom) : this._tryAnimatedPan(n, u.pan);
                if (f) return clearTimeout(this._sizeTimer), this
            }
            return this._resetView(n, t), this
        },
        panBy: function(n, t) {
            if (n = r.point(n).round(), t = t || {}, !n.x && !n.y) return this;
            if (this._panAnim || (this._panAnim = new r.PosAnimation, this._panAnim.on({
                step: this._onPanTransitionStep,
                end: this._onPanTransitionEnd
            }, this)), t.noMoveStart || this.fire("movestart"), t.animate !== !1) {
                r.DomUtil.addClass(this._mapPane, "leaflet-pan-anim");
                var i = this._getMapPanePos().subtract(n);
                this._panAnim.run(this._mapPane, i, t.duration || .25, t.easeLinearity)
            } else this._rawPanBy(n), this.fire("move").fire("moveend");
            return this
        },
        _onPanTransitionStep: function() {
            this.fire("move")
        },
        _onPanTransitionEnd: function() {
            r.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim");
            this.fire("moveend")
        },
        _tryAnimatedPan: function(n, t) {
            var i = this._getCenterOffset(n)._floor();
            return (t && t.animate) === !0 || this.getSize().contains(i) ? (this.panBy(i, t), !0) : !1
        }
    });
    r.PosAnimation = r.DomUtil.TRANSITION ? r.PosAnimation : r.PosAnimation.extend({
        run: function(n, t, i, u) {
            this.stop();
            this._el = n;
            this._inProgress = !0;
            this._duration = i || .25;
            this._easeOutPower = 1 / Math.max(u || .5, .2);
            this._startPos = r.DomUtil.getPosition(n);
            this._offset = t.subtract(this._startPos);
            this._startTime = +new Date;
            this.fire("start");
            this._animate()
        },
        stop: function() {
            this._inProgress && (this._step(), this._complete())
        },
        _animate: function() {
            this._animId = r.Util.requestAnimFrame(this._animate, this);
            this._step()
        },
        _step: function() {
            var n = +new Date - this._startTime,
                t = 1e3 * this._duration;
            t > n ? this._runFrame(this._easeOut(n / t)) : (this._runFrame(1), this._complete())
        },
        _runFrame: function(n) {
            var t = this._startPos.add(this._offset.multiplyBy(n));
            r.DomUtil.setPosition(this._el, t);
            this.fire("step")
        },
        _complete: function() {
            r.Util.cancelAnimFrame(this._animId);
            this._inProgress = !1;
            this.fire("end")
        },
        _easeOut: function(n) {
            return 1 - Math.pow(1 - n, this._easeOutPower)
        }
    });
    r.Map.mergeOptions({
        zoomAnimation: !0,
        zoomAnimationThreshold: 4
    });
    r.DomUtil.TRANSITION && r.Map.addInitHook(function() {
        this._zoomAnimated = this.options.zoomAnimation && r.DomUtil.TRANSITION && r.Browser.any3d && !r.Browser.android23 && !r.Browser.mobileOpera;
        this._zoomAnimated && r.DomEvent.on(this._mapPane, r.DomUtil.TRANSITION_END, this._catchTransitionEnd, this)
    });
    r.Map.include(r.DomUtil.TRANSITION ? {
        _catchTransitionEnd: function(n) {
            this._animatingZoom && n.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd()
        },
        _nothingToAnimate: function() {
            return !this._container.getElementsByClassName("leaflet-zoom-animated").length
        },
        _tryAnimatedZoom: function(n, t, i) {
            if (this._animatingZoom) return !0;
            if (i = i || {}, !this._zoomAnimated || i.animate === !1 || this._nothingToAnimate() || Math.abs(t - this._zoom) > this.options.zoomAnimationThreshold) return !1;
            var r = this.getZoomScale(t),
                u = this._getCenterOffset(n)._divideBy(1 - 1 / r),
                f = this._getCenterLayerPoint()._add(u);
            return i.animate === !0 || this.getSize().contains(u) ? (this.fire("movestart").fire("zoomstart"), this._animateZoom(n, t, f, r, null, !0), !0) : !1
        },
        _animateZoom: function(n, t, i, u, f, e, o) {
            o || (this._animatingZoom = !0);
            r.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim");
            this._animateToCenter = n;
            this._animateToZoom = t;
            r.Draggable && (r.Draggable._disabled = !0);
            r.Util.requestAnimFrame(function() {
                this.fire("zoomanim", {
                    center: n,
                    zoom: t,
                    origin: i,
                    scale: u,
                    delta: f,
                    backwards: e
                });
                setTimeout(r.bind(this._onZoomTransitionEnd, this), 250)
            }, this)
        },
        _onZoomTransitionEnd: function() {
            this._animatingZoom && (this._animatingZoom = !1, r.DomUtil.removeClass(this._mapPane, "leaflet-zoom-anim"), r.Util.requestAnimFrame(function() {
                this._resetView(this._animateToCenter, this._animateToZoom, !0, !0);
                r.Draggable && (r.Draggable._disabled = !1)
            }, this))
        }
    } : {});
    r.TileLayer.include({
        _animateZoom: function(n) {
            this._animating || (this._animating = !0, this._prepareBgBuffer());
            var t = this._bgBuffer,
                i = r.DomUtil.TRANSFORM,
                u = n.delta ? r.DomUtil.getTranslateString(n.delta) : t.style[i],
                f = r.DomUtil.getScaleString(n.scale, n.origin);
            t.style[i] = n.backwards ? f + " " + u : u + " " + f
        },
        _endZoomAnim: function() {
            var n = this._tileContainer,
                i = this._bgBuffer,
                t;
            n.style.visibility = "";
            n.parentNode.appendChild(n);
            r.Util.falseFn(i.offsetWidth);
            t = this._map.getZoom();
            (t > this.options.maxZoom || t < this.options.minZoom) && this._clearBgBuffer();
            this._animating = !1
        },
        _clearBgBuffer: function() {
            var n = this._map;
            !n || n._animatingZoom || n.touchZoom._zooming || (this._bgBuffer.innerHTML = "", this._bgBuffer.style[r.DomUtil.TRANSFORM] = "")
        },
        _prepareBgBuffer: function() {
            var t = this._tileContainer,
                n = this._bgBuffer,
                i = this._getLoadedTilesPercentage(n),
                u = this._getLoadedTilesPercentage(t);
            return n && i > .5 && .5 > u ? (t.style.visibility = "hidden", void this._stopLoadingImages(t)) : (n.style.visibility = "hidden", n.style[r.DomUtil.TRANSFORM] = "", this._tileContainer = n, n = this._bgBuffer = t, this._stopLoadingImages(n), void clearTimeout(this._clearBgBufferTimer))
        },
        _getLoadedTilesPercentage: function(n) {
            for (var r = n.getElementsByTagName("img"), u = 0, t = 0, i = r.length; i > t; t++) r[t].complete && u++;
            return u / i
        },
        _stopLoadingImages: function(n) {
            for (var t, f = Array.prototype.slice.call(n.getElementsByTagName("img")), i = 0, u = f.length; u > i; i++) t = f[i], t.complete || (t.onload = r.Util.falseFn, t.onerror = r.Util.falseFn, t.src = r.Util.emptyImageUrl, t.parentNode.removeChild(t))
        }
    });
    r.Map.include({
        _defaultLocateOptions: {
            watch: !1,
            setView: !1,
            maxZoom: 1 / 0,
            timeout: 1e4,
            maximumAge: 0,
            enableHighAccuracy: !1
        },
        locate: function(n) {
            if (n = this._locateOptions = r.extend(this._defaultLocateOptions, n), !navigator.geolocation) return this._handleGeolocationError({
                code: 0,
                message: "Geolocation not supported."
            }), this;
            var t = r.bind(this._handleGeolocationResponse, this),
                i = r.bind(this._handleGeolocationError, this);
            return n.watch ? this._locationWatchId = navigator.geolocation.watchPosition(t, i, n) : navigator.geolocation.getCurrentPosition(t, i, n), this
        },
        stopLocate: function() {
            return navigator.geolocation && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this
        },
        _handleGeolocationError: function(n) {
            var t = n.code,
                i = n.message || (1 === t ? "permission denied" : 2 === t ? "position unavailable" : "timeout");
            this._locateOptions.setView && !this._loaded && this.fitWorld();
            this.fire("locationerror", {
                code: t,
                message: "Geolocation error: " + i + "."
            })
        },
        _handleGeolocationResponse: function(n) {
            var t = n.coords.latitude,
                u = n.coords.longitude,
                o = new r.LatLng(t, u),
                f = 180 * n.coords.accuracy / 40075017,
                s = f / Math.cos(r.LatLng.DEG_TO_RAD * t),
                h = r.latLngBounds([t - f, u - s], [t + f, u + s]),
                c = this._locateOptions,
                l, e, i;
            c.setView && (l = Math.min(this.getBoundsZoom(h), c.maxZoom), this.setView(o, l));
            e = {
                latlng: o,
                bounds: h,
                timestamp: n.timestamp
            };
            for (i in n.coords) "number" == typeof n.coords[i] && (e[i] = n.coords[i]);
            this.fire("locationfound", e)
        }
    })
}(window, document),
function(n, t) {
    "use strict";
    var i = {
        iconColor: "#1EB300",
        iconAnchor: {
            marker: [14, 36],
            circle: [11, 10],
            "circle-dot": [5, 5],
            "rectangle-dot": [5, 6],
            doughnut: [8, 8]
        },
        popupAnchor: {
            marker: [0, -25],
            circle: [-3, -76],
            "circle-dot": [0, -2],
            "rectangle-dot": [0, -2],
            doughnut: [0, -2]
        },
        innerIconAnchor: {
            marker: [-2, 5],
            circle: [0, 2]
        },
        iconSize: {
            marker: [28, 28],
            circle: [22, 22],
            "circle-dot": [2, 2],
            "rectangle-dot": [2, 2],
            doughnut: [15, 15]
        }
    };
    L.BeautifyIcon = {
        Icon: L.Icon.extend({
            options: {
                icon: "leaf",
                iconSize: i.iconSize.circle,
                iconAnchor: i.iconAnchor.circle,
                iconShape: "circle",
                iconStyle: "",
                innerIconAnchor: [0, 3],
                innerIconStyle: "",
                isAlphaNumericIcon: !1,
                text: 1,
                borderColor: i.iconColor,
                borderWidth: 2,
                borderStyle: "solid",
                backgroundColor: "white",
                textColor: i.iconColor,
                customClasses: "",
                spin: !1,
                prefix: "fa",
                html: ""
            },
            initialize: function(n) {
                this.applyDefaults(n);
                this.options = !n || !n.html ? L.Util.setOptions(this, n) : n
            },
            applyDefaults: function(n) {
                n && (!n.iconSize && n.iconShape && (n.iconSize = i.iconSize[n.iconShape]), !n.iconAnchor && n.iconShape && (n.iconAnchor = i.iconAnchor[n.iconShape]), !n.popupAnchor && n.iconShape && (n.popupAnchor = i.popupAnchor[n.iconShape]), n.innerIconAnchor || (n.iconShape === "circle" || n.iconShape === "marker") && (n.iconShape === "circle" && n.isAlphaNumericIcon ? n.innerIconAnchor = [0, -1] : n.iconShape !== "marker" || n.isAlphaNumericIcon || (n.innerIconAnchor = i.innerIconAnchor[n.iconShape])))
            },
            createIcon: function() {
                var n = t.createElement("div"),
                    r = this.options,
                    i;
                return (n.innerHTML = r.html ? r.html : this.createIconInnerHtml(), this._setIconStyles(n), this.options.iconShape === "marker") ? (i = t.createElement("div"), i.className = "beautify-marker", i.appendChild(n), i) : n
            },
            createIconInnerHtml: function() {
                var n = this.options,
                    t, i;
                return n.iconShape === "circle-dot" || n.iconShape === "rectangle-dot" || n.iconShape === "doughnut" ? "" : (t = this.getInnerIconStyle(n), n.isAlphaNumericIcon) ? '<div style="' + t + '">' + n.text + "<\/div>" : (i = "", n.spin && (i = " fa-spin"), '<i class="' + n.prefix + " " + n.prefix + "-" + n.icon + i + '" style="' + t + '"><\/i>')
            },
            getInnerIconStyle: function(n) {
                var t = L.point(n.innerIconAnchor);
                return "color:" + n.textColor + ";margin-top:" + t.y + "px; margin-left:" + t.x + "px;" + n.innerIconStyle
            },
            _setIconStyles: function(n) {
                var t = this.options,
                    i = L.point(t.iconSize),
                    r = L.point(t.iconAnchor),
                    u;
                n.className = "beautify-marker ";
                t.iconShape && (n.className += t.iconShape);
                t.customClasses && (n.className += " " + t.customClasses);
                n.style.backgroundColor = t.backgroundColor;
                n.style.color = t.textColor;
                n.style.borderColor = t.borderColor;
                n.style.borderWidth = t.borderWidth + "px";
                n.style.borderStyle = t.borderStyle;
                i && (n.style.width = i.x + "px", n.style.height = i.y + "px");
                r && (n.style.marginLeft = -r.x + "px", n.style.marginTop = -r.y + "px");
                t.iconStyle && (u = n.getAttribute("style"), u += t.iconStyle, n.setAttribute("style", u))
            }
        })
    };
    L.BeautifyIcon.icon = function(n) {
        return new L.BeautifyIcon.Icon(n)
    }
}(this, document),
function(n, t, i) {
    L.MarkerClusterGroup = L.FeatureGroup.extend({
        options: {
            maxClusterRadius: 80,
            iconCreateFunction: null,
            spiderfyOnMaxZoom: !0,
            showCoverageOnHover: !0,
            zoomToBoundsOnClick: !0,
            singleMarkerMode: !1,
            disableClusteringAtZoom: null,
            removeOutsideVisibleBounds: !0,
            animate: !0,
            animateAddingMarkers: !1,
            spiderfyDistanceMultiplier: 1,
            spiderLegPolylineOptions: {
                weight: 1.5,
                color: "#222",
                opacity: .5
            },
            chunkedLoading: !1,
            chunkInterval: 200,
            chunkDelay: 50,
            chunkProgress: null,
            polygonOptions: {}
        },
        initialize: function(n) {
            L.Util.setOptions(this, n);
            this.options.iconCreateFunction || (this.options.iconCreateFunction = this._defaultIconCreateFunction);
            this._featureGroup = L.featureGroup();
            this._featureGroup.on(L.FeatureGroup.EVENTS, this._propagateEvent, this);
            this._nonPointGroup = L.featureGroup();
            this._nonPointGroup.on(L.FeatureGroup.EVENTS, this._propagateEvent, this);
            this._inZoomAnimation = 0;
            this._needsClustering = [];
            this._needsRemoving = [];
            this._currentShownBounds = null;
            this._queue = [];
            var t = L.DomUtil.TRANSITION && this.options.animate;
            L.extend(this, t ? this._withAnimation : this._noAnimation);
            this._markerCluster = t ? L.MarkerCluster : L.MarkerClusterNonAnimated
        },
        addLayer: function(n) {
            var i, r, t, u;
            if (n instanceof L.LayerGroup) {
                i = [];
                for (r in n._layers) i.push(n._layers[r]);
                return this.addLayers(i)
            }
            if (!n.getLatLng) return this._nonPointGroup.addLayer(n), this;
            if (!this._map) return this._needsClustering.push(n), this;
            if (this.hasLayer(n)) return this;
            if (this._unspiderfy && this._unspiderfy(), this._addLayer(n, this._maxZoom), this._topClusterLevel._recalculateBounds(), t = n, u = this._map.getZoom(), n.__parent) while (t.__parent._zoom >= u) t = t.__parent;
            return this._currentShownBounds.contains(t.getLatLng()) && (this.options.animateAddingMarkers ? this._animationAddLayer(n, t) : this._animationAddLayerNonAnimated(n, t)), this
        },
        removeLayer: function(n) {
            var t, i;
            if (n instanceof L.LayerGroup) {
                t = [];
                for (i in n._layers) t.push(n._layers[i]);
                return this.removeLayers(t)
            }
            return n.getLatLng ? this._map ? n.__parent ? (this._unspiderfy && (this._unspiderfy(), this._unspiderfyLayer(n)), this._removeLayer(n, !0), this._topClusterLevel._recalculateBounds(), this._featureGroup.hasLayer(n) && (this._featureGroup.removeLayer(n), n.clusterShow && n.clusterShow()), this) : this : (!this._arraySplice(this._needsClustering, n) && this.hasLayer(n) && this._needsRemoving.push(n), this) : (this._nonPointGroup.removeLayer(n), this)
        },
        addLayers: function(n) {
            var h = this._featureGroup,
                f = this._nonPointGroup,
                c = this.options.chunkedLoading,
                l = this.options.chunkInterval,
                e = this.options.chunkProgress,
                u, r, o, t;
            if (this._map) {
                var i = 0,
                    a = (new Date).getTime(),
                    s = L.bind(function() {
                        for (var v = (new Date).getTime(), u, r, o; i < n.length; i++) {
                            if (c && i % 200 == 0 && (u = (new Date).getTime() - v, u > l)) break;
                            if (t = n[i], !t.getLatLng) {
                                f.addLayer(t);
                                continue
                            }
                            this.hasLayer(t) || (this._addLayer(t, this._maxZoom), t.__parent && t.__parent.getChildCount() === 2 && (r = t.__parent.getAllChildMarkers(), o = r[0] === t ? r[1] : r[0], h.removeLayer(o)))
                        }
                        e && e(i, n.length, (new Date).getTime() - a);
                        i === n.length ? (this._topClusterLevel._recalculateBounds(), this._featureGroup.eachLayer(function(n) {
                            n instanceof L.MarkerCluster && n._iconNeedsUpdate && n._updateIcon()
                        }), this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds)) : setTimeout(s, this.options.chunkDelay)
                    }, this);
                s()
            } else {
                for (u = [], r = 0, o = n.length; r < o; r++) {
                    if (t = n[r], !t.getLatLng) {
                        f.addLayer(t);
                        continue
                    }
                    this.hasLayer(t) || u.push(t)
                }
                this._needsClustering = this._needsClustering.concat(u)
            }
            return this
        },
        removeLayers: function(n) {
            var i, r, t, u = this._featureGroup,
                f = this._nonPointGroup;
            if (!this._map) {
                for (i = 0, r = n.length; i < r; i++) t = n[i], this._arraySplice(this._needsClustering, t), f.removeLayer(t), this.hasLayer(t) && this._needsRemoving.push(t);
                return this
            }
            if (this._unspiderfy) for (this._unspiderfy(), i = 0, r = n.length; i < r; i++) t = n[i], this._unspiderfyLayer(t);
            for (i = 0, r = n.length; i < r; i++) {
                if (t = n[i], !t.__parent) {
                    f.removeLayer(t);
                    continue
                }
                this._removeLayer(t, !0, !0);
                u.hasLayer(t) && (u.removeLayer(t), t.clusterShow && t.clusterShow())
            }
            return this._topClusterLevel._recalculateBounds(), this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds), u.eachLayer(function(n) {
                n instanceof L.MarkerCluster && n._updateIcon()
            }), this
        },
        clearLayers: function() {
            return this._map || (this._needsClustering = [], delete this._gridClusters, delete this._gridUnclustered), this._noanimationUnspiderfy && this._noanimationUnspiderfy(), this._featureGroup.clearLayers(), this._nonPointGroup.clearLayers(), this.eachLayer(function(n) {
                delete n.__parent
            }), this._map && this._generateInitialClusters(), this
        },
        getBounds: function() {
            var n = new L.LatLngBounds,
                t;
            for (this._topClusterLevel && n.extend(this._topClusterLevel._bounds), t = this._needsClustering.length - 1; t >= 0; t--) n.extend(this._needsClustering[t].getLatLng());
            return n.extend(this._nonPointGroup.getBounds()), n
        },
        eachLayer: function(n, t) {
            var r = this._needsClustering.slice(),
                i;
            for (this._topClusterLevel && this._topClusterLevel.getAllChildMarkers(r), i = r.length - 1; i >= 0; i--) n.call(t, r[i]);
            this._nonPointGroup.eachLayer(n, t)
        },
        getLayers: function() {
            var n = [];
            return this.eachLayer(function(t) {
                n.push(t)
            }), n
        },
        getLayer: function(n) {
            var t = null;
            return n = parseInt(n, 10), this.eachLayer(function(i) {
                L.stamp(i) === n && (t = i)
            }), t
        },
        hasLayer: function(n) {
            if (!n) return !1;
            for (var i = this._needsClustering, t = i.length - 1; t >= 0; t--) if (i[t] === n) return !0;
            for (i = this._needsRemoving, t = i.length - 1; t >= 0; t--) if (i[t] === n) return !1;
            return !!(n.__parent && n.__parent._group === this) || this._nonPointGroup.hasLayer(n)
        },
        zoomToShowLayer: function(n, t) {
            var i, r;
            if (typeof t != "function" && (t = function() {}), i = function() {
                if ((n._icon || n.__parent._icon) && !this._inZoomAnimation) if (this._map.off("moveend", i, this), this.off("animationend", i, this), n._icon) t();
                else if (n.__parent._icon) {
                    this.once("spiderfied", t, this);
                    n.__parent.spiderfy()
                }
            }, n._icon && this._map.getBounds().contains(n.getLatLng())) t();
            else if (n.__parent._zoom < this._map.getZoom()) {
                this._map.on("moveend", i, this);
                this._map.panTo(n.getLatLng())
            } else {
                r = function() {
                    this._map.off("movestart", r, this);
                    r = null
                };
                this._map.on("movestart", r, this);
                this._map.on("moveend", i, this);
                this.on("animationend", i, this);
                n.__parent.zoomToBounds();
                r && i.call(this)
            }
        },
        onAdd: function(n) {
            this._map = n;
            var t, i, r;
            if (!isFinite(this._map.getMaxZoom())) throw "Map has no maxZoom specified";
            this._featureGroup.onAdd(n);
            this._nonPointGroup.onAdd(n);
            for (this._gridClusters || this._generateInitialClusters(), this._maxLat = n.options.crs.projection.MAX_LATITUDE, t = 0, i = this._needsRemoving.length; t < i; t++) r = this._needsRemoving[t], this._removeLayer(r, !0);
            this._needsRemoving = [];
            this._zoom = this._map.getZoom();
            this._currentShownBounds = this._getExpandedVisibleBounds();
            this._map.on("zoomend", this._zoomEnd, this);
            this._map.on("moveend", this._moveEnd, this);
            this._spiderfierOnAdd && this._spiderfierOnAdd();
            this._bindEvents();
            i = this._needsClustering;
            this._needsClustering = [];
            this.addLayers(i)
        },
        onRemove: function(n) {
            n.off("zoomend", this._zoomEnd, this);
            n.off("moveend", this._moveEnd, this);
            this._unbindEvents();
            this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", "");
            this._spiderfierOnRemove && this._spiderfierOnRemove();
            delete this._maxLat;
            this._hideCoverage();
            this._featureGroup.onRemove(n);
            this._nonPointGroup.onRemove(n);
            this._featureGroup.clearLayers();
            this._map = null
        },
        getVisibleParent: function(n) {
            for (var t = n; t && !t._icon;) t = t.__parent;
            return t || null
        },
        _arraySplice: function(n, t) {
            for (var i = n.length - 1; i >= 0; i--) if (n[i] === t) return n.splice(i, 1), !0
        },
        _removeFromGridUnclustered: function(n, t) {
            for (var i = this._map, r = this._gridUnclustered; t >= 0; t--) if (!r[t].removeObject(n, i.project(n.getLatLng(), t))) break
        },
        _removeLayer: function(n, t, i) {
            var s = this._gridClusters,
                h = this._gridUnclustered,
                f = this._featureGroup,
                e = this._map,
                r, o, u;
            for (t && this._removeFromGridUnclustered(n, this._maxZoom), r = n.__parent, o = r._markers, this._arraySplice(o, n); r;) {
                if (r._childCount--, r._boundsNeedUpdate = !0, r._zoom < 0) break;
                else t && r._childCount <= 1 ? (u = r._markers[0] === n ? r._markers[1] : r._markers[0], s[r._zoom].removeObject(r, e.project(r._cLatLng, r._zoom)), h[r._zoom].addObject(u, e.project(u.getLatLng(), r._zoom)), this._arraySplice(r.__parent._childClusters, r), r.__parent._markers.push(u), u.__parent = r.__parent, r._icon && (f.removeLayer(r), i || f.addLayer(u))) : i && r._icon || r._updateIcon();
                r = r.__parent
            }
            delete n.__parent
        },
        _isOrIsParent: function(n, t) {
            while (t) {
                if (n === t) return !0;
                t = t.parentNode
            }
            return !1
        },
        _propagateEvent: function(n) {
            if (n.layer instanceof L.MarkerCluster) {
                if (n.originalEvent && this._isOrIsParent(n.layer._icon, n.originalEvent.relatedTarget)) return;
                n.type = "cluster" + n.type
            }
            this.fire(n.type, n)
        },
        _defaultIconCreateFunction: function(n) {
            var t = n.getChildCount(),
                i = " marker-cluster-";
            return i += t < 10 ? "small" : t < 100 ? "medium" : "large", new L.DivIcon({
                html: "<div><span>" + t + "<\/span><\/div>",
                className: "marker-cluster" + i,
                iconSize: new L.Point(40, 40)
            })
        },
        _bindEvents: function() {
            var n = this._map,
                t = this.options.spiderfyOnMaxZoom,
                i = this.options.showCoverageOnHover,
                r = this.options.zoomToBoundsOnClick;
            if (t || r) this.on("clusterclick", this._zoomOrSpiderfy, this);
            if (i) {
                this.on("clustermouseover", this._showCoverage, this);
                this.on("clustermouseout", this._hideCoverage, this);
                n.on("zoomend", this._hideCoverage, this)
            }
        },
        _zoomOrSpiderfy: function(n) {
            for (var i = n.layer, t = i; t._childClusters.length === 1;) t = t._childClusters[0];
            t._zoom === this._maxZoom && t._childCount === i._childCount ? this.options.spiderfyOnMaxZoom && i.spiderfy() : this.options.zoomToBoundsOnClick && i.zoomToBounds();
            n.originalEvent && n.originalEvent.keyCode === 13 && this._map._container.focus()
        },
        _showCoverage: function(n) {
            var t = this._map;
            this._inZoomAnimation || (this._shownPolygon && t.removeLayer(this._shownPolygon), n.layer.getChildCount() > 2 && n.layer !== this._spiderfied && (this._shownPolygon = new L.Polygon(n.layer.getConvexHull(), this.options.polygonOptions), t.addLayer(this._shownPolygon)))
        },
        _hideCoverage: function() {
            this._shownPolygon && (this._map.removeLayer(this._shownPolygon), this._shownPolygon = null)
        },
        _unbindEvents: function() {
            var n = this.options.spiderfyOnMaxZoom,
                t = this.options.showCoverageOnHover,
                i = this.options.zoomToBoundsOnClick,
                r = this._map;
            (n || i) && this.off("clusterclick", this._zoomOrSpiderfy, this);
            t && (this.off("clustermouseover", this._showCoverage, this), this.off("clustermouseout", this._hideCoverage, this), r.off("zoomend", this._hideCoverage, this))
        },
        _zoomEnd: function() {
            this._map && (this._mergeSplitClusters(), this._zoom = this._map._zoom, this._currentShownBounds = this._getExpandedVisibleBounds())
        },
        _moveEnd: function() {
            if (!this._inZoomAnimation) {
                var n = this._getExpandedVisibleBounds();
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._zoom, n);
                this._topClusterLevel._recursivelyAddChildrenToMap(null, this._map._zoom, n);
                this._currentShownBounds = n;
                return
            }
        },
        _generateInitialClusters: function() {
            var t = this._map.getMaxZoom(),
                i = this.options.maxClusterRadius,
                r = i,
                n;
            for (typeof i != "function" && (r = function() {
                return i
            }), this.options.disableClusteringAtZoom && (t = this.options.disableClusteringAtZoom - 1), this._maxZoom = t, this._gridClusters = {}, this._gridUnclustered = {}, n = t; n >= 0; n--) this._gridClusters[n] = new L.DistanceGrid(r(n)), this._gridUnclustered[n] = new L.DistanceGrid(r(n));
            this._topClusterLevel = new this._markerCluster(this, -1)
        },
        _addLayer: function(n, t) {
            var s = this._gridClusters,
                h = this._gridUnclustered,
                e, r, i, o, u, f;
            for (this.options.singleMarkerMode && this._overrideMarkerIcon(n); t >= 0; t--) {
                if (e = this._map.project(n.getLatLng(), t), i = s[t].getNearObject(e), i) {
                    i._addChild(n);
                    n.__parent = i;
                    return
                }
                if (i = h[t].getNearObject(e), i) {
                    for (o = i.__parent, o && this._removeLayer(i, !1), u = new this._markerCluster(this, t, i, n), s[t].addObject(u, this._map.project(u._cLatLng, t)), i.__parent = u, n.__parent = u, f = u, r = t - 1; r > o._zoom; r--) f = new this._markerCluster(this, r, f), s[r].addObject(f, this._map.project(i.getLatLng(), r));
                    o._addChild(f);
                    this._removeFromGridUnclustered(i, t);
                    return
                }
                h[t].addObject(n, e)
            }
            this._topClusterLevel._addChild(n);
            n.__parent = this._topClusterLevel;
            return
        },
        _enqueue: function(n) {
            this._queue.push(n);
            this._queueTimeout || (this._queueTimeout = setTimeout(L.bind(this._processQueue, this), 300))
        },
        _processQueue: function() {
            for (var n = 0; n < this._queue.length; n++) this._queue[n].call(this);
            this._queue.length = 0;
            clearTimeout(this._queueTimeout);
            this._queueTimeout = null
        },
        _mergeSplitClusters: function() {
            this._processQueue();
            this._zoom < this._map._zoom && this._currentShownBounds.intersects(this._getExpandedVisibleBounds()) ? (this._animationStart(), this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, this._zoom, this._getExpandedVisibleBounds()), this._animationZoomIn(this._zoom, this._map._zoom)) : this._zoom > this._map._zoom ? (this._animationStart(), this._animationZoomOut(this._zoom, this._map._zoom)) : this._moveEnd()
        },
        _getExpandedVisibleBounds: function() {
            if (this.options.removeOutsideVisibleBounds) {
                if (L.Browser.mobile) return this._checkBoundsMaxLat(this._map.getBounds())
            } else return this._mapBoundsInfinite;
            return this._checkBoundsMaxLat(this._map.getBounds().pad(1))
        },
        _checkBoundsMaxLat: function(n) {
            var t = this._maxLat;
            return t !== i && (n.getNorth() >= t && (n._northEast.lat = Infinity), n.getSouth() <= -t && (n._southWest.lat = -Infinity)), n
        },
        _animationAddLayerNonAnimated: function(n, t) {
            if (t === n) this._featureGroup.addLayer(n);
            else if (t._childCount === 2) {
                t._addToMap();
                var i = t.getAllChildMarkers();
                this._featureGroup.removeLayer(i[0]);
                this._featureGroup.removeLayer(i[1])
            } else t._updateIcon()
        },
        _overrideMarkerIcon: function(n) {
            return n.options.icon = this.options.iconCreateFunction({
                getChildCount: function() {
                    return 1
                },
                getAllChildMarkers: function() {
                    return [n]
                }
            })
        }
    });
    L.MarkerClusterGroup.include({
        _mapBoundsInfinite: new L.LatLngBounds(new L.LatLng(-Infinity, -Infinity), new L.LatLng(Infinity, Infinity))
    });
    L.MarkerClusterGroup.include({
        _noAnimation: {
            _animationStart: function() {},
            _animationZoomIn: function(n, t) {
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, n);
                this._topClusterLevel._recursivelyAddChildrenToMap(null, t, this._getExpandedVisibleBounds());
                this.fire("animationend")
            },
            _animationZoomOut: function(n, t) {
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, n);
                this._topClusterLevel._recursivelyAddChildrenToMap(null, t, this._getExpandedVisibleBounds());
                this.fire("animationend")
            },
            _animationAddLayer: function(n, t) {
                this._animationAddLayerNonAnimated(n, t)
            }
        },
        _withAnimation: {
            _animationStart: function() {
                this._map._mapPane.className += " leaflet-cluster-anim";
                this._inZoomAnimation++
            },
            _animationZoomIn: function(n, t) {
                var i = this._getExpandedVisibleBounds(),
                    r = this._featureGroup,
                    u;
                this._topClusterLevel._recursively(i, n, 0, function(f) {
                    var e = f._latlng,
                        s = f._markers,
                        o;
                    for (i.contains(e) || (e = null), f._isSingleParent() && n + 1 === t ? (r.removeLayer(f), f._recursivelyAddChildrenToMap(null, t, i)) : (f.clusterHide(), f._recursivelyAddChildrenToMap(e, t, i)), u = s.length - 1; u >= 0; u--) o = s[u], i.contains(o._latlng) || r.removeLayer(o)
                });
                this._forceLayout();
                this._topClusterLevel._recursivelyBecomeVisible(i, t);
                r.eachLayer(function(n) {
                    n instanceof L.MarkerCluster || !n._icon || n.clusterShow()
                });
                this._topClusterLevel._recursively(i, n, t, function(n) {
                    n._recursivelyRestoreChildPositions(t)
                });
                this._enqueue(function() {
                    this._topClusterLevel._recursively(i, n, 0, function(n) {
                        r.removeLayer(n);
                        n.clusterShow()
                    });
                    this._animationEnd()
                })
            },
            _animationZoomOut: function(n, t) {
                this._animationZoomOutSingle(this._topClusterLevel, n - 1, t);
                this._topClusterLevel._recursivelyAddChildrenToMap(null, t, this._getExpandedVisibleBounds());
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, n, this._getExpandedVisibleBounds())
            },
            _animationAddLayer: function(n, t) {
                var i = this,
                    r = this._featureGroup;
                r.addLayer(n);
                t !== n && (t._childCount > 2 ? (t._updateIcon(), this._forceLayout(), this._animationStart(), n._setPos(this._map.latLngToLayerPoint(t.getLatLng())), n.clusterHide(), this._enqueue(function() {
                    r.removeLayer(n);
                    n.clusterShow();
                    i._animationEnd()
                })) : (this._forceLayout(), i._animationStart(), i._animationZoomOutSingle(t, this._map.getMaxZoom(), this._map.getZoom())))
            }
        },
        _animationZoomOutSingle: function(n, t, i) {
            var r = this._getExpandedVisibleBounds(),
                u;
            n._recursivelyAnimateChildrenInAndAddSelfToMap(r, t + 1, i);
            u = this;
            this._forceLayout();
            n._recursivelyBecomeVisible(r, i);
            this._enqueue(function() {
                if (n._childCount === 1) {
                    var f = n._markers[0];
                    f.setLatLng(f.getLatLng());
                    f.clusterShow && f.clusterShow()
                } else n._recursively(r, i, 0, function(n) {
                    n._recursivelyRemoveChildrenFromMap(r, t + 1)
                });
                u._animationEnd()
            })
        },
        _animationEnd: function() {
            this._map && (this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", ""));
            this._inZoomAnimation--;
            this.fire("animationend")
        },
        _forceLayout: function() {
            L.Util.falseFn(t.body.offsetWidth)
        }
    });
    L.markerClusterGroup = function(n) {
        return new L.MarkerClusterGroup(n)
    };
    L.MarkerCluster = L.Marker.extend({
        initialize: function(n, t, i, r) {
            L.Marker.prototype.initialize.call(this, i ? i._cLatLng || i.getLatLng() : new L.LatLng(0, 0), {
                icon: this
            });
            this._group = n;
            this._zoom = t;
            this._markers = [];
            this._childClusters = [];
            this._childCount = 0;
            this._iconNeedsUpdate = !0;
            this._boundsNeedUpdate = !0;
            this._bounds = new L.LatLngBounds;
            i && this._addChild(i);
            r && this._addChild(r)
        },
        getAllChildMarkers: function(n) {
            var t, i;
            for (n = n || [], t = this._childClusters.length - 1; t >= 0; t--) this._childClusters[t].getAllChildMarkers(n);
            for (i = this._markers.length - 1; i >= 0; i--) n.push(this._markers[i]);
            return n
        },
        getChildCount: function() {
            return this._childCount
        },
        zoomToBounds: function() {
            for (var n = this._childClusters.slice(), f = this._group._map, u = f.getBoundsZoom(this._bounds), t = this._zoom + 1, e = f.getZoom(), i, r; n.length > 0 && u > t;) {
                for (t++, r = [], i = 0; i < n.length; i++) r = r.concat(n[i]._childClusters);
                n = r
            }
            u > t ? this._group._map.setView(this._latlng, t) : u <= e ? this._group._map.setView(this._latlng, e + 1) : this._group._map.fitBounds(this._bounds)
        },
        getBounds: function() {
            var n = new L.LatLngBounds;
            return n.extend(this._bounds), n
        },
        _updateIcon: function() {
            this._iconNeedsUpdate = !0;
            this._icon && this.setIcon(this)
        },
        createIcon: function() {
            return this._iconNeedsUpdate && (this._iconObj = this._group.options.iconCreateFunction(this), this._iconNeedsUpdate = !1), this._iconObj.createIcon()
        },
        createShadow: function() {
            return this._iconObj.createShadow()
        },
        _addChild: function(n, t) {
            this._iconNeedsUpdate = !0;
            this._boundsNeedUpdate = !0;
            this._setClusterCenter(n);
            n instanceof L.MarkerCluster ? (t || (this._childClusters.push(n), n.__parent = this), this._childCount += n._childCount) : (t || this._markers.push(n), this._childCount++);
            this.__parent && this.__parent._addChild(n, !0)
        },
        _setClusterCenter: function(n) {
            this._cLatLng || (this._cLatLng = n._cLatLng || n._latlng)
        },
        _resetBounds: function() {
            var n = this._bounds;
            n._southWest && (n._southWest.lat = Infinity, n._southWest.lng = Infinity);
            n._northEast && (n._northEast.lat = -Infinity, n._northEast.lng = -Infinity)
        },
        _recalculateBounds: function() {
            var o = this._markers,
                s = this._childClusters,
                r = 0,
                u = 0,
                f = this._childCount,
                n, i, t, e;
            if (f !== 0) {
                for (this._resetBounds(), n = 0; n < o.length; n++) t = o[n]._latlng, this._bounds.extend(t), r += t.lat, u += t.lng;
                for (n = 0; n < s.length; n++) i = s[n], i._boundsNeedUpdate && i._recalculateBounds(), this._bounds.extend(i._bounds), t = i._wLatLng, e = i._childCount, r += t.lat * e, u += t.lng * e;
                this._latlng = this._wLatLng = new L.LatLng(r / f, u / f);
                this._boundsNeedUpdate = !1
            }
        },
        _addToMap: function(n) {
            n && (this._backupLatlng = this._latlng, this.setLatLng(n));
            this._group._featureGroup.addLayer(this)
        },
        _recursivelyAnimateChildrenIn: function(n, t, i) {
            this._recursively(n, 0, i - 1, function(n) {
                for (var u = n._markers, r, i = u.length - 1; i >= 0; i--) r = u[i], r._icon && (r._setPos(t), r.clusterHide())
            }, function(n) {
                for (var u = n._childClusters, r, i = u.length - 1; i >= 0; i--) r = u[i], r._icon && (r._setPos(t), r.clusterHide())
            })
        },
        _recursivelyAnimateChildrenInAndAddSelfToMap: function(n, t, i) {
            this._recursively(n, i, 0, function(r) {
                r._recursivelyAnimateChildrenIn(n, r._group._map.latLngToLayerPoint(r.getLatLng()).round(), t);
                r._isSingleParent() && t - 1 === i ? (r.clusterShow(), r._recursivelyRemoveChildrenFromMap(n, t)) : r.clusterHide();
                r._addToMap()
            })
        },
        _recursivelyBecomeVisible: function(n, t) {
            this._recursively(n, 0, t, null, function(n) {
                n.clusterShow()
            })
        },
        _recursivelyAddChildrenToMap: function(n, t, i) {
            this._recursively(i, -1, t, function(r) {
                var f, u;
                if (t !== r._zoom) for (f = r._markers.length - 1; f >= 0; f--)(u = r._markers[f], i.contains(u._latlng)) && (n && (u._backupLatlng = u.getLatLng(), u.setLatLng(n), u.clusterHide && u.clusterHide()), r._group._featureGroup.addLayer(u))
            }, function(t) {
                t._addToMap(n)
            })
        },
        _recursivelyRestoreChildPositions: function(n) {
            for (var t, r, u, i = this._markers.length - 1; i >= 0; i--) t = this._markers[i], t._backupLatlng && (t.setLatLng(t._backupLatlng), delete t._backupLatlng);
            if (n - 1 === this._zoom) for (r = this._childClusters.length - 1; r >= 0; r--) this._childClusters[r]._restorePosition();
            else for (u = this._childClusters.length - 1; u >= 0; u--) this._childClusters[u]._recursivelyRestoreChildPositions(n)
        },
        _restorePosition: function() {
            this._backupLatlng && (this.setLatLng(this._backupLatlng), delete this._backupLatlng)
        },
        _recursivelyRemoveChildrenFromMap: function(n, t, i) {
            var r, u;
            this._recursively(n, -1, t - 1, function(n) {
                for (u = n._markers.length - 1; u >= 0; u--) r = n._markers[u], i && i.contains(r._latlng) || (n._group._featureGroup.removeLayer(r), r.clusterShow && r.clusterShow())
            }, function(n) {
                for (u = n._childClusters.length - 1; u >= 0; u--) r = n._childClusters[u], i && i.contains(r._latlng) || (n._group._featureGroup.removeLayer(r), r.clusterShow && r.clusterShow())
            })
        },
        _recursively: function(n, t, i, r, u) {
            var o = this._childClusters,
                s = this._zoom,
                f, e;
            if (t > s) for (f = o.length - 1; f >= 0; f--) e = o[f], n.intersects(e._bounds) && e._recursively(n, t, i, r, u);
            else if (r && r(this), u && this._zoom === i && u(this), i > s) for (f = o.length - 1; f >= 0; f--) e = o[f], n.intersects(e._bounds) && e._recursively(n, t, i, r, u)
        },
        _isSingleParent: function() {
            return this._childClusters.length > 0 && this._childClusters[0]._childCount === this._childCount
        }
    });
    L.Marker.include({
        clusterHide: function() {
            return this.options.opacityWhenUnclustered = this.options.opacity || 1, this.setOpacity(0)
        },
        clusterShow: function() {
            var n = this.setOpacity(this.options.opacity || this.options.opacityWhenUnclustered);
            return delete this.options.opacityWhenUnclustered, n
        }
    });
    L.DistanceGrid = function(n) {
        this._cellSize = n;
        this._sqCellSize = n * n;
        this._grid = {};
        this._objectPoint = {}
    };
    L.DistanceGrid.prototype = {
        addObject: function(n, t) {
            var i = this._getCoord(t.x),
                r = this._getCoord(t.y),
                u = this._grid,
                f = u[r] = u[r] || {}, e = f[i] = f[i] || [],
                o = L.Util.stamp(n);
            this._objectPoint[o] = t;
            e.push(n)
        },
        updateObject: function(n, t) {
            this.removeObject(n);
            this.addObject(n, t)
        },
        removeObject: function(n, t) {
            var r = this._getCoord(t.x),
                o = this._getCoord(t.y),
                s = this._grid,
                u = s[o] = s[o] || {}, f = u[r] = u[r] || [],
                i, e;
            for (delete this._objectPoint[L.Util.stamp(n)], i = 0, e = f.length; i < e; i++) if (f[i] === n) return f.splice(i, 1), e === 1 && delete u[r], !0
        },
        eachObject: function(n, t) {
            var e, o, i, r, u, f, s, h = this._grid;
            for (e in h) {
                u = h[e];
                for (o in u) for (f = u[o], i = 0, r = f.length; i < r; i++) s = n.call(t, f[i]), s && (i--, r--)
            }
        },
        getNearObject: function(n) {
            for (var s = this._getCoord(n.x), h = this._getCoord(n.y), i, r, f, u, c, e, o, v = this._objectPoint, l = this._sqCellSize, a = null, t = h - 1; t <= h + 1; t++) if (f = this._grid[t], f) for (i = s - 1; i <= s + 1; i++) if (u = f[i], u) for (r = 0, c = u.length; r < c; r++) e = u[r], o = this._sqDist(v[L.Util.stamp(e)], n), o < l && (l = o, a = e);
            return a
        },
        _getCoord: function(n) {
            return Math.floor(n / this._cellSize)
        },
        _sqDist: function(n, t) {
            var i = t.x - n.x,
                r = t.y - n.y;
            return i * i + r * r
        }
    },
    function() {
        L.QuickHull = {
            getDistant: function(n, t) {
                var i = t[1].lat - t[0].lat,
                    r = t[0].lng - t[1].lng;
                return r * (n.lat - t[0].lat) + i * (n.lng - t[0].lng)
            },
            findMostDistantPointFromBaseLine: function(n, t) {
                for (var f = 0, e = null, o = [], r, u, i = t.length - 1; i >= 0; i--) {
                    if (r = t[i], u = this.getDistant(r, n), u > 0) o.push(r);
                    else continue;
                    u > f && (f = u, e = r)
                }
                return {
                    maxPoint: e,
                    newPoints: o
                }
            },
            buildConvexHull: function(n, t) {
                var r = [],
                    i = this.findMostDistantPointFromBaseLine(n, t);
                return i.maxPoint ? (r = r.concat(this.buildConvexHull([n[0], i.maxPoint], i.newPoints)), r.concat(this.buildConvexHull([i.maxPoint, n[1]], i.newPoints))) : [n[0]]
            },
            getConvexHull: function(n) {
                for (var i = !1, r = !1, o = !1, s = !1, h = null, c = null, l = null, a = null, u = null, f = null, t, e = n.length - 1; e >= 0; e--) t = n[e], (i === !1 || t.lat > i) && (h = t, i = t.lat), (r === !1 || t.lat < r) && (c = t, r = t.lat), (o === !1 || t.lng > o) && (l = t, o = t.lng), (s === !1 || t.lng < s) && (a = t, s = t.lng);
                return r !== i ? (f = c, u = h) : (f = a, u = l), [].concat(this.buildConvexHull([f, u], n), this.buildConvexHull([u, f], n))
            }
        }
    }();
    L.MarkerCluster.include({
        getConvexHull: function() {
            for (var t = this.getAllChildMarkers(), i = [], r, n = t.length - 1; n >= 0; n--) r = t[n].getLatLng(), i.push(r);
            return L.QuickHull.getConvexHull(i)
        }
    });
    L.MarkerCluster.include({
        _2PI: Math.PI * 2,
        _circleFootSeparation: 25,
        _circleStartAngle: Math.PI / 6,
        _spiralFootSeparation: 28,
        _spiralLengthStart: 11,
        _spiralLengthFactor: 5,
        _circleSpiralSwitchover: 9,
        spiderfy: function() {
            if (this._group._spiderfied !== this && !this._group._inZoomAnimation) {
                var n = this.getAllChildMarkers(),
                    r = this._group,
                    u = r._map,
                    t = u.latLngToLayerPoint(this._latlng),
                    i;
                this._group._unspiderfy();
                this._group._spiderfied = this;
                n.length >= this._circleSpiralSwitchover ? i = this._generatePointsSpiral(n.length, t) : (t.y += 10, i = this._generatePointsCircle(n.length, t));
                this._animationSpiderfy(n, i)
            }
        },
        unspiderfy: function(n) {
            this._group._inZoomAnimation || (this._animationUnspiderfy(n), this._group._spiderfied = null)
        },
        _generatePointsCircle: function(n, t) {
            var h = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + n),
                u = h / this._2PI,
                c = this._2PI / n,
                f = [],
                i, r, e, o, s;
            for (f.length = n, e = null, i = n - 1; i >= 0; i--) r = this._circleStartAngle + i * c, e ? (o = t.x + u * Math.cos(r), s = t.y + u * Math.sin(r), f[i] = new L.Point(o, s)._round()) : f[i] = new L.Point(t.x + u * Math.cos(r), t.y + u * Math.sin(r))._round();
            return f
        },
        _generatePointsSpiral: function(n, t) {
            var f = this._group.options.spiderfyDistanceMultiplier,
                r = f * this._spiralLengthStart,
                o = f * this._spiralFootSeparation,
                s = f * this._spiralLengthFactor * this._2PI,
                u = 0,
                e = [],
                i;
            for (e.length = n, i = n - 1; i >= 0; i--) u += o / r + i * .0005, e[i] = new L.Point(t.x + r * Math.cos(u), t.y + r * Math.sin(u))._round(), r += s / u;
            return e
        },
        _noanimationUnspiderfy: function() {
            var t = this._group,
                u = t._map,
                f = t._featureGroup,
                r = this.getAllChildMarkers(),
                n, i;
            for (this.setOpacity(1), i = r.length - 1; i >= 0; i--) n = r[i], f.removeLayer(n), n._preSpiderfyLatlng && (n.setLatLng(n._preSpiderfyLatlng), delete n._preSpiderfyLatlng), n.setZIndexOffset && n.setZIndexOffset(0), n._spiderLeg && (u.removeLayer(n._spiderLeg), delete n._spiderLeg);
            t.fire("unspiderfied", {
                cluster: this,
                markers: r
            });
            t._spiderfied = null
        }
    });
    L.MarkerClusterNonAnimated = L.MarkerCluster.extend({
        _animationSpiderfy: function(n, t) {
            for (var u = this._group, o = u._map, s = u._featureGroup, h = this._group.options.spiderLegPolylineOptions, i, f, e, r = 0; r < n.length; r++) e = o.layerPointToLatLng(t[r]), i = n[r], f = new L.Polyline([this._latlng, e], h), o.addLayer(f), i._spiderLeg = f, i._preSpiderfyLatlng = i._latlng, i.setLatLng(e), i.setZIndexOffset && i.setZIndexOffset(1e6), s.addLayer(i);
            this.setOpacity(.3);
            u.fire("spiderfied", {
                cluster: this,
                markers: n
            })
        },
        _animationUnspiderfy: function() {
            this._noanimationUnspiderfy()
        }
    });
    L.MarkerCluster.include({
        _animationSpiderfy: function(n, t) {
            var p = this,
                e = this._group,
                h = e._map,
                w = e._featureGroup,
                y = this._latlng,
                b = h.latLngToLayerPoint(y),
                a = L.Path.SVG,
                o = L.extend({}, this._group.options.spiderLegPolylineOptions),
                c = o.opacity,
                u, r, f, s, v, l;
            for (c === i && (c = L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity), a ? (o.opacity = 0, o.className = (o.className || "") + " leaflet-cluster-spider-leg") : o.opacity = c, u = 0; u < n.length; u++) r = n[u], l = h.layerPointToLatLng(t[u]), f = new L.Polyline([y, l], o), h.addLayer(f), r._spiderLeg = f, a && (s = f._path, v = s.getTotalLength() + .1, s.style.strokeDasharray = v, s.style.strokeDashoffset = v), r.setZIndexOffset && r.setZIndexOffset(1e6), r.clusterHide && r.clusterHide(), w.addLayer(r), r._setPos && r._setPos(b);
            for (e._forceLayout(), e._animationStart(), u = n.length - 1; u >= 0; u--) l = h.layerPointToLatLng(t[u]), r = n[u], r._preSpiderfyLatlng = r._latlng, r.setLatLng(l), r.clusterShow && r.clusterShow(), a && (f = r._spiderLeg, s = f._path, s.style.strokeDashoffset = 0, f.setStyle({
                opacity: c
            }));
            this.setOpacity(.3);
            setTimeout(function() {
                e._animationEnd();
                e.fire("spiderfied", {
                    cluster: p,
                    markers: n
                })
            }, 200)
        },
        _animationUnspiderfy: function(n) {
            var l = this,
                u = this._group,
                e = u._map,
                h = u._featureGroup,
                a = n ? e._latLngToNewLayerPoint(this._latlng, n.zoom, n.center) : e.latLngToLayerPoint(this._latlng),
                r = this.getAllChildMarkers(),
                v = L.Path.SVG,
                t, i, o, s, c, f;
            for (u._animationStart(), this.setOpacity(1), i = r.length - 1; i >= 0; i--)(t = r[i], t._preSpiderfyLatlng) && (t.setLatLng(t._preSpiderfyLatlng), delete t._preSpiderfyLatlng, f = !0, t._setPos && (t._setPos(a), f = !1), t.clusterHide && (t.clusterHide(), f = !1), f && h.removeLayer(t), v && (o = t._spiderLeg, s = o._path, c = s.getTotalLength() + .1, s.style.strokeDashoffset = c, o.setStyle({
                opacity: 0
            })));
            setTimeout(function() {
                var n = 0;
                for (i = r.length - 1; i >= 0; i--) t = r[i], t._spiderLeg && n++;
                for (i = r.length - 1; i >= 0; i--)(t = r[i], t._spiderLeg) && (t.clusterShow && t.clusterShow(), t.setZIndexOffset && t.setZIndexOffset(0), n > 1 && h.removeLayer(t), e.removeLayer(t._spiderLeg), delete t._spiderLeg);
                u._animationEnd();
                u.fire("unspiderfied", {
                    cluster: l,
                    markers: r
                })
            }, 200)
        }
    });
    L.MarkerClusterGroup.include({
        _spiderfied: null,
        _spiderfierOnAdd: function() {
            this._map.on("click", this._unspiderfyWrapper, this);
            if (this._map.options.zoomAnimation) this._map.on("zoomstart", this._unspiderfyZoomStart, this);
            this._map.on("zoomend", this._noanimationUnspiderfy, this)
        },
        _spiderfierOnRemove: function() {
            this._map.off("click", this._unspiderfyWrapper, this);
            this._map.off("zoomstart", this._unspiderfyZoomStart, this);
            this._map.off("zoomanim", this._unspiderfyZoomAnim, this);
            this._map.off("zoomend", this._noanimationUnspiderfy, this);
            this._noanimationUnspiderfy()
        },
        _unspiderfyZoomStart: function() {
            if (this._map) this._map.on("zoomanim", this._unspiderfyZoomAnim, this)
        },
        _unspiderfyZoomAnim: function(n) {
            L.DomUtil.hasClass(this._map._mapPane, "leaflet-touching") || (this._map.off("zoomanim", this._unspiderfyZoomAnim, this), this._unspiderfy(n))
        },
        _unspiderfyWrapper: function() {
            this._unspiderfy()
        },
        _unspiderfy: function(n) {
            this._spiderfied && this._spiderfied.unspiderfy(n)
        },
        _noanimationUnspiderfy: function() {
            this._spiderfied && this._spiderfied._noanimationUnspiderfy()
        },
        _unspiderfyLayer: function(n) {
            n._spiderLeg && (this._featureGroup.removeLayer(n), n.clusterShow && n.clusterShow(), n.setZIndexOffset && n.setZIndexOffset(0), this._map.removeLayer(n._spiderLeg), delete n._spiderLeg)
        }
    });
    L.MarkerClusterGroup.include({
        refreshClusters: function(n) {
            return n ? n instanceof L.MarkerClusterGroup ? n = n._topClusterLevel.getAllChildMarkers() : n instanceof L.LayerGroup ? n = n._layers : n instanceof L.MarkerCluster ? n = n.getAllChildMarkers() : n instanceof L.Marker && (n = [n]) : n = this._topClusterLevel.getAllChildMarkers(), this._flagParentsIconsNeedUpdate(n), this._refreshClustersIcons(), this.options.singleMarkerMode && this._refreshSingleMarkerModeMarkers(n), this
        },
        _flagParentsIconsNeedUpdate: function(n) {
            var i, t;
            for (i in n) for (t = n[i].__parent; t;) t._iconNeedsUpdate = !0, t = t.__parent
        },
        _refreshClustersIcons: function() {
            this._featureGroup.eachLayer(function(n) {
                n instanceof L.MarkerCluster && n._iconNeedsUpdate && n._updateIcon()
            })
        },
        _refreshSingleMarkerModeMarkers: function(n) {
            var i, t;
            for (i in n) t = n[i], this.hasLayer(t) && t.setIcon(this._overrideMarkerIcon(t))
        }
    });
    L.Marker.include({
        refreshIconOptions: function(n, t) {
            var i = this.options.icon;
            return L.setOptions(i, n), this.setIcon(i), t && this.__parent && this.__parent._group.refreshClusters(this), this
        }
    })
}(window, document);
$(document).ready(function() {
    $("#googleMap").length > 0 && loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyCKc448sNyqNBwZuYhOn2YQrPFho2bYBGc&libraries=places&callback=myMap", $("#googleMap"));
    $("#eventmaps").length > 0 && loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyCKc448sNyqNBwZuYhOn2YQrPFho2bYBGc&libraries=places&callback=myEventMap", $("#eventmaps"))
});
document.addEventListener("DOMContentLoaded", function() {
    var n = null,
        t = $(window).width() < 767,
        r = function(n) {
            var i = "dayGridMonth";
            return n.indexOf("month") >= 0 ? i = "dayGridMonth" : n.indexOf("week") >= 0 ? i = t ? "dayGridWeek" : "timeGridWeek" : n.indexOf("day") >= 0 && (i = "timeGridDay"), i
        }, u = function(i, u) {
            var o = r(u),
                e;
            (t, e = document.getElementById("calendar"), e) && (n = new FCalendar570.Calendar(e, {
                headerToolbar: {
                    left: "prev",
                    center: "title",
                    right: "next"
                },
                footerToolbar: {
                    left: "customPrevButton",
                    right: "customNextButton"
                },
                customButtons: {
                    customPrevButton: {
                        text: "Previous " + u,
                        click: function() {
                            n.prev()
                        }
                    },
                    customNextButton: {
                        text: "Next " + u,
                        click: function() {
                            n.next()
                        }
                    }
                },
                slotMinTime: "00:00:00",
                slotMaxTime: "23:59:00",
                fixedWeekCount: !1,
                dayHeaderFormat: {
                    weekday: t ? "narrow" : "long"
                },
                slotLabelInterval: "01:00",
                slotDuration: "01:00",
                dayCellClassNames: "day-cell-custom",
                slotLaneClassNames: "slot-lane-custom",
                contentHeight: "auto",
                dateClick: function(n) {
                    jQuery(window).width() < 768 && ($(".fcalendar-570 td").removeClass("user-selected-date"), $(n.dayEl).addClass("user-selected-date"), f(n.date))
                },
                dayClick: function(n) {
                    jQuery(window).width() < 768 && f(n)
                },
                eventClick: function(n) {
                    console.log("Event: ", n.event);
                    n.event._def.extendedProps.detailsUrl && (location.href = n.event._def.extendedProps.detailsUrl)
                },
                initialDate: new Date,
                editable: !0,
                navLinks: !0,
                dayMaxEvents: !0,
                events: i,
                loading: function(n) {
                    document.getElementById("loading").style.display = n ? "block" : "none"
                }
            }), n.changeView(o), n.render())
        }, e = function(t) {
            var i = r(t);
            n && (n.setOption("customButtons", {
                customPrevButton: {
                    text: "Previous " + t,
                    click: function() {
                        n.prev()
                    }
                },
                customNextButton: {
                    text: "Next " + t,
                    click: function() {
                        n.next()
                    }
                }
            }), n.changeView(i), n.render())
        }, o = function(n, t) {
            $.getJSON(n, function(n) {
                console.log("success", n);
                u(n, t)
            }).done(function() {
                console.log("Events fetch success")
            }).fail(function() {
                console.log("Events fetch error")
            })
        }, f = function(t) {
            var r = n.getEvents().filter(function(n) {
                if (n.end == null || n.start == null) {
                    if (n.end == null) return n.start.toDateString() == t.toDateString();
                    if (n.start == null) return n.end.toDateString() == t.toDateString()
                }
                return n.end != null && n.start != null && new Date(n.start.toDateString()) <= new Date(t.toDateString()) && new Date(n.end.toDateString()) >= new Date(t.toDateString())
            }),
                f, e, u, o;
            if (calendertest = n.getEvents(), calendertestdate = t, r.length > 0) for ($(".calendarMobileView").length > 0 ? $(".calendarMobileView ul li").remove() : (f = '<div class="calendarMobileView col-12"><div class="classes-events-listing"><ul><\/ul><\/div><\/div>', $(f).insertAfter($(".medstar-fc.fcalendar-570"))), e = t.toLocaleString("en-us", {
                month: "long"
            }) + " " + t.getDate() + ", " + t.getFullYear(), i = 0; i < r.length; i++) u = "", r[i].start != undefined && (u = '<div class="user-selected-event-date"><span class="selectedTitleDate">' + r[i].start.toLocaleString("en-us", {
                month: "long"
            }) + " " + r[i].start.getDate() + '<\/span><span class="selectedTitleTime">' + r[i].start.toLocaleTimeString("en-us", {
                hour: "2-digit",
                minute: "2-digit"
            }) + "<\/span><\/div>"), o = "<li>" + u + '<div class="field-image"><img src="' + r[i]._def.extendedProps.imageUrl + '"><\/div><div class="field-title"><a href="' + r[i]._def.extendedProps.detailsUrl + '">' + r[i]._def.title + '<\/a><\/div><div class="field-content-section"><div><a>' + e + '<\/a><\/div><\/div><div class="right-side-panel"><div><div class="cost">' + (r[i]._def.extendedProps.IsEventPaid != undefined ? r[i]._def.extendedProps.IsEventPaid : "") + '<\/div><div class="virtual">' + (r[i]._def.extendedProps.eventMode != undefined ? r[i]._def.extendedProps.eventMode : "") + "<\/div><\/div><\/div><\/li>", $(o).appendTo($(".calendarMobileView ul"));
            else $(".calendarMobileView ul li").remove()
        };
    window.renderCalendar = u;
    window.renderCalendarAjax = o;
    window.changeCalendarView = e
});
document.addEventListener("DOMContentLoaded", function() {
    var t = 0,
        i = ` < svg xmlns = "http://www.w3.org/2000/svg"
    width = "47.502"
    height = "65"
    viewBox = "0 0 47.502 65" > < g id = "Group_15162"
    data - name = "Group 15162"
    transform = "translate(-34.692 -32)" > < path id = "Path_12013"
    data - name = "Path 12013"
    d = "M58.443,97a1.253,1.253,0,0,1-1-.5c-.926-1.238-22.75-30.469-22.75-42.416C34.692,41.7,45.125,32,58.443,32c12.431,0,23.751,10.527,23.751,22.084,0,11.947-21.824,41.178-22.75,42.416A1.253,1.253,0,0,1,58.443,97Z"
    transform = "translate(0 0)"
    fill = "#00306c" / > < path id = "Path_12014"
    data - name = "Path 12014"
    d = "M56.712,32.769c-11.915,0-21.25,8.6-21.25,19.585,0,9.747,16.917,33.606,21.25,39.557,4.332-5.951,21.25-29.814,21.25-39.557C77.961,41.145,66.742,32.769,56.712,32.769Z"
    transform = "translate(1.731 1.729)"
    fill = "#00306c" / > < ellipse id = "Ellipse_306"
    data - name = "Ellipse 306"
    cx = "15.629"
    cy = "15.618"
    rx = "15.629"
    ry = "15.618"
    transform = "translate(42.814 40.121)"
    fill = "#fff" / > < ellipse id = "Ellipse_307"
    data - name = "Ellipse 307"
    cx = "13.13"
    cy = "13.119"
    rx = "13.13"
    ry = "13.119"
    transform = "translate(45.313 42.628)"
    fill = "#002664" / > < path id = "Path_12015"
    data - name = "Path 12015"
    d = "M55.743,38.251A1.249,1.249,0,0,0,54.492,37H40.751a1.249,1.249,0,1,0,0,2.5H54.492A1.248,1.248,0,0,0,55.743,38.251Z"
    transform = "translate(10.822 11.25)"
    fill = "#fff" / > < path id = "Path_12016"
    data - name = "Path 12016"
    d = "M55.743,40.174a1.249,1.249,0,0,0-1.251-1.251H40.751a1.249,1.249,0,1,0,0,2.5H54.492A1.248,1.248,0,0,0,55.743,40.174Z"
    transform = "translate(10.822 15.577)"
    fill = "#fff" / > < path id = "Path_12017"
    data - name = "Path 12017"
    d = "M55.743,42.1a1.249,1.249,0,0,0-1.251-1.251H40.751a1.249,1.249,0,1,0,0,2.5H54.492A1.248,1.248,0,0,0,55.743,42.1Z"
    transform = "translate(10.822 19.904)"
    fill = "#fff" / > < /g>
                </svg > `, f = "data:image/svg+xml;base64," + btoa(i), r = function(n) {
        var r = $(window).width() < 576 && $(window).width() < $(window).height(),
            u = r ? 1.0408 : .46624,
            f = Math.round($("#" + n).width()),
            i = Math.round(f * u);
        $("#" + n).css("height", i + "px");
        t = i;
        $("#" + n).show();
        $("#" + n).removeAttr("tabindex")
    }, e = function(n, t) {
        for (var h, u, f = {}, e = 0; n && n.length > 0 && e < n.length; e++) {
            var i = n[e],
                o = i.location.lat,
                s = i.location.lng,
                r = {
                    lat: o,
                    lng: s,
                    institution: i.articles[0].fields[0].institution_name,
                    journal: i.articles[0].fields[0].journal_name,
                    leadAuthor: i.articles[0].fields[0].lead_author ? i.articles[0].fields[0].lead_author.name : null,
                    postTitle: i.articles[0].post_title,
                    postUrl: i.articles[0].post_url,
                    address: i.location.address
                };
            try {
                r.journal || (r.journal = i.articles[0].fields[1].journal_name);
                r.leadAuthor || (r.leadAuthor = i.articles[0].fields[2].lead_author ? i.articles[0].fields[2].lead_author.name : "")
            } catch (c) {}
            o && !isNaN(o) && s && !isNaN(s) && r && (t ? (u = "k" + o + s, f.hasOwnProperty(u) ? (h = f[u], h.push(r), f[u] = h) : f[u] = [r]) : (u = "k" + e, f[u] = [r]))
        }
        return f
    }, o = function(n, i) {
        for (var r, f, o, s, e = ``, u = 0; u < i.length; u++) r = i[u], u > 0 && (e += ` < hr > `), e += ` < header class = "map__post_header" > < span class = "map__post_location" > $ {
            r.address
        } < /span>
      </header >

        < header class = "map__post_article_header" > < div class = "map__post_institution" > $ {
            r.institution
        } < /div>
          <div class="map__post_source">
              <div class="map__post_journal">${r.journal}</div > < div class = "map__post_date" > < /div>
          </div > < /header>
      <article class="map__post_article">
          <div class="map__post_title">
              <a class="map__post_link" href="${r.postUrl}">
                  ${r.postTitle}
              </a > < /div>
          <div class="map__post_author">${r.leadAuthor}</div > < /article>`;f=Math.round($(window).width()*.7);o=Math.round(t*.7);f>500&&(f=500);s={maxWidth:""+f,maxHeight:""+o,className:"leaflet-popup-medstar-custom"};n.bindPopup(e,s)},n=function(n,t,u,s){var y=$(window).width()<576,p=(new Date).getTime(),l;r(n);$(window).resize(function(){var t=(new Date).getTime();t-p>1e3&&r(n)});var c=y?1:2,w=L.layerGroup(),b={isAlphaNumericIcon:!0,borderColor:"#085ea2",textColor:"#ffffff",backgroundColor:"#085ea2",innerIconStyle:"margin-top:5;border-radius:30px;",text:"",iconSize:s?[25,25]:[15,15]},k={iconUrl:f,iconSize:s?[25,25]:[25,25],className:"pin-icon-custom"},nt=L.BeautifyIcon.icon(b),d=L.icon(k),g=function(){for(var n,t,f=L.markerClusterGroup({spiderfyOnMaxZoom:!0,showCoverageOnHover:!1,clusterPane:L.Marker.prototype.options.pane,spiderfyDistanceMultiplier:1.3,zoomToBoundsOnClick:!0,maxClusterRadius:.01,removeOutsideVisibleBounds:!0,singleMarkerMode:!1,spiderLegPolylineOptions:{weight:1.2,color:"#71a1c8",opacity:.8},chunkedLoading:!1,chunkInterval:200,chunkDelay:50,chunkProgress:null,polygonOptions:{},iconCreateFunction:function(){return L.divIcon({html:i,className:"cluster-icon-custom"})}}),c=e(u,!s),l=Object.keys(c),r=0;r<l.length;r++)n=c[l[r]],t=L.marker([n[0].lat,n[0].lng],{icon:d,draggable:!1}),o(t,n),s?f.addLayer(t):t.addTo(h);s&&h.addLayer(f)},a=L.tileLayer(t,{attribution:"",maxZoom:9,minZoom:c,noWrap:!0}),h=L.map(n,{center:[0,0],zoom:c,layers:[a,w]}),v=L.latLngBounds(L.latLng(-170,-270),L.latLng(170,270));s?h.setMaxBounds(v):h.setMaxBounds(L.latLngBounds(L.latLng(-180,-360),L.latLng(180,360)));h.fitBounds(v,{padding:[300,300]});h.setZoom(c);l=!1;a.on("load",function(){l||(g(),l=!0)});h.on("popupopen",function(n){var i=n.popup._source,t;n.popup._content.length>1300&&h.getZoom()<2&&!s&&(t=n.popup._latlng,console.log(t.lat+45),setTimeout(()=>{h.setView(L.latLng(t.lat+45,t.lng),h.getZoom()+1)},200))});return setTimeout(()=>{h.setZoom(c),$("#"+n).show()},500),$(".leaflet-control-attribution").hide(),h},u=function(t,i,r,u){$.getJSON(r,function(r){n(t,i,r.markers,u)}).fail(function(){console.error("Failed to load Map data from dataUrl- "+r)}).always(function(){})};window.renderMedstarMap=n;window.renderMedstarMapFromUrl=u;$("[medstarmap]").each(function(){var r=$(this).attr("id");try{var i=$(this).attr("medstarmap"),f=$(this).attr("clustering")=="true"?!0:!1,t=$(this).attr("assetUrl");t&&t.length<=0&&console.error("Asset url is not given.");i&&i.length>0?u(r,t,i,f):(console.error("Map data url is not given."),n(r,t,[],f))}catch(e){}})});defaultTitleNews="";$(document).ready(function(){$("a.categories-dropdown").click(function(){var i=$(this).attr("href"),t,n,r,u;i&&(t=$(this).text(),n=i.replaceAll("{sitesearchtags}",t),$(".field-hero-title span").text(t),n=n.replaceAll("{hospitals}",""),r=$("a.hospital-dropdown-first").text(),$(".category-browse-news button").text(r),u=window.location.origin,n=n.replaceAll("{PageUrl}",u),$(this).attr("href",n),newsPagePostAnchorTagClick(n))});$("a.medstar-google-translate").click(function(){var n="https:/ / translate.google.com / translate ? hl = & sl = auto & tl = es & u = "+window.location.href;$(this).attr("
        href ",n);newsPagePostAnchorTagClick(newLink)});$(".search - results ").on("
        click ",".category - tag - filter ",function(){var n=$(this).attr("
        href "),t,i;n&&(t=$(this).text(),$(".field - hero - title span ").text(t),$(".categories - dropdown - new button ").text(t),i=$("
        a.hospital - dropdown - first ").text(),$(".category - browse - news button ").text(i),$(this).attr("
        href ",n),newsPagePostAnchorTagClick(n))});if($("
        a.category - tag - filter ").click(function(){var i=$(this).attr("
        href "),t,n,r,u;i&&(t=$(this).text(),n=i.replaceAll(" {
            sitesearchtags
        }
        ",t),$(".field - hero - title span ").text(t),n=n.replaceAll(" {
            hospitals
        }
        ","
        "),r=$("
        a.hospital - dropdown - first ").text(),$(".category - browse - news button ").text(r),u=window.location.origin,n=n.replaceAll(" {
            PageUrl
        }
        ",u),$(this).attr("
        href ",n),newsPagePostAnchorTagClick(n))}),$("
        a.categories - dropdown - generic ").click(function(){var t=$(this).attr("
        href ");if(t){var i=$(this).text(),n=t.replaceAll(" {
            sitesearchtags
        }
        ",i),r=window.location.href.split("
        # q = ")[0];n=n.replaceAll(" {
            PageUrl
        }
        ",r);$(this).attr("
        href ",n);newsPagePostAnchorTagClick(n)}}),$("
        a.hospitals - dropdown ").click(function(){var i=$(this).attr("
        href "),t,n,r,u;i&&(t=$(this).text(),n=i.replaceAll(" {
            hospitals
        }
        ",t),$(".field - hero - title span ").text(t),r=$("
        a.categories - dropdown - first ").text(),$(".categories - dropdown - new button ").text(r),n=n.replaceAll(" {
            sitesearchtags
        }
        ","
        "),u=window.location.origin,n=n.replaceAll(" {
            PageUrl
        }
        ",u),$(this).attr("
        href ",n),newsPagePostAnchorTagClick(n))}),$("
        a.categories - dropdown - first ").click(function(){var t=$(this).attr("
        href ");if(t){var n=t.replaceAll(" {
            sitesearchtags
        }
        ","
        "),n=n.replaceAll(" {
            hospitals
        }
        ","
        "),i=window.location.origin;n=n.replaceAll(" {
            PageUrl
        }
        ",i);$(".field - hero - title span ").text(defaultTitleNews);$(this).attr("
        href ",n);newsPagePostAnchorTagClick(n)}}),$("
        a.categories - dropdown - generic - first ").click(function(){var t=$(this).attr("
        href "),n,i;t&&(n=t.replaceAll(" {
            sitesearchtags
        }
        ","
        "),i=window.location.href.split("
        # q = ")[0],n=n.replaceAll(" {
            PageUrl
        }
        ",i),$(this).attr("
        href ",n),newsPagePostAnchorTagClick(n))}),$("
        a.hospital - dropdown - first ").click(function(){var t=$(this).attr("
        href ");if(t){var n=t.replaceAll(" {
            hospitals
        }
        ","
        "),n=n.replaceAll(" {
            sitesearchtags
        }
        ","
        "),i=window.location.origin;n=n.replaceAll(" {
            PageUrl
        }
        ",i);$(".field - hero - title span ").text(defaultTitleNews);$(this).attr("
        href ",n);newsPagePostAnchorTagClick(n)}}),window.location.hash.indexOf("
        featured_hospitals ")>=0){defaultTitleNews=$(".field - hero - title span ").text();var n=decodeURIComponent(window.location.hash);n=n.split(" & ");$(n).each(function(n,t){var r=t,i=r.split(" = ");r.indexOf("
        featured_hospitals ")>=0&&i.length>1&&i[1]!="
        "&&($(".category - browse - news button ").text(i[1]),$(".field - hero - title span ").text(i[1]));r.indexOf("
        featured_sitesearchtags ")>=0&&i.length>1&&i[1]!="
        "&&($(".categories - dropdown - new button ").text(i[1]),$(".field - hero - title span ").text(i[1]))})}$("
        a.clinical - trial - search ").click(function(){var n=$("
        # clinical - text - box ").val(),t=$("
        # clinical - location - select option : selected ").text(),i=$("
        # clinical - doctor - select option: selected ").text(),r=$("
        # clinical - age - select option: selected ").text();$.ajax({url:" / api / Sitecore / ClinicalTrials / FetchSearchResults ",type:"
        POST ",data:{keyword:n,doctor:i,location:t,age:r},context:this,success:function(n){$("
        # clinical - search - results ").html(n);var t=$("
        # clinicalReultsCount ").val();$("
        # clinical - trial - result - count ").html(t)},error:function(n){console.log("
        error ",n)}})});$("
        # clinical - text - box ").keydown(function(n){if(n.keyCode==13){var t=$("
        # clinical - text - box ").val(),i=$("
        # clinical - location - select option: selected ").text(),r=$("
        # clinical - doctor - select option: selected ").text(),u=$("
        # clinical - age - select option: selected ").text();$.ajax({url:" / api / Sitecore / ClinicalTrials / FetchSearchResults ",type:"
        POST ",data:{keyword:t,doctor:r,location:i,age:u},context:this,success:function(n){$("
        # clinical - search - results ").html(n);var t=$("
        # clinicalReultsCount ").val();$("
        # clinical - trial - result - count ").html(t)},error:function(n){console.log("
        error ",n)}})}});$("
        # clinical - search - results ").on("
        click ","
        a.clinical - trial - view - detail ",function(n){n.preventDefault();var t=$(this).attr("
        href "),i=$(this).parents(".description - container ").find(".clinical - trial - title ").text();t&&$.ajax({url:" / api / Sitecore / ClinicalTrials / FetchSearchResultsDetail ",type:"
        POST ",data:{href:t,title:i},context:this,success:function(n){$(".view - details - popup.clinical - trial - model - body ").html(n);$(".view - details - popup ").addClass("
        show ");$("
        body ").addClass("
        model - opened ")},error:function(n){console.log("
        error ",n)}})})}),function(n,t){function i(n){throw new Error("
        Pagination: "+n);}function e(n){n.dataSource||i('"
        dataSource " is required.');typeof n.dataSource=="
        string "?n.totalNumberLocator===undefined?n.totalNumber===undefined?i('"
        totalNumber " is required.'):t.isNumeric(n.totalNumber)||i('"
        totalNumber " is incorrect. (Number)'):t.isFunction(n.totalNumberLocator)||i('"
        totalNumberLocator " should be a Function.'):u.isObject(n.dataSource)&&(typeof n.locator=="
        undefined "?i('"
        dataSource " is an Object, please specify "
        locator ".'):typeof n.locator=="
        string "||t.isFunction(n.locator)||i("
        "+n.locator+"
        is incorrect.(String | Function)"));n.formatResult===undefined||t.isFunction(n.formatResult)||i('"
        formatResult " should be a Function.')}function o(n){t.each(["
        go ","
        previous ","
        next ","
        disable ","
        enable ","
        refresh ","
        show ","
        hide ","
        destroy "],function(t,i){n.off(r+i)});n.data("
        pagination ",{});t(".paginationjs ",n).remove()}function s(n,t){return((t=typeof n)=="
        object "?n==null&&"
        null "||Object.prototype.toString.call(n).slice(8,-1):t).toLowerCase()}var u;typeof t=="
        undefined "&&i("
        Pagination requires jQuery.");var f="
        pagination ",r="
        __pagination - ";t.fn.pagination&&(f="
        pagination2 ");t.fn[f]=function(s){var l;if(typeof s=="
        undefined ")return this;var c=t(this),h=t.extend({},t.fn[f].defaults,s),a={initialize:function(){var n=this,i;(c.data("
        pagination ")||c.data("
        pagination ",{}),n.callHook("
        beforeInit ")!==!1)&&(c.data("
        pagination ").initialized&&t(".paginationjs ",c).remove(),n.disabled=!!h.disabled,i=n.model={pageRange:h.pageRange,pageSize:h.pageSize},n.parseDataSource(h.dataSource,function(t){n.isAsync=u.isString(t);u.isArray(t)&&(i.totalNumber=h.totalNumber=t.length);n.isDynamicTotalNumber=n.isAsync&&h.totalNumberLocator;var r=n.render(!0);h.className&&r.addClass(h.className);i.el=r;c[h.position==="
        bottom "?"
        append ":"
        prepend "](r);n.observer();c.data("
        pagination ").initialized=!0;n.callHook("
        afterInit ",r)}))},render:function(n){var r=this,c=r.model,o=c.el||t('<div class="
        paginationjs "><\/div>'),l=n!==!0;r.callHook("
        beforeRender ",l);var s=c.pageNumber||h.pageNumber,u=h.pageRange||0,f=r.getTotalPage(),i=s-u,e=s+u;return e>f&&(e=f,i=f-u*2,i=i<1?1:i),i<=1&&(i=1,e=Math.min(u*2+1,f)),o.html(r.generateHTML({currentPage:s,pageRange:u,rangeStart:i,rangeEnd:e})),h.hideWhenLessThanOnePage&&o[f<=1?"
        hide ":"
        show "](),r.callHook("
        afterRender ",l),o},generatePageNumbersHTML:function(n){var v=this,e=n.currentPage,u=v.getTotalPage(),o=n.rangeStart,s=n.rangeEnd,r="
        ",t,f=h.pageLink,l=h.ellipsisText,i=h.classPrefix,c=h.activeClassName,a=h.disableClassName;if(h.pageRange===null){for(t=1;t<=u;t++)r+=t==e?'<li class="
        '+i+"-page J-paginationjs-page "+c+'
        " data-num="
        '+t+'
        "><a>'+t+" < \ / a > < \ / li > ":'<li class="
        '+i+' - page J - paginationjs - page " data-num="
        '+t+'
        "><a href="
        '+f+"/"+t+'
        ">'+t+" < \ / a > < \ / li > ";return r}if(o<=3)for(t=1;t<o;t++)r+=t==e?'<li class="
        '+i+"-page J-paginationjs-page "+c+'
        " data-num="
        '+t+'
        "><a>'+t+" < \ / a > < \ / li > ":'<li class="
        '+i+' - page J - paginationjs - page " data-num="
        '+t+'
        "><a href="
        '+f+"/"+t+'
        ">'+t+" < \ / a > < \ / li > ";else h.showFirstOnEllipsisShow&&(r+='<li class="
        '+i+"-page "+i+' - first J - paginationjs - page " data-num="
        1 "><a href="
        '+f+' / 1 ">1<\/a><\/li>'),r+='<li class="
        '+i+"-ellipsis "+a+'
        "><a>'+l+" < \ / a > < \ / li > ";for(t=o;t<=s;t++)r+=t==e?'<li class="
        '+i+"-page J-paginationjs-page "+c+'
        " data-num="
        '+t+'
        "><a>'+t+" < \ / a > < \ / li > ":'<li class="
        '+i+' - page J - paginationjs - page " data-num="
        '+t+'
        "><a href="
        '+f+"/"+t+'
        ">'+t+" < \ / a > < \ / li > ";if(s>=u-2)for(t=s+1;t<=u;t++)r+='<li class="
        '+i+' - page J - paginationjs - page " data-num="
        '+t+'
        "><a href="
        '+f+"/"+t+'
        ">'+t+" < \ / a > < \ / li > ";else r+='<li class="
        '+i+"-ellipsis "+a+'
        "><a>'+l+" < \ / a > < \ / li > ",h.showLastOnEllipsisShow&&(r+='<li class="
        '+i+"-page "+i+' - last J - paginationjs - page " data-num="
        '+u+'
        "><a href="
        '+f+"/"+u+'
        ">'+u+" < \ / a > < \ / li > ");return r},generateHTML:function(n){var o=this,i=n.currentPage,u=o.getTotalPage(),f=o.getTotalNumber(),c=h.showPrevious,l=h.showNext,a=h.showPageNumbers,ut=h.showNavigator,ft=h.showGoInput,et=h.showGoButton,v=h.pageLink,y=h.prevText,p=h.nextText,ot=h.goButtonText,s=h.classPrefix,w=h.disableClassName,b=h.ulClassName,r="
        ",k='<input type="
        text " class="
        J - paginationjs - go - pagenumber ">',d='<input type="
        button " class="
        J - paginationjs - go - button " value="
        '+ot+'
        ">',e,g=t.isFunction(h.formatNavigator)?h.formatNavigator(i,u,f):h.formatNavigator,nt=t.isFunction(h.formatGoInput)?h.formatGoInput(k,i,u,f):h.formatGoInput,tt=t.isFunction(h.formatGoButton)?h.formatGoButton(d,i,u,f):h.formatGoButton,st=t.isFunction(h.autoHidePrevious)?h.autoHidePrevious():h.autoHidePrevious,ht=t.isFunction(h.autoHideNext)?h.autoHideNext():h.autoHideNext,it=t.isFunction(h.header)?h.header(i,u,f):h.header,rt=t.isFunction(h.footer)?h.footer(i,u,f):h.footer;return it&&(e=o.replaceVariables(it,{currentPage:i,totalPage:u,totalNumber:f}),r+=e),(c||a||l)&&(r+='<div class="
        paginationjs - pages ">',r+=b?'<ul class="
        '+b+'
        ">':" < ul > ",c&&(i<=1?st||(r+='<li class="
        '+s+"-prev "+w+'
        "><a>'+y+" < \ / a > < \ / li > "):r+='<li class="
        '+s+' - prev J - paginationjs - previous " data-num="
        '+(i-1)+'
        " title="
        Previous page "><a href="
        '+v+"/"+(i-1)+'
        ">'+y+" < \ / a > < \ / li > "),a&&(r+=o.generatePageNumbersHTML(n)),l&&(i>=u?ht||(r+='<li class="
        '+s+"-next "+w+'
        "><a>'+p+" < \ / a > < \ / li > "):r+='<li class="
        '+s+' - next J - paginationjs - next " data-num="
        '+(i+1)+'
        " title="
        Next page "><a href="
        '+v+"/"+(i+1)+'
        ">'+p+" < \ / a > < \ / li > "),r+=" < \ / ul > < \ / div > "),ut&&g&&(e=o.replaceVariables(g,{currentPage:i,totalPage:u,totalNumber:f}),r+='<div class="
        '+s+' - nav J - paginationjs - nav ">'+e+" < \ / div > "),ft&&nt&&(e=o.replaceVariables(nt,{currentPage:i,totalPage:u,totalNumber:f,input:k}),r+='<div class="
        '+s+' - go - input ">'+e+" < \ / div > "),et&&tt&&(e=o.replaceVariables(tt,{currentPage:i,totalPage:u,totalNumber:f,button:d}),r+='<div class="
        '+s+' - go - button ">'+e+" < \ / div > "),rt&&(e=o.replaceVariables(rt,{currentPage:i,totalPage:u,totalNumber:f}),r+=e),r},findTotalNumberFromRemoteResponse:function(n){var t=this;t.model.totalNumber=h.totalNumberLocator(n)},go:function(n,i){function v(n){if(r.callHook("
        beforePaging ",f)===!1)return!1;if(o.direction=typeof o.pageNumber=="
        undefined "?0:f>o.pageNumber?1:-1,o.pageNumber=f,r.render(),r.disabled&&r.isAsync&&r.enable(),c.data("
        pagination ").model=o,h.formatResult){var e=t.extend(!0,[],n);u.isArray(n=h.formatResult(e))||(n=e)}c.data("
        pagination ").currentPageData=n;r.doCallback(n,i);r.callHook("
        afterPaging ",f);f==1&&r.callHook("
        afterIsFirstPage ");f==r.getTotalPage()&&r.callHook("
        afterIsLastPage ")}var r=this,o=r.model,f,l,s,a,e;if(!r.disabled&&(f=n,f=parseInt(f),f&&!(f<1))){var y=h.pageSize,p=r.getTotalNumber(),w=r.getTotalPage();if(!(p>0)||!(f>w)){if(!r.isAsync){v(r.getDataFragment(f));return}l={};s=h.alias||{};l[s.pageSize?s.pageSize:"
        pageSize "]=y;l[s.pageNumber?s.pageNumber:"
        pageNumber "]=f;a=t.isFunction(h.ajax)?h.ajax():h.ajax;e={type:"
        get ",cache:!1,data:{},contentType:"
        application / x - www - form - urlencoded;
        charset = UTF - 8 ",dataType:"
        json ",async:!0};t.extend(!0,e,a);t.extend(e.data,l);e.url=h.dataSource;e.success=function(n){r.isDynamicTotalNumber?r.findTotalNumberFromRemoteResponse(n):r.model.totalNumber=h.totalNumber;var t=r.filterDataByLocator(n);v(t)};e.error=function(n,t,i){h.formatAjaxError&&h.formatAjaxError(n,t,i);r.enable()};r.disable();t.ajax(e)}}},doCallback:function(n,i){var u=this,r=u.model;t.isFunction(i)?i(n,r):t.isFunction(h.callback)&&h.callback(n,r)},destroy:function(){this.callHook("
        beforeDestroy ")!==!1&&(this.model.el.remove(),c.off(),t("
        # paginationjs - style ").remove(),this.callHook("
        afterDestroy "))},previous:function(n){this.go(this.model.pageNumber-1,n)},next:function(n){this.go(this.model.pageNumber+1,n)},disable:function(){var n=this,t=n.isAsync?"
        async ":"
        sync ";n.callHook("
        beforeDisable ",t)!==!1&&(n.disabled=!0,n.model.disabled=!0,n.callHook("
        afterDisable ",t))},enable:function(){var n=this,t=n.isAsync?"
        async ":"
        sync ";n.callHook("
        beforeEnable ",t)!==!1&&(n.disabled=!1,n.model.disabled=!1,n.callHook("
        afterEnable ",t))},refresh:function(n){this.go(this.model.pageNumber,n)},show:function(){var n=this;n.model.el.is(": visible ")||n.model.el.show()},hide:function(){var n=this;n.model.el.is(": visible ")&&n.model.el.hide()},replaceVariables:function(n,t){var i,r,u,f;for(r in t)u=t[r],f=new RegExp(" <%= \\s * "+r+"\\s * %> ","
        img "),i=(i||n).replace(f,u);return i},getDataFragment:function(n){var t=h.pageSize,i=h.dataSource,r=this.getTotalNumber(),u=t*(n-1)+1,f=Math.min(n*t,r);return i.slice(u-1,f)},getTotalNumber:function(){return this.model.totalNumber||h.totalNumber||0},getTotalPage:function(){return Math.ceil(this.getTotalNumber()/h.pageSize)},getLocator:function(n){var r;return typeof n=="
        string "?r=n:t.isFunction(n)?r=n():i('"
        locator " is incorrect. (String | Function)'),r},filterDataByLocator:function(n){var f=this.getLocator(h.locator),r;if(u.isObject(n)){try{t.each(f.split("."),function(t,i){r=(r?r:n)[i]})}catch(e){}r?u.isArray(r)||i("
        dataSource."+f+"
        must be an Array."):i("
        dataSource."+f+"
        is undefined.")}return r||n},parseDataSource:function(n,r){var f=this;u.isObject(n)?r(h.dataSource=f.filterDataByLocator(n)):u.isArray(n)?r(h.dataSource=n):t.isFunction(n)?h.dataSource(function(n){u.isArray(n)||i('The parameter of "
        done " Function should be an Array.');f.parseDataSource.call(f,n,r)}):typeof n=="
        string "?(/^https?|file:/.test(n)&&(h.ajaxDataType="
        jsonp "),r(n)):i('Unexpected type of "
        dataSource ".')},callHook:function(i){var r=c.data("
        pagination "),u,f=Array.prototype.slice.apply(arguments);return f.shift(),h[i]&&t.isFunction(h[i])&&h[i].apply(n,f)===!1&&(u=!1),r.hooks&&r.hooks[i]&&t.each(r.hooks[i],function(t,i){i.apply(n,f)===!1&&(u=!1)}),u!==!1},observer:function(){var n=this,u=n.model.el,e,f;c.on(r+"
        go ",function(r,u,f){(u=parseInt(t.trim(u)),u)&&(t.isNumeric(u)||i('"
        pageNumber " is incorrect. (Number)'),n.go(u,f))});u.delegate(".J - paginationjs - page ","
        click ",function(i){var u=t(i.currentTarget),r=t.trim(u.attr("
        data - num "));if(r&&!u.hasClass(h.disableClassName)&&!u.hasClass(h.activeClassName))return n.callHook("
        beforePageOnClick ",i,r)===!1?!1:(n.go(r),n.callHook("
        afterPageOnClick ",i,r),h.pageLink?void 0:!1)});u.delegate(".J - paginationjs - previous ","
        click ",function(i){var u=t(i.currentTarget),r=t.trim(u.attr("
        data - num "));if(r&&!u.hasClass(h.disableClassName))return n.callHook("
        beforePreviousOnClick ",i,r)===!1?!1:(n.go(r),n.callHook("
        afterPreviousOnClick ",i,r),h.pageLink?void 0:!1)});u.delegate(".J - paginationjs - next ","
        click ",function(i){var u=t(i.currentTarget),r=t.trim(u.attr("
        data - num "));if(r&&!u.hasClass(h.disableClassName))return n.callHook("
        beforeNextOnClick ",i,r)===!1?!1:(n.go(r),n.callHook("
        afterNextOnClick ",i,r),h.pageLink?void 0:!1)});u.delegate(".J - paginationjs - go - button ","
        click ",function(i){var f=t(".J - paginationjs - go - pagenumber ",u).val();if(n.callHook("
        beforeGoButtonOnClick ",i,f)===!1)return!1;c.trigger(r+"
        go ",f);n.callHook("
        afterGoButtonOnClick ",i,f)});u.delegate(".J - paginationjs - go - pagenumber ","
        keyup ",function(i){if(i.which===13){var f=t(i.currentTarget).val();if(n.callHook("
        beforeGoInputOnEnter ",i,f)===!1)return!1;c.trigger(r+"
        go ",f);t(".J - paginationjs - go - pagenumber ",u).focus();n.callHook("
        afterGoInputOnEnter ",i,f)}});c.on(r+"
        previous ",function(t,i){n.previous(i)});c.on(r+"
        next ",function(t,i){n.next(i)});c.on(r+"
        disable ",function(){n.disable()});c.on(r+"
        enable ",function(){n.enable()});c.on(r+"
        refresh ",function(t,i){n.refresh(i)});c.on(r+"
        show ",function(){n.show()});c.on(r+"
        hide ",function(){n.hide()});c.on(r+"
        destroy ",function(){n.destroy()});e=Math.max(n.getTotalPage(),1);f=h.pageNumber;n.isDynamicTotalNumber&&(f=1);h.triggerPagingOnInit&&c.trigger(r+"
        go ",Math.min(f,e))}};if(c.data("
        pagination ")&&c.data("
        pagination ").initialized===!0){if(t.isNumeric(s))return c.trigger.call(this,r+"
        go ",s,arguments[1]),this;if(typeof s=="
        string "){l=Array.prototype.slice.apply(arguments);l[0]=r+l[0];switch(s){case"
        previous ":case"
        next ":case"
        go ":case"
        disable ":case"
        enable ":case"
        refresh ":case"
        show ":case"
        hide ":case"
        destroy ":c.trigger.apply(this,l);break;case"
        getSelectedPageNum ":return c.data("
        pagination ").model?c.data("
        pagination ").model.pageNumber:c.data("
        pagination ").attributes.pageNumber;case"
        getTotalPage ":return Math.ceil(c.data("
        pagination ").model.totalNumber/c.data("
        pagination ").model.pageSize);case"
        getSelectedPageData ":return c.data("
        pagination ").currentPageData;case"
        isDisabled ":return c.data("
        pagination ").model.disabled===!0;default:i("
        Unknown action: "+s)}return this}o(c)}else u.isObject(s)||i("
        Illegal options ");return e(h),a.initialize(),this};t.fn[f].defaults={totalNumber:0,pageNumber:1,pageSize:10,pageRange:2,showPrevious:!0,showNext:!0,showPageNumbers:!0,showNavigator:!1,showGoInput:!1,showGoButton:!1,pageLink:"
        ",prevText:" & laquo;
        ",nextText:" & raquo;
        ",ellipsisText:"...",goButtonText:"
        Go ",classPrefix:"
        paginationjs ",activeClassName:"
        active ",disableClassName:"
        disabled ",inlineStyle:!0,formatNavigator:" <%= currentPage %> / <%= totalPage %>",formatGoInput:"<%= input %>",formatGoButton:"<%= button %>",position:"bottom",autoHidePrevious:!1,autoHideNext:!1,triggerPagingOnInit:!0,hideWhenLessThanOnePage:!1,showFirstOnEllipsisShow:!0,showLastOnEllipsisShow:!0,callback:function(){}};t.fn["addHook"]=function(n,r){arguments.length<2&&i("Missing argument.");t.isFunction(r)||i("callback must be a function.");var f=t(this),u=f.data("pagination");u||(f.data("pagination",{}),u=f.data("pagination"));u.hooks||(u.hooks={});u.hooks[n]=u.hooks[n]||[];u.hooks[n].push(r)};t[f]=function(n,r){arguments.length<2&&i("Requires two parameters.");var u;if(u=typeof n!="string"&&n instanceof jQuery?n:t(n),u.length)return u.pagination(r),u};u={};t.each(["Object","Array","String"],function(n,t){u["is"+t]=function(n){return s(n)===t.toLowerCase()}});typeof define=="function"&&define.amd&&define(function(){return t})}(this,window.jQuery);$(document).ready(function(){var n="",i,t,r;$(".heading-cta-banner .header-Nav-menu .button-with-border:visible").length==1&&(i=$(".heading-cta-banner .header-Nav-menu").parents(".column-splitter"),$(i).length>0&&($(i).find("> .col-lg-6:first").addClass("col-lg-8").removeClass("col-lg-6"),$(i).find("> .col-lg-6:first").addClass("col-lg-4").removeClass("col-lg-6")));$(".field-MainImage").is(":empty")&&($("<div class='location-address moved'><\/div>").insertAfter(".field-MainImage"),$(".heading-cta-banner .location-address > div").appendTo(".location-address.moved"));$(".location-address").css("visibility","visible");(window.location.href.toLowerCase().includes("/blog / blog - category ")||window.location.href.toLowerCase().includes(" / news / news - category "))&&(t=[],r="
        ",window.location.href.toLowerCase().includes(" / blog / blog - category ")?r=" / blog / blog - category ":window.location.href.toLowerCase().includes(" / news / news - category ")&&(r=" / news / news - category "),t=window.location.href.split(new RegExp(r,"
        i ")),n=t[1],n!="
        "&&n!=" / "&&(t=[],t=n.split(" / "),n=t[t.length-1],(n=="
        "||n.match(/\d+/g))&&t[t.length-2]!="
        "&&(n=t[t.length-2]),n=decodeURIComponent(n),n.match(/[a-zA-Z]/g)&&$(".category - right - section li a[data - href]").each(function(){$(this).attr("
        data - href ")==n&&$(".heading - cta - banner.field - hero - title ").text($(this).attr("
        data - title "))})));$("
        h1.field - hero - title ").css("
        visibility ","
        visible ");$(".blog - pagination ").length>0&&$(".category - right - section ").length>0&&($(".categories - dropdown - new ul li a ").each(function(){$(this).attr("
        data - href ")==n&&$(".categories - dropdown - new button ").text($(this).attr("
        data - title "))}),$(".category - browse - news ul li a ").each(function(){$(this).attr("
        data - href ")==n&&$(".category - browse - news button ").text($(this).attr("
        data - title "))}))});$(document).ready(function(){if($(".ratings ").length>0){var n=$(".ratings ").data("
        info ");n.currentpage=0;$(".ratings ").data("
        info ",n);$(".ratings.more - reviews a ").click(function(n){var i,t,r,u;n.preventDefault();i=$(this);t=$(i).parents(".ratings ").data("
        info ");t&&(r=t.currentpage+1,u="
        https: //transparency.nrchealth.com/widget/api/reviews/org/"+t.id+"/"+t.name+"/"+t.perpage+"/"+r+"?view=profile&jsonp=?",$.ajax({type:"GET",dataType:"jsonp",url:u,success:function(n){reviewCallback(n,i)}}))})}});