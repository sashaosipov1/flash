function hideLoader(params) {
    var div = document.getElementById("loader");
    div.style.display = 'none';
}

setTimeout(hideLoader, 3);

var activeNode = '';
var activePeroid = '';

function selectorClick(a, selec, name) {
    // Swap active class
    var selector = document.getElementById(selec);
    var active = selector.querySelector('.active');
    active.classList.remove('active');
    a.classList.add('active');

    if (selec === 'selector') {
        if (name === 'other') {
            var input = document.getElementById('other_container');
            input.style.display = 'block';
            activeNode = input.value;
        } else {
            // Remove input if node != other
            var input = document.getElementById('other_container');
            input.style.display = 'none';
            activeNode = a.innerHTML.trim();
        }
    }

    if (selec === 'periods') {
        activePeroid = a.innerHTML.trim();
    }
}

var currentTab = 0;
showTab(currentTab);

function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";

    // Display prev next button
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Continue";
    }

    fixStepIndicator(n);
}

function nextPrev(n) {
    console.log(1);
    var x = document.getElementsByClassName("tab");
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;

    if (currentTab >= x.length) {
        var email = document.getElementById('email').value;
        var name = document.getElementById('name').value;

        $.ajax({
            type: "POST",
            url: 'mail.php',
            data: {
                node: activeNode,
                period: activePeroid,
                email: email,
                name: name
            },
            success: function (responce) {
                console.log("responce", responce);
                var sps = document.getElementById("spasibo");
                sps.style.display = 'block';
            },
            error: function (err) {
                console.log("err", err);
            }
        })
        
        return;
    }

    showTab(currentTab);
}

function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
}