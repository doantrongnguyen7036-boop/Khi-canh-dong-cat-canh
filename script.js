
/* =========================================
   MEGASTORY: CÁNH ĐỒNG "CẤT CÁNH"
   Hiệu ứng tương tác và cuộn trang
   ========================================= */

document.documentElement.classList.add("js-enabled");

document.addEventListener("DOMContentLoaded", function () {
    // 1. THANH TIẾN TRÌNH ĐỌC
    const progressBar = document.getElementById("readingProgress");

    function updateReadingProgress() {
        if (!progressBar) return;

        const scrollTop =
            window.scrollY || document.documentElement.scrollTop;

        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress =
            documentHeight > 0
                ? Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100))
                : 0;

        progressBar.style.width = progress + "%";
    }

    window.addEventListener("scroll", updateReadingProgress, {
        passive: true
    });

    window.addEventListener("resize", updateReadingProgress);

    updateReadingProgress();


    // 2. HIỆU ỨNG NỘI DUNG XUẤT HIỆN KHI CUỘN
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("is-visible");
        });
    }


    // 3. CUỘN MƯỢT ĐẾN CÁC MỤC TRONG MENU
    const navigationLinks = document.querySelectorAll(
        '.site-nav a[href^="#"], ' +
        '.main-nav a[href^="#"], ' +
        'nav a[href^="#"]'
    );

    navigationLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start"
                });

                history.replaceState(null, "", targetId);
            }
        });
    });


    // 4. KIỂM TRA ẢNH BỊ LỖI ĐƯỜNG DẪN
    const images = document.querySelectorAll("img");

    images.forEach(function (image) {
        image.addEventListener("error", function () {
            console.warn(
                "Không tải được ảnh. Hãy kiểm tra đường dẫn:",
                image.getAttribute("src")
            );

            image.classList.add("image-error");
        });
    });


    // 5. KIỂM TRA VIDEO
    const videos = document.querySelectorAll("video");

    videos.forEach(function (video) {
        video.addEventListener("error", function () {
            console.warn(
                "Không tải được video. Hãy kiểm tra đường dẫn tệp video."
            );
        });
    });

    console.log("Megastory đã tải xong các hiệu ứng.");
});
