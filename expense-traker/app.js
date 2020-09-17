const UIController = (function () {
    const DOMString = {
        add__type: '.add__type',
        add__description: '.add__description',
        add__value: '.add__value',
        add__btn: '.add__btn',
        income__list: '.income__list',
        expenses__list: '.expenses__list',
        budget__value: '.budget__value',
        budget__income__value: '.budget__income--value',
        budget__expenses__value: '.budget__expenses--value',
        container: '.container'
    };
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMString.add__type).value,
                description: document.querySelector(DOMString.add__description).value,
                value: parseFloat(document.querySelector(DOMString.add__value).value)
            }
        },
        addItemList: function (newItem, type) {
            let element;
            if (type === 'inc') {
                element = DOMString.income__list;
                html = `
                <div class="item clearfix" id="inc-%id%">
                    <div class="item__description">%description%</div>
                    <div class="right clearfix">
                        <div class="item__value">%value%</div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>`;
            } else if (type === 'exp') {
                element = DOMString.expenses__list;
                html = `
                <div class="item clearfix" id="exp-%id%">
                    <div class="item__description">%description%</div>
                    <div class="right clearfix">
                        <div class="item__value">%value%</div>
                        <div class="item__percentage">21%</div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>`;
            }

            newHTML = html.replace('%id%', newItem.ID);
            newHTML = newHTML.replace('%description%', newItem.description);
            newHTML = newHTML.replace('%value%', newItem.value);
            document.querySelector(element).insertAdjacentHTML("beforeend", newHTML)
        },
        deleteListItem: function (eleID) {
            const ele = document.getElementById(eleID);
            ele.parentNode.removeChild(ele)
        },
        clearFields: function () {
            let fields;
            fields = document.querySelectorAll(DOMString.add__description + ', ' + DOMString.add__value);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function (current, index, array) {
                current.value = "";
            });
            fieldsArr[0].focus();
        },
        displayBudget: function (budget) {
            document.querySelector(DOMString.budget__value).textContent = budget.budget;
            document.querySelector(DOMString.budget__income__value).textContent = budget.inc;
            document.querySelector(DOMString.budget__expenses__value).textContent = budget.exp;
        },
        getDOMString: function () {
            return DOMString;
        }
    }
})();

const DataController = (function () {

    let data = {
        item: {
            inc: [],
            exp: []
        },
        total: {
            inc: 0,
            exp: 0
        },
        budget: 0
    }
    let Income = function (id, description, value) {
        this.ID = id,
            this.description = description,
            this.value = value
    }
    let calculateTotal = function (type) {
        let sum = 0;
        data.item[type].forEach((cur) => {
            sum += cur.value
        })
        data.total[type] = sum;
    }
    return {
        addItem: function (type, description, value) {
            let ID, newItem
            if (data.item[type].length > 0) {
                ID = data.item[type][data.item[type].length - 1].ID + 1;
            } else {
                ID = 0
            }
            if (type === 'inc') {
                newItem = new Income(ID, description, value);
            } else if (type === 'exp') {
                newItem = new Income(ID, description, value);
            }
            data.item[type].push(newItem);
            return newItem;
        },
        deleteItem: function (type, ID) {
            ids = data.item[type].map(cur => cur.ID)
            index = ids.indexOf(ID)
            if (index !== -1) {
                data.item[type].splice(index, 1);
            }
        },
        calculateBudget: function () {
            calculateTotal('inc');
            calculateTotal('exp');
            data.budget = data.total.inc - data.total.exp
        },
        getBudget: function () {
            return {
                budget: data.budget,
                inc: data.total.inc,
                exp: data.total.exp
            }
        },
        testing: function() {
            console.log(data);
        }
    }
})();

const Controller = (function (uiCtrl, dataCtrl) {
    const setUpEventListener = function () {
        DOM = uiCtrl.getDOMString();
        document.querySelector(DOM.add__btn).addEventListener('click', ctrlAddItems);
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItems();
            }
        });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };
    const updateBudget = function () {
        dataCtrl.calculateBudget();
        const budget = dataCtrl.getBudget();
        uiCtrl.displayBudget(budget);
    };
    const ctrlAddItems = function () {
        const input = uiCtrl.getInput();
        if (input.description !== '' && input.value > 0 && !isNaN(input.value)) {
            newItem = dataCtrl.addItem(input.type, input.description, input.value);
            uiCtrl.addItemList(newItem, input.type);
            uiCtrl.clearFields();
            updateBudget();
        }
    };
    const ctrlDeleteItem = function (event) {
        let itemID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id
        if (itemID) {
            // 'inc-1' -> ['inc', '1']
            splitItem = itemID.split('-');
            type = splitItem[0];
            ID = parseInt(splitItem[1]);
            dataCtrl.deleteItem(type, ID);
            uiCtrl.deleteListItem(itemID);
            updateBudget();
        }        
    };
    return {
        init: function () {
            console.log('Application started.')
            setUpEventListener();
            uiCtrl.displayBudget({
                budget: 0,
                inc: 0,
                exp: 0
            });
        }
    }
})(UIController, DataController);
Controller.init();