function set_modal(content, button, file, uri, meta) {
    
    // Inject content 
    $(".modal-body").empty().append(content);
    
    // Set meta
    $(".fullview").attr("href", file);
    $(".fullview").text(button);
    
    // Populate Dropbox drop-in
    $(".save-dropbox").attr("href", file);
    
    // Populate share buttons
    $(".email-link").attr("href", "mailto:?body=" + uri);
    $(".twitter-link").attr("href", "http://twitter.com/share?url=" + uri);
    $(".facebook-link").attr("href", "http://www.facebook.com/sharer/sharer.php?u=" + uri);
    $(".google-link").attr("href", "https://plus.google.com/share?url=" + uri);
    
    // Set title
    $(".modal-title").text(decodeURIComponent(file));

    meta = typeof meta !== 'undefined' ? meta : null;
    $("#file-meta").text(meta);
    
    // Show modal
    $("#viewer-modal").modal("show");
}

btn = $(".fullview").data("button");

$(".audio-modal").click(function(event) {
    
    event.preventDefault();
    
    var file = $(this).attr("href"),
        uri  = $(this).get(0).href,
        meta = $(this).closest("td").next().text();
    
    set_modal('<audio src="' + file + '" id="player" autoplay controls>Your browser does not support the audio element.</audio>', btn, file, uri, meta);
});

$(".flash-modal").click(function(event) {
    
    event.preventDefault();
    
    var file = $(this).attr("href"),
        uri = $(this).get(0).href,
        meta = $(this).closest("td").next().text();
    
    set_modal('<div class="viewer-wrapper"><object width="100%" height="100%" type="application/x-shockwave-flash" data="' + file + '"><param name="movie" value="' + file + '"><param name="quality" value="high"></object></div>', btn, file, uri, meta);
});

$(".image-modal").click(function(event) {
    
    event.preventDefault();
    
    var file = $(this).attr("href"),
        uri = $(this).get(0).href,
        meta = $(this).closest("td").next().text();

    set_modal('<img src="' + file + '"/>', btn, file, uri, meta);
});

$(".video-modal").click(function(event) {
    
    event.preventDefault();
    
    var file = $(this).attr("href"),
        uri = $(this).get(0).href,
        meta = $(this).closest("td").next().text();
    
    set_modal('<video src="' + file + '" id="player" autoplay controls>Video format or MIME type is not supported</video>', btn, file, uri, meta);
});

$(".quicktime-modal").click(function(event) {
    
    event.preventDefault();
    
    var file = $(this).attr("href"),
        uri = $(this).get(0).href,
        meta = $(this).closest("td").next().text();
    
    set_modal('<div class="viewer-wrapper"><embed width="100%" height="100%" src="' + file + '" type="video/quicktime" controller="true" showlogo="false" scale="aspect"></div>', btn, file, uri, meta);
});

$(".source-modal").click(function(event) {
    
    event.preventDefault();
    
    var file = $(this).attr("href"),
        data = $(this).data("highlight"),
        uri  = $(this).get(0).href,
        meta = $(this).closest("td").next().text();

    // Show & enable highlight button
    if (data !== true) {
        $(".highlight").removeClass("hidden").removeAttr("disabled");
    }

    // Get file extension
    var ext = file.split(".").pop();
    set_modal('<pre><code id="source" class="' + ext + '" dir="ltr"></code></pre>', btn, file, uri, meta);
    
    // Load file contents
    $.ajax(file, {
        dataType: "text",
        success: function(contents) {
            // Inject source code
            $("#source").text(decodeURIComponent(contents));
            
            // Fire auto-highlighter
            if (data === true) {
                $("#source").each(function(i, block) {
                    hljs.highlightBlock(block);
                });
            }
        }
    });
});
    
$(".highlight").click(function(event) {
   
    event.preventDefault();
    
    // Disable highlight button
    $(".highlight").attr("disabled", "disabled");

    // Fire highlighter
    $("#source").each(function(i, block) {
        hljs.highlightBlock(block);
    });

    // Adapt pre background-color from highlighter.js theme
    var background = $("code").css("background-color");
    $("pre").css("background-color", background);
});

$(".text-modal").click(function(event) {
    
    event.preventDefault();
    
    var file = $(this).attr("href"),
        uri = $(this).get(0).href,
        meta = $(this).closest("td").next().text();
    
    set_modal('<pre><code id="text" dir="ltr"></code></pre>', btn, file, uri, meta);
    
    // Load file contents
    $.ajax(file, {
        dataType: "text",
        success: function(contents) {
            $("#text").text(decodeURIComponent(contents));
        }
    });
});

$("#viewer-modal").on("hide.bs.modal", function() {
    
    var player = document.getElementById("player");
    
    if (player) {
        player.pause();
    }
});

$("#viewer-modal").on("hidden.bs.modal", function() {
    
    $(".highlight").addClass("hidden");
});

$(".website-modal").click(function(event) {
    
    event.preventDefault();
    
    var file = $(this).attr("href"),
        uri  = $(this).get(0).href,
        meta = $(this).closest("td").next().text();
    
    set_modal('<div class="viewer-wrapper"><iframe id="website" src="' + file + '" width="100%" height="100%" frameborder="0"></iframe></div>', btn, file, uri, meta);
    
    // Load file contents
    $.ajax(file, {
        dataType: "html"
    });
});