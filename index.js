let url = 'https://newsapi.org/v2/everything?domains=wsj.com,nytimes.com&pageSize=20&page=1&apiKey=d626f7167e81454581c8f31730f31a28';

let page = 1;

fetch(url)
    .then(res => res.json())
    .then((out) => {
        console.log(out.articles);
        process(out.articles);
});

function process(msg) {
    let component = new Vue({
          el: '#parent1',
          data: {
              list: msg,
          }
    });
}

Vue.component("post", {
    props: ['news'],
    template: '<div class="card article">' +
   '                  <div class="card-content">' +
   '                      <img :src="news.urlToImage" class="author-image" alt="Placeholder image">' +
   '                  </div>' +
   '                  <div class="card-content">' +
   '                      <div class="media">' +
   '                          <div class="media-content has-text-centered">' +
   '                              <p class="title article-title">{{news.title}}</p>' +
   '                              <p class="subtitle is-6 article-subtitle author">' +
   '                                  <a :href="news.url">@ {{news.author == null ? "Anonimous" : news.author}}</a> on {{news.publishedAt.replace(/T/ig, " ").replace(/Z/ig, " ")}}' +
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
    template: '<div class="container">' +
    '      <section class="articles">' +
    '          <div class="column is-8 is-offset-2">' +
    '             <post v-for="item in news" :news="item"></post>' +
    '          </div>' +
    '      </section>' +
    '  </div>'
});

