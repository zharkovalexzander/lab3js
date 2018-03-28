let url = 'https://newsapi.org/v2/everything?domains=wsj.com,nytimes.com&pageSize=20&page=';
let urlEnd = '&apiKey=d626f7167e81454581c8f31730f31a28';

let page = 1;

let animations = ["bounce", "pulse", "fadeIn",
    "fadeInDown", "fadeInLeft", "fadeInRight", "fadeInUp"];

let component;

window.onload = function () {

    $(document).on('scroll', function() {
        let superObject = this;
        let vueComponent = component.$refs.newsblogref;
        $(".post").each(function (index) {
            if ($(superObject).scrollTop() >= $(this).position().top) {
                if (index == vueComponent.lenTrigger() - 1 && !vueComponent.getTrigger(index)) {
                    retrieve();
                }
                if (!vueComponent.getTrigger(index)) {
                    vueComponent.setTrigger(index);
                    $(this).addClass("animated");
                    $(this).addClass(animations[Math.floor(Math.random() * animations.length)]);
                    $(this).css({opacity: '1'});
                }
            }
        });
    });

    fetch(url + page + urlEnd)
        .then(res => res.json())
        .then((out) => {
            console.log(out.articles);
            process(out.articles);
        }).then(function (data) {
            component.$refs.newsblogref.triggers();
    });
};

function retrieve() {
    page++;
    let t = url + page + urlEnd;
    fetch(t)
        .then(res => res.json())
        .then((out) => {
            console.log(out.articles);
            component.$refs.newsblogref.merge(out.articles);
        });
}


function process(msg) {
    component = new Vue({
          el: '#parent1',
          data: {
              list: msg,
          }
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

Vue.component("post", {
    props: ['news'],
    template: '' +
    '           <div class="card article post">' +
   '                  <div class="card-content">' +
   '                      <img :src="news.urlToImage" ' +
    '                       onerror="this.src = \'https://picsum.photos/1024/768/?image=\' + getRandomInt(1, 1000);" ' +
    '                       class="author-image" alt="Placeholder image">' +
   '                  </div>' +
   '                  <div class="card-content">' +
   '                      <div class="media">' +
   '                          <div class="media-content has-text-centered">' +
   '                              <p class="title article-title">{{news.title}}</p>' +
   '                              <p class="subtitle is-6 article-subtitle author">' +
   '                                  <a :href="news.url">@ {{news.author == null ? "Anonimous" : news.author}}</a> ' +
    '                                       on {{news.publishedAt.replace(/T/ig, " ").replace(/Z/ig, " ")}}' +
   '                              </p>' +
   '                          </div>' +
   '                      </div>' +
   '                      <div class="content article-body">' +
   '                          <p>{{news.description}}</p>' +
   '                      </div>' +
   '                  </div>' +
   '              </div>'
});

Vue.component("newsblog", {
    props: ['news'],
    template: '' +
    '  <div class="container">' +
    '      <section class="articles">' +
    '          <div class="column is-8 is-offset-2">' +
    '             <post v-for="item in news" :news="item"></post>' +
    '          </div>' +
    '      </section>' +
    '  </div>',
    data: function() {
        return {
            triggered: []
        };
    },
    methods: {
        merge: function (arr2) {
            for(let i = 0; i < arr2.length; ++i) {
                this.news.push(arr2[i]);
                this.triggered.push(false);
            }
        },
        triggers: function () {
            for(let i = 0; i < this.news.length; ++i) {
                this.triggered.push(false);
            }
        },
        getTrigger: function (index) {
            return this.triggered[index];
        },
        setTrigger: function (index) {
            this.triggered[index] = true;
        },
        lenTrigger: function () {
            return this.triggered.length;
        }
    }
});


