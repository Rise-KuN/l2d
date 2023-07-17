var Paul_Pio = function (prop) {
    var that = this;

    var current = {
        idol: 0,
        menu: document.querySelector(".pio-container .pio-action"),
        canvas: document.getElementById("pio"),
        body: document.querySelector(".pio-container"),
        root: document.location.protocol +'//' + document.location.hostname +'/'
    };

    /* Modules */
    var modules = {
        // Replace the model
        idol: function () {
            current.idol < (prop.model.length - 1) ? current.idol++ : current.idol = 0;
            return current.idol;
        },
        // Create Model
        create: function (tag, prop) {
            var e = document.createElement(tag);
            if(prop.class) e.className = prop.class;
            return e;
        },
        // Random Model
        rand: function (arr) {
            return arr[Math.floor(Math.random() * arr.length + 1) - 1];
        },
        // Create Dialog box
        render: function (text) {
            if(text.constructor === Array){
                dialog.innerText = modules.rand(text);
            }
            else if(text.constructor === String){
                dialog.innerText = text;
            }
            else{
                dialog.innerText = "أظن أن هناك مشكلة";
            }

            dialog.classList.add("active");

            clearTimeout(this.t);
            this.t = setTimeout(function () {
                dialog.classList.remove("active");
            }, 7000);
        },
        // Close Model
        destroy: function () {
            that.initHidden();
            localStorage.setItem("posterGirl", 0);
        },
        // Mobile
        isMobile: function () {
            var ua = window.navigator.userAgent.toLowerCase();
            ua = ua.indexOf("mobile") || ua.indexOf("android") || ua.indexOf("ios");

            return window.innerWidth < 500 || ua !== -1;
        }
    };
    this.destroy = modules.destroy;
	// Tool Box
    var elements = {
        home: modules.create("span", {class: "pio-home"}),
        skin: modules.create("span", {class: "pio-skin"}),
        info: modules.create("span", {class: "pio-info"}),
        night: modules.create("span", {class: "pio-night hidden"}),
        close: modules.create("span", {class: "pio-close"}),
        show: modules.create("div", {class: "pio-show"})
    };

    var dialog = modules.create("div", {class: "pio-dialog"});
    current.body.appendChild(dialog);
    current.body.appendChild(elements.show);

    /* Prompt operation */
    var action = {
        // Welcome
        welcome: function () {
            if(document.referrer !== "" && document.referrer.indexOf(current.root) === -1){
                var referrer = document.createElement('a');
                referrer.href = document.referrer;
                prop.content.referer ? modules.render(prop.content.referer.replace(/%t/, "الطقس جيد اليوم, لنلعب معا!")) : modules.render("مرحبا بك في مدونتنا, أتمنى أن تكون بصحة وعافية!");
            }
            else if(prop.tips){
                var text, hour = new Date().getHours();

                if (hour > 22 || hour <= 5) {
                    text = 'هل أنت خفاش؟ أنا لا أسهر لوقت متأخر لذا جاني.';
                }
                else if (hour > 5 && hour <= 8) {
                    text = '!صباح الخير';
                }
                else if (hour > 8 && hour <= 11) {
                    text = 'صباح الخير! لا تجلس كثيرا على الحاسوب، اذهب ومارس بعض الرياضة حتى ولو قليلا!';
                }
                else if (hour > 11 && hour <= 14) {
                    text = 'إنه الظهر، حان وقت الغداء!';
                }
                else if (hour > 14 && hour <= 17) {
                    text = '؟من السهل أن تشعر بالنعاس بعد تناول الغداء، هل أنهيت تمارينك اليوم';
                }
                else if (hour > 17 && hour <= 19) {
                    text = 'مشهد غروب الشمس جميل جدا، وأجمل غروب شمس أحمر رأيته.';
                }
                else if (hour > 19 && hour <= 21) {
                    text = '؟مساء الخير، كيف كان يومك';
                }
                else if (hour > 21 && hour <= 23) {
                    text = 'الوقت متأخر الآن، علي أن أنام لأستيقظ باكرا في الغد، ليلة سعيدة.';
                }
                else{
                    text = "الوقت متأخر الآن، علي أن أنام لأستيقظ باكرا في الغد، ليلة سعيدة.";
                }

                modules.render(text);
            }
            else{
                modules.render(prop.content.welcome || "مرحبا بك في مدونتنا، أتمنى أن تكون بصحة وعافية!");
            }
        },
        // Touch Function
        touch: function () {
            current.canvas.onclick = function () {
                modules.render(prop.content.touch || [
				"ماذا تفعل؟",
				"إلمسني مجددا وسأتصل بالشرطة!",
				"أيها المنحرف لا تلمسني، أحمق هنتاي!",
				"كف عن لمسي، أكرهك باكا باكا دايكيراي!",
				"شيني...",
				"لم أنت منحرف لهذه الدرجة؟",
				"سأخبر رايز بما فعلته، وسيأتي الجندي شادو لجلدك.",
				"أتعرف معنى لوليكون؟",
				"لعلمك الشلة لا يحبون اللوليز لأن بعض الذين يحبون اللوليز دخلوا السجن!",
				"أوي، توقف عن لمسي، هنتاي!",
				]);
            };
        },
        // Buttons Function
        buttons: function () {
            // Back to home page
            elements.home.onclick = function () {
                location.href = current.root;
            };
            elements.home.onmouseover = function () {
                modules.render(prop.content.home || "انقر هنا للعودة إلى الصفحة الرئيسية!");
            };
            current.menu.appendChild(elements.home);

            // Clothes For models
            elements.skin.onclick = function () {
                loadlive2d("pio", prop.model[modules.idol()]);
                prop.content.skin && prop.content.skin[1] ? modules.render(prop.content.skin[1]) : modules.render("الملابس الجديدة جميلة جدا، دايسكي.");
            };
            elements.skin.onmouseover = function () {
                prop.content.skin && prop.content.skin[0] ? modules.render(prop.content.skin[0]) : modules.render("ما رأيك أن تشتري لي ملابس الجديدة؟");
            };
            if(prop.model.length > 1) current.menu.appendChild(elements.skin);

            // About me
            elements.info.onclick = function () {
                window.open(prop.content.link || "#");
            };
            elements.info.onmouseover = function () {
                modules.render("أتود معرفة المزيد حول أعضاء الفريق؟");
            };
            current.menu.appendChild(elements.info);

            // Night mode
            if(prop.night){
                elements.night.onclick = function () {
                    typeof prop.night === "function" ? prop.night() : eval(prop.night);
                };
                elements.night.onmouseover = function () {
                    modules.render("انقر هنا لحماية عينيك في الليل.");
                };
                current.menu.appendChild(elements.night);
            }

            // Close Model
            elements.close.onclick = function () {
                modules.destroy();
            };
            elements.close.onmouseover = function () {
                modules.render(prop.content.close || "أستتخلى عني بهذه السرعة، باكا باكا دايكيراي!");
            };
            current.menu.appendChild(elements.close);
        },
        custom: function () {
            prop.content.custom.forEach(function (t) {
                if(!t.type) t.type = "default";
                var e = document.querySelectorAll(t.selector);

                if(e.length){
                    for(var j = 0; j < e.length; j++){
                        if(t.type === "read"){
                            e[j].onmouseover = function () {
                                modules.render("想阅读 %t 吗？".replace(/%t/, "“" + this.innerText + "”"));
                            }
                        }
                        else if(t.type === "link"){
                            e[j].onmouseover = function () {
                                modules.render("想了解一下 %t 吗？".replace(/%t/, "“" + this.innerText + "”"));
                            }
                        }
                        else if(t.text){
                            e[j].onmouseover = function () {
                                modules.render(t.text);
                            }
                        }
                    }
                }
            });
        }
    };

    /* Track Function */
    var begin = {
        static: function () {
            current.body.classList.add("static");
        },
        fixed: function () {
            action.touch(); action.buttons();
        },
        draggable: function () {
            action.touch(); action.buttons();

            var body = current.body;
            body.onmousedown = function (downEvent) {
                var location = {
                    x: downEvent.clientX - this.offsetLeft,
                    y: downEvent.clientY - this.offsetTop
                };

                function move(moveEvent) {
                    body.classList.add("active");
                    body.classList.remove("right");
                    body.style.left = (moveEvent.clientX - location.x) + 'px';
                    body.style.top  = (moveEvent.clientY - location.y) + 'px';
                    body.style.bottom = "auto";
                }

                document.addEventListener("mousemove", move);
                document.addEventListener("mouseup", function () {
                    body.classList.remove("active");
                    document.removeEventListener("mousemove", move);
                });
            };
        }
    };

    // Mobile Function
    this.init = function (onlyText) {
        if(!(prop.hidden && modules.isMobile())){
            if(!onlyText){
                action.welcome();
                loadlive2d("pio", prop.model[0]);
            }

            switch (prop.mode){
                case "static": begin.static(); break;
                case "fixed":  begin.fixed(); break;
                case "draggable": begin.draggable(); break;
            }

            if(prop.content.custom) action.custom();
        }
    };

    // Hidden status
    this.initHidden = function () {
        // Clear preset spacing
        if(prop.mode === "draggable"){
            current.body.style.top = null;
            current.body.style.left = null;
            current.body.style.bottom = null;
        }

        current.body.classList.add("hidden");
        dialog.classList.remove("active");

        elements.show.onclick = function () {
            current.body.classList.remove("hidden");
            localStorage.setItem("posterGirl", 1);
            that.init();
        }
    }

    localStorage.getItem("posterGirl") == 0 ? this.initHidden() : this.init();
};