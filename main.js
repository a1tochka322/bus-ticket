let app = Vue.createApp({
    data() {
        return {
            header: ['Место', 'Полное имя', 'Возраст', 'Пол'],
            user: {
                firstName: '',
                lastName: '',
                gender: 'М',
                dateOfBirth: ''
            },
            passangers: [{ "fullName": "Островская Мария", "age": 25, "gender": "Ж" }, { "fullName": "Мухин Артём", "age": 28, "gender": "М" }],
        }
    },
    computed: {
        fullName() {
            return this.user.lastName + ' ' + this.user.firstName
        },
        age() {
            return ((new Date() - new Date(this.user.dateOfBirth)) / (24 * 3600 * 365.25 * 1000)) | 0;
        },
        formReady(){
            return Object.values(this.user).every(val => val.length > 0);
        },
        totalSeated() {
            return '.seat' + this.passangers.length
        }
    },
    methods: {
        text(age) {
            var txt;
            count =     age % 100;
            if (count >= 5 && count <= 20) {
                txt = 'лет';
            } else {
                count = count % 10;
                if (count == 1) {
                    txt = 'год';
                } else if (count >= 2 && count <= 4) {
                    txt = 'года';
                } else {
                    txt = 'лет';
                }
            }
            return txt;
        },
        addNew() {
            if (this.formReady && (this.passangers.length < 16)) {
                this.passangers.push({
                    'fullName': this.fullName,
                    'age': this.age,
                    'gender': this.user.gender,
                    'dateOfBirth': this.user.dateOfBirth,              
                });
                document.querySelector("form").reset();
                this.user.firstName = '';
                this.user.lastName = '';
                this.user.dateOfBirth = '';
                document.querySelectorAll('#male')[0].checked = true;
                this.user.gender = 'М';
                var elem = document.querySelector(this.totalSeated);
                elem.classList.add("seated");
            } else if (this.passangers.length < 16) { 
                alert('Заполните все поля.');
            } else {
                alert('Нет свободных мест');
            }
           
        },
        resetForm() {
            document.querySelector("form").reset();
            this.user.firstName = '';
            this.user.lastName = '';
            this.user.dateOfBirth = '';
            document.querySelectorAll('#male')[0].checked = true;
            this.user.gender = 'М';

        }
    }
});


const mountedApp = app.mount('#app');