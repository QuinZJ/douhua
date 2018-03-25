(function (window, document, undefied) {

    let start = 0;
    const count = 18;

    /* 加载书籍列表 */

    let list_elem = document.querySelector('section#list');
    let loadData = data_list => {
        data_list.forEach(data => {
            let template = `
            <div class="cover">
                <div class="wp ratio3_4">
                    <img src="${data['cover']['url']}" class="img-show" style="width: 100%;">
                    ${
                        data['actions']
                            .map(action => `<span class="action-tag">${action}</span>`)
                    }
                </div>
            </div>
        
            <div class="info">
                <h4></h4>
                <h3>
                    ${data['title']}
                    ${
                        data['actions']
                        .map(action => `<span class="action-tag">${action}</span>`)
                    }
                </h3>
                <p class="rank">
                    <span class="rating-stars">
                    ${
                        new Array(Math.ceil(data['rating']['value'] / 2))
                            .fill('<span class="rating-star rating-star-small-full"></span>')
                            .join('\n')
                    }
                    ${
                        new Array(5 - Math.ceil(data['rating']['value'] / 2))
                            .fill('<span class="rating-star rating-star-small-gray"></span>')
                            .join('\n')
                    }
                    </span>
                    <span>${data['rating']['value']}</span>
                </p>
                <p class="meta">${data['info']}</p>
                <cite></cite>
            </div>
            `;
            let a = document.createElement('A');
            a.className = 'item';
            a.href = `/book/subject/${data['id']}`;
            a.innerHTML = template;
            list_elem.appendChild(a);        
        });
    }

    let fetchData = () => {
        fetch(`/api/subject_collection/filter_book_${window.config['type']}_hot/items?start=${start}&count=${count}`)
        .then(res => res.json())
        .then(res => {
            start += count;
            loadData(res['subject_collection_items'])
        });
    }

    fetchData();

    /* 绑定浏览 */

    let getDocumentTop = () => {
        let bodyScrollTop = 0, documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        return bodyScrollTop > documentScrollTop ? bodyScrollTop : documentScrollTop;
    }

    let getWindowHeight = () => {
        var windowHeight = 0;    
        if (document.compatMode == "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    }

    let getScrollHeight = () => {
        let bodyScrollHeight = 0, documentScrollHeight = 0;
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        return bodyScrollHeight > documentScrollHeight ? bodyScrollHeight : documentScrollHeight;       
    }
    document.onscroll = e => {
        if (getScrollHeight() !== getWindowHeight() + getDocumentTop()) return;
        fetchData();
    }

})(window, document, undefined)