// 1. Render song --> OK
// 2. Scroll top --> OK
// 3. Play / pause / seek -> OK
// 4. CD rotate -> OK
// 5. Next / prev -> OK
// 6. Random -> OK
// 7. Next / repeat when ended -> OK
// 8. Active song -> OK
// 9. Scroll sctive song on to view -> OK
// 10. PLay song when click -> OK
// 11. Current / duraton time --> OK
// 12. Hendle option
// 13. No repeat one song
// 14. Volume
// 15. Menu
// 16. Restart

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $(".player");
const playlist = $(".playlist");
const heading = $(".title h4");
const singer = $(".title p");
const cd = $(".cd");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const currentTime = $("#current-time");
const durationTime = $("#duration-time");
const playBtn = $(".btn-togle-play");
const propress = $("#propress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");

const app = {
    currentIndex: 0,
    isPLaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: "Summertime",
            singer: "Kimi No Toriko",
            path: "./assets/music/song-1.mp3",
            image: "./assets/img/music/song-1.jpeg",
        },
        {
            name: "Hẹn Ước Từ Hư Vô",
            singer: "Soái Nhi",
            path: "./assets/music/song-2.mp3",
            image: "./assets/img/music/song-2.jpeg",
        },
        {
            name: "Hết Sấy Miền Tây",
            singer: "Hana Cẩm Tiên",
            path: "./assets/music/song-3.mp3",
            image: "./assets/img/music/song-3.jpeg",
        },
        {
            name: "Rồi Tới Luôn",
            singer: "Nal",
            path: "./assets/music/song-4.mp3",
            image: "./assets/img/music/song-4.jpeg",
        },
        {
            name: "Mẹ Anh Bắt Chia Tay",
            singer: "Miu lê x Karil",
            path: "./assets/music/song-5.mp3",
            image: "./assets/img/music/song-5.jpeg",
        },
        {
            name: "Xin Má Rước Dâu",
            singer: "Diệu Kiên",
            path: "./assets/music/song-6.mp3",
            image: "./assets/img/music/song-6.jpeg",
        },
        {
            name: "Đám Cưới Nha",
            singer: "Hồng Thanh x Mie",
            path: "./assets/music/song-7.mp3",
            image: "./assets/img/music/song-7.jpeg",
        },
        {
            name: "Muốn Em Là",
            singer: "Keyo",
            path: "./assets/music/song-8.mp3",
            image: "./assets/img/music/song-8.jpeg",
        },
        {
            name: "Đám Cưới Miền Tây",
            singer: "Hana Cẩm Tiên",
            path: "./assets/music/song-9.mp3",
            image: "./assets/img/music/song-9.jpeg",
        },
        {
            name: "Chỉ Là Không Cùng Nhau",
            singer: "Tăng Phúc x Trương Thảo Nhi",
            path: "./assets/music/song-10.mp3",
            image: "./assets/img/music/song-10.jpeg",
        },
    ],
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return /*html*/ `
            <div class="song ${
                index === this.currentIndex ? "active" : ""
            }" data-index="${index}">
                <div class="thumb" style="background-image: url('${
                    song.image
                }');"></div>
                <div class="body">
                    <h3 class="title-music">${song.name}</h3>
                    <p class="singer">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="ri-more-2-fill"></i>
                </div>
            </div>
            `;
        });
        playlist.innerHTML = htmls.join("");
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },
    hendleEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;
        const playlistHeight = playlist.offsetHeight;
        // Scroll cd
        playlist.onscroll = function () {
            const scrollTop = playlist.scrollY || playlist.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            const newPlaylistHeight = playlistHeight + scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
            playlist.style.height = newPlaylistHeight + "px";
            cd.style.opacity = newCdWidth / cdWidth;
        };
        // Xử lý cd quay / dừng
        const cdThumbAnimate = cdThumb.animate(
            [{ transform: "rotate(360deg)" }],
            {
                duration: 10000,
                iterations: Infinity,
            }
        );
        cdThumbAnimate.pause();
        // Xử lý khi click play
        playBtn.onclick = function () {
            if (_this.isPLaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };
        // Khi song play
        audio.onplay = function () {
            _this.isPLaying = true;
            player.classList.add("playing");
            cdThumbAnimate.play();
        };
        // Khi song pause
        audio.onpause = function () {
            _this.isPLaying = false;
            player.classList.remove("playing");
            cdThumbAnimate.pause();
        };
        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const propressPercent = Math.floor(
                    (audio.currentTime / audio.duration) * 100
                );
                propress.value = propressPercent;
            }
        };
        // song current time
        audio.addEventListener("timeupdate", function () {
            const current = audio.currentTime;
            const min = Math.floor(current / 60);
            const sec = Math.floor(current % 60);
            currentTime.innerText =
                (min < 10 ? "0" + min : min) +
                ":" +
                (sec < 10 ? "0" + sec : sec);
        });
        // song duration time
        audio.onloadedmetadata = function () {
            const duration = audio.duration;
            const min = Math.floor(duration / 60);
            const sec = Math.floor(duration % 60);
            durationTime.innerText =
                (min < 10 ? "0" + min : min) +
                ":" +
                (sec < 10 ? "0" + sec : sec);
        };
        // Xử lý khi tua song
        propress.oninput = function (e) {
            const seekTiem = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTiem;
        };
        // Khi next song
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.activeSong();
            _this.scrollToActiveSong();
        };
        // Khi prev song
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.activeSong();
            _this.scrollToActiveSong();
        };
        // Khi random song
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle("active", _this.isRandom);
        };
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle("active", _this.isRepeat);
        };
        // Next song when audio ended
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
            _this.activeSong();
        };
        // Lắng nghe hành vi click vào playlist
        playlist.onclick = function (e) {
            const songNode = e.target.closest(".song:not(.playing)");
            const songOption = e.target.closest(".option");
            if (songNode || songOption) {
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrenSong();
                    _this.activeSong();
                    _this.scrollToActiveSong();
                    audio.play();
                }
                if (songOption) {
                }
            }
        };
    },
    loadCurrenSong: function () {
        heading.textContent = this.currentSong.name;
        singer.textContent = this.currentSong.singer;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrenSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrenSong();
    },
    playRandomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrenSong();
    },
    activeSong: function () {
        const listSong = $$(".song");
        listSong.forEach((song, index) => {
            if (this.currentIndex === index) {
                $(".song.active").classList.remove("active");
                song.classList.add("active");
            }
        });
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }, 300);
    },
    start: function () {
        //  Định nghĩa các thuộc tính cho object
        this.defineProperties();
        // Lắng nghe xử lý các sự kiện (DOM events)
        this.hendleEvents();
        // Tải thông tin bài hát đầu tiên
        this.loadCurrenSong();
        // Render playlist
        this.render();
    },
};
app.start();
