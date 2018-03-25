(function(window, document, undefined) {
    let query = selector => document.querySelector(selector);
    let queryAll = selector => document.querySelectorAll(selector);

    let parseBookInfo = info => {
        query('h1.title').innerText = info['title'];
        query('div.right a img').src = info['pic']['normal'];
        let stars = Math.ceil(info['rating']['value'] / 2);
        query('span.rating-stars').innerHTML += new Array(stars).fill('<span class="rating-star rating-star-medium-full"></span>').join('\n');
        query('span.rating-stars').innerHTML += new Array(5 - stars).fill('<span class="rating-star rating-star-medium-gray"></span>').join('\n');
        query('p.rating strong').innerText = info['rating']['value'];
        query('p.rating span.count').innerText = info['rating']['count'];
        query('p.meta').innerHTML = `
            ${info['author'].map(a => `<a class="author">${a}</a>`).join(' / ')} / 
            ${info['press'].join(' / ')} / 
            ${info['pages'].join('页 / ')} 页 / 
            ${info['price'].join('元 /')} 元 / 
            ${info['pubdate'].join('')}
        `;
        query('section.subject-intro h2').innerText = `《${info['title']}》的内容简介`;
        query('p.intro').innerText = info['intro'];

        fetch(`/api/book/${window.config['book_id']}/annotations`)
            .then(res => res.json())
            .then(res => {
                query('section.subject-annotations h2').innerText = `《${info['title']}》的读书笔记(${res['total']})`;
                res['annotations']
                    .forEach(annotation => {
                        let template = `
                            <a href="${annotation['url']}" class="annotation-warp">
                                <span class="annotation-title">${annotation['chapter']}</span>
                                <div class="annotation-content">
                                    <p class="content">
                                        <i class="textstart"></i>
                                        <i class="textend"></i>
                                </p>
                                </div>
                                <span class="annotation-author">${annotation['author']['name']}</span>
                            </a>
                        `;
                        let li = document.createElement('LI');
                        li.className = 'annotation-item annotation-item-m';
                        li.innerHTML = template;
                        query('ul.list').appendChild(li);
                        fetch(`/api/book/annotation/${annotation['id']}`)
                            .then(res => res.json())
                            .then(res => {
                                li.querySelector('p.content').innerHTML = res['content'];
                            })
                    })
            });
    };
    
    fetch(`/api/book/${window.config['book_id']}`)
    .then(res => res.json())
    .then(res => {
        console.dir(res);
        parseBookInfo(res);
    });
})(window, document, undefined)