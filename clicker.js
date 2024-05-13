/*Clicker*/
let slam = bassSlam = 1
let click = kerrat = 1
let tupla = 1
let lvl = 1
let lvlup = 150
let huuto, BassHit, voice, anim, meter, s, uusi
let poikkiLyonti = 450
var aTempo = Math.floor(3000/lvl)

//Action pics
const katki = new Image('kuvat/katki_kapula.png')
const ff = new Image('kuvat/booster.png')

//Drum voices
const snare = new Audio('sounds/snare.mp3')
const doubleSnare = new Audio('sounds/double_snare.mp3')
const raid = new Audio('sounds/raider_bell.mp3')
const basari = new Audio('sounds/bass_metal.mp3')
const tripla = new Audio('sounds/triple_bass_metal.mp3')
const dsr = new Audio('sounds/dsr.mp3')
const floor_tom = new Audio('sounds/floor_tom.mp3')
const tribell = new Audio('sounds/tribell.mp3')
const broken = new Audio('sounds/brknStck.mp3')
let hitSnd = snare
const up7lvl = [dsr, doubleSnare, tribell, snare]

//LvlUp voices
const boost = new Audio('sounds/ff_trick.mp3')
const upup = new Audio('sounds/raider_crash.mp3')
const up5 = new Audio('sounds/up5.mp3')
const up6 = new Audio('sounds/up6.mp3')
const upall = new Audio('sounds/upall.mp3')
const uppSnd = [upup, up5, up6, upall]

//BubbleShouts
const huudot = ['Oh dear, a missed note...', "Where's my phone!?",
                'YEAH!!!', 'He blasts the beat!',
                'NO SOLO!!! WHAAAT!!!', 'Those are my toes, Sir!',
                "That's my pocket, M'am!", 'NOT!',
                'The longest rest EVER!', 'No stagediving? UNPOSSIBLE!!!'
                ]

//Lvl7Up
const anims = ['bpm', 'insane', 'ridi']
const breakHits = [250, 300, 350, 400]

//General use functions
function randomi(list) {
    sattuma = list[Math.floor(Math.random() * list.length)]
    return sattuma
}

function counter(kilkutin) {
    if (sessionStorage.clickcount) {
        sessionStorage.clickcount = Number(sessionStorage.clickcount) + kilkutin
    } else {
        sessionStorage.clickcount = kilkutin
        }
}

function bassTempo() {
   // if (lvl < 4) {
        document.getElementById("pedaali").style.animation = `hammer ${aTempo/lvl}ms infinite ease-out`;
        document.getElementById("pedaali2").style.animation = `hammer2 ${aTempo/lvl}ms ${aTempo/lvl/2}ms infinite ease-in`;
   /* } else {
        document.getElementById("pedaali").style.animation = `hammer ${aTempo/lvl}ms infinite ease-out`;
        document.getElementById("pedaali2").style.animation = `hammer2 ${aTempo/lvl}ms  infinite ease-in`;
    } */
}

function nollaaja(elementti) {
    elementti.style.width = '0'
    //elementti.cloneNode(uusi)
}

setInterval(kuplat, 9000)
function kuplat() {
    huuto = randomi(huudot)

    if (huuto.length <= 8) {
        document.getElementById('bubbleText').style.fontSize = '3.5em'
        document.getElementById('bubbleText').innerText = huuto
    } else {
        document.getElementById('bubbleText').style.fontSize = '2em'
        document.getElementById('bubbleText').innerText = huuto
    }
}

//Game functions
function tick() {
    counter(slam)        
    if (kerrat == poikkiLyonti) {
        hitSnd = broken
        hitSnd.play()
        slam = 0
        counter(0)
        document.getElementById('meter').value += 0    
        document.getElementById('poikki').style.width = '5em'
        document.getElementById('poikki').addEventListener('click', osto)        
    } else {
        click++
        kerrat++
        document.getElementById('meter').value += 1
        document.getElementById("counter").innerHTML = sessionStorage.clickcount    
        hitSnd.play()
        levels()
        slam = lvl        
    }    
}

function snareHit() {
    slam = lvl

    switch (click >= 1) { 
        case (lvl == 2):
            liikkeet('tuplaKupla',10,-1, -60, -25, 1.1)
            hitSnd = doubleSnare
            break

            case (lvl == 3):
                liikkeet('bassUp',10,-1, -60, -25, 1.1)
                hitSnd = floor_tom
                break
        
        case (lvl == 4):
            hitSnd = tribell
            document.getElementById('kapula').style.animationPlayState = 'running'
            break

        case (lvl == 6):
            liikkeet('insane',5 , 1,-100,30, 2)     
            hitSnd = raid
            huudot.push('AYE!!!', 'This stick is broken =(',
            'EEK! Your nose is so cold!', "SOME SLAMMIN'!", 'Oh, the lost bubbles!' )
            break

        case (lvl == 7):
            liikkeet('bpm', 15 , -1, -60, -30, 3)
            hitSnd = dsr          
            break

        case (lvl == 9):            
            document.getElementById('kapula').style.animationPlayState = 'running'
            hitSnd = tribell            
            break

        case (lvl == 10):
            liikkeet('ridi',10 ,1 ,-20 ,35 , 4)
            break

        case (lvl > 10):
            hitSnd = randomi(up7lvl)
            /*anim = randomi(anims)
            liikkeet(anim, 10, -1, -60, -25, 2)*/
            break
    }
}

function osto() {    
    var points = Number(document.getElementById('counter').innerHTML)
    document.getElementById('poikki').style.width = '0'
    points -= (100 * lvl)
    sessionStorage.clickcount = points
    click += 1
    kerrat = 0
    poikkiLyonti = randomi(breakHits)
    hitSnd = doubleSnare
}

function levels() {
    meter = document.getElementById('meter')
    voice = randomi(uppSnd)

    if (meter.value == lvlup) {
        clearInterval(BassHit)  
        bassTempo()              
        setInterval(boom, aTempo)
        lvlup *= 1.5
        meter.max = lvlup
        lvl += 1
        up = `Lvl ${lvl}`
        meter.value = 0
        document.getElementById('clicks').innerHTML = up               
        voice.play()
        snareHit()
    }
}

function liikkeet(nimi, nopeus, suunta, mista, mihin, jakaja) {
    let tunnus = null
    const elementti = document.getElementById(nimi)
    let paikka = mista
    let paikka1, paikka2
    clearInterval(tunnus)
    id = setInterval(tausta, nopeus)
    function tausta() {
      if (paikka == mihin) {
        uusi = elementti
        setTimeout(nollaaja, 3000, elementti)
        clearInterval(tunnus)
      } else {
        paikka++
        if (suunta > 0) {        
        paikka1 = paikka/jakaja
        paikka2 = paikka      
        } else if (suunta < 0) {           
            paikka1 = -paikka/jakaja
            paikka2 = -paikka
        }
        elementti.style.width = '35%'
        elementti.style.top = paikka1 + '%'
        elementti.style.left = paikka2 + '%'
      }
    }    
  }

//Drum sounds
function boom() { 
    counter(bassSlam)
    document.getElementById("counter").innerHTML = sessionStorage.clickcount
    basari.play()
}

function splash() {
    upup.play()
}

function tom() {
    floor_tom.play()
}


//Boosts
setInterval(flyingFingers, 100000)
function flyingFingers() {
    document.getElementById('booster').style.width = '5em'
    document.getElementById('booster').onclick = function() {
        document.getElementById('booster').style.width = '0'
        for (let x=0; x<=50; x++) {
            counter(slam+1)
            setTimeout(100)
            document.getElementById("counter").innerHTML = sessionStorage.clickcount
            boost.play()
        }
    }
}
