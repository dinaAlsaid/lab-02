'use strict'

let animalObjArr = [];
let keywordOpt = [];

$.ajax('data/page-1.json')
    .then(data => {
        let $select = $('select');
        data.forEach(ele => {
            new Animal(ele.image_url, ele.title, ele.description, ele.keyword, ele.horns);
        });
        console.log(animalObjArr);
        animalObjArr.forEach(item => {
            item.render();
            if (keywordOpt.includes(item.keyword) === false) {
                keywordOpt.push(item.keyword);
                $select.append(`<option value="${item.keyword}">${item.keyword}</option>`);
                
            }
        })
        $('.photo-template').first().hide();
        console.log(keywordOpt);
        $select.click(function (event) {
            animalObjArr.forEach(item => {
                if (event.target.value !== 'default') {
                    if (item.keyword === event.target.value) {
                        $(`.${item.keyword}`).show();
                    } else {
                        $(`.${item.keyword}`).hide();
                    }
                } else {
                    $(`.${item.keyword}`).show();
                }

            })
            console.log(event.target.value);
        })
    });

function Animal(image_url, title, description, keyword, horns) {
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;

    animalObjArr.push(this);
}

Animal.prototype.render = function () {
    let section = $('.photo-template').first().clone();
    section.find('h2').text(this.title);
    section.find('img').attr('src', this.image_url);
    section.find('p').text(this.description);
    section.addClass(this.keyword);
    $('main').append(section);
}



