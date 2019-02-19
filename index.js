(
    function () {
        const selectedCarImg = document.getElementById("selectedCar");
        const colorVaraintBand = document.getElementById("colorVaraintBand");
        const selectedCarNameSpan = document.getElementById('selectedCarName');
        const selectedCarRatings = document.getElementById('ratings');
        const sudoClass = document.getElementById('sudoClass');
        const overallRatingDom = document.getElementById('overallRating');
        const car = {
            ratings: [
                {
                    name: "Critic's Rating",
                    rating: 87
                },
                {
                    name: "Performance",
                    rating: 64
                },
                {
                    name: "Interior",
                    rating: 90
                },
                {
                    name: "Safety",
                    rating: 44
                },
                {
                    name: "Reliablity",
                    rating: 52
                }
            ],
            availableColors: [
                {

                    colorCode: "#ffffff",
                    name: "Snow White",
                    src: "./assets/white.jpg"
                },

                {

                    colorCode: "#C0C0C0",
                    name: "Metalic Silver",
                    src: "./assets/silver.jpg"
                },
                {
                    colorCode: "#363634",
                    name: "Metalic Grey",
                    src: "./assets/grey.jpg"
                },
                {
                    colorCode: "#800000",
                    name: "Lovely Red",
                    src: "./assets/red.jpg"
                },
                {
                    colorCode: "#000080",
                    name: "Metalic Blue",
                    src: "./assets/blue.jpg"
                }
            ]
        };



        const setSelectedCarSrc = (src, name) => {
            selectedCarImg.src = src;
            selectedCarNameSpan.innerText = name;
        }


        const initColorVariantBand = () => {
            // make cars colors band
            const colorBand = car.availableColors.reduce((prev, cur, i) => {
                prev += `<div style="background:${cur.colorCode};" 
                  id="${cur.name.split(' ').join('_')}"
                  title="${cur.name}"
                  class="color-variant`;
                prev += i == 0 ? ` active-car"` : '"';
                prev += ` ></div>`;
                return prev;
            }, '');
            colorVaraintBand.innerHTML = colorBand;

            // binding events
            car.availableColors.map((ac) => {
                document.getElementById(ac.name.split(' ').join('_'))
                    .addEventListener('click', ($event) => { colorSelectHandler($event, ac) });
            })
        }

        const colorSelectHandler = function ($event, currentColor) {
            $event.preventDefault();
            $event.stopPropagation();
            const ele = $event.target
            setSelectedCarSrc(currentColor.src, currentColor.name);
            // remove active car
            document.getElementsByClassName("color-variant active-car")[0]
                .classList
                .remove('active-car');

            // make the current as active
            ele.classList.add('active-car');

        }

        const initRatings = () => {
            const ratingHtmlAndSum = car.ratings.reduce((prev, curr, i) => {
                // create rating bar
                prev.innerHTML += `<div class="rating" > 
                        <label >${curr.name}</label>
                        <div class="rating-bar" id="rating_${i}">
                        </div>
                        <span>${curr.rating}</span>
                </div>`;
                // total all ratings
                prev.sum += curr.rating;
                // create sudo class
                prev.sudoClass += `#rating_${i}:before{
                    width: ${curr.rating * (9 / 10)}%;
               }`
                return prev;
            }, { innerHTML: '', sum: 0, sudoClass: '' });
            selectedCarRatings.innerHTML = ratingHtmlAndSum.innerHTML;
            const overallRating = Math.floor(ratingHtmlAndSum.sum / car.ratings.length)
            overallRatingDom.innerText = overallRating;
            // select meter postion
            document.querySelector('.meter>img').style.transform = `rotate(${overallRating * (18/10)}deg)`;

            drawMeter(overallRating);

            // add sudo classs to head
            sudoClass.innerHTML = ratingHtmlAndSum.sudoClass;

        }

        const drawMeter = (angle) => {
            var c = document.getElementById("meter-canvas");
            var ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(100,100);
            ctx.arc(100, 100, 100, Math.PI, (Math.PI- angle));
            ctx.fillStyle="rgba(255, 188, 0, 0.45)";
            ctx.fill();
        }
        const init = () => {
            const { src, name } = car.availableColors[0];
            setSelectedCarSrc(src, name);
            initColorVariantBand();
            initRatings();
        }
        // init all 
        init();

    }
)();