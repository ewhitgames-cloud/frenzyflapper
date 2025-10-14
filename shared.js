// shared.js — FrenzyFlapper shared data & helpers (menu/game/store)
(function(global){
  const KEYS = {
    BEST:'ff_best',
    COINS:'ff_coins',
    OWN_BIRDS:'ff_owned_birds',
    OWN_PIPES:'ff_owned_pipes',
    BIRD_SKIN:'ff_skin_bird',
    PIPE_SKIN:'ff_skin_pipe',
    BG_SKIN:'ff_bg_skin_v1',
  };

  function get(k, def){ try{ const v = localStorage.getItem(k); return v==null ? def : JSON.parse(v); }catch{return def;} }
  function set(k, v){ localStorage.setItem(k, JSON.stringify(v)); }

  // Economy helpers
  function getCoins(){ return get(KEYS.COINS, 0)|0; }
  function setCoins(v){ set(KEYS.COINS, Math.max(0, v|0)); }
  function getBest(){ return get(KEYS.BEST, 0)|0; }
  function setBest(v){ set(KEYS.BEST, v|0); }

  // Ownership / skins
  function getOwnedBirds(){ return new Set(get(KEYS.OWN_BIRDS, [0])); }
  function setOwnedBirds(setLike){ set(KEYS.OWN_BIRDS, Array.from(setLike)); }
  function getOwnedPipes(){ return new Set(get(KEYS.OWN_PIPES, [0])); }
  function setOwnedPipes(setLike){ set(KEYS.OWN_PIPES, Array.from(setLike)); }
  function getBirdSkin(){ return get(KEYS.BIRD_SKIN, 0)|0; }
  function setBirdSkin(i){ set(KEYS.BIRD_SKIN, i|0); }
  function getPipeSkin(){ return get(KEYS.PIPE_SKIN, 0)|0; }
  function setPipeSkin(i){ set(KEYS.PIPE_SKIN, i|0); }
  function getBgSkin(){ return get(KEYS.BG_SKIN, 0)|0; }
  function setBgSkin(i){ set(KEYS.BG_SKIN, i|0); }

  // Skins: includes all user-provided birds + 3 legacy defaults
  const BIRD_SKINS = [
    { name:'Pirate',      cost:0,  file:'PirateBird.png' },
    { name:'Stuffed',     cost:30, file:'StuffedBird.png' },
    { name:'Night',       cost:50, file:'NightBird.png' },

    { name:'Lightning',   cost:40, file:'LightningBird.png' },
    { name:'Love',        cost:40, file:'LoveBird.png' },
    { name:'Mummy',       cost:40, file:'MummyBird.png' },
    { name:'American',    cost:40, file:'AmericanBird.png' },
    { name:'Cave',        cost:40, file:'CaveBird.png' },
    { name:'Chef',        cost:40, file:'ChefBird.png' },
    { name:'Death',       cost:40, file:'DeathBird.png' },
    { name:'Fire',        cost:40, file:'FireBird.png' },
    { name:'Green Fire',  cost:40, file:'GreenFireBird.png' },
    { name:'Ice',         cost:40, file:'IceBird.png' },
    { name:'Wood',        cost:40, file:'WoodBird.png' },
    { name:'Jester',      cost:40, file:'JesterBird.png' },
    { name:'Knight',      cost:40, file:'KnightBird.png' },
    { name:'Leaf',        cost:40, file:'LeafBird.png' },
    { name:'Witch',       cost:40, file:'WitchBird.png' }
  ];

  const PIPE_SKINS = [
    { name:'Green',   cost:0,  colors:{ pipe:'#4CAF50', pipeDark:'#3e8f41' } },
    { name:'Teal',    cost:20, colors:{ pipe:'#00BCD4', pipeDark:'#0097A7' } },
    { name:'Purple',  cost:35, colors:{ pipe:'#9C27B0', pipeDark:'#6A1B9A' } },
    { name:'Orange',  cost:40, colors:{ pipe:'#FF9800', pipeDark:'#F57C00' } },
    { name:'Rose',    cost:45, colors:{ pipe:'#E91E63', pipeDark:'#AD1457' } }
  ];

  const BACKGROUND_SKINS = [
    { name:'Sunny',  cost:0,  colors:{sky:'#87CEEB', ground:'#de9f45', cloud:'rgba(255,255,255,.9)'}},
    { name:'Sunset', cost:25, colors:{sky:'#FFB347', ground:'#d38b44', cloud:'rgba(255,240,220,.9)'}},
    { name:'Night',  cost:40, colors:{sky:'#0b1740', ground:'#3b2c1f', cloud:'rgba(255,255,255,.4)'}}
  ];

  global.FF = {
    KEYS, get, set,
    getCoins, setCoins, getBest, setBest,
    getOwnedBirds, setOwnedBirds, getOwnedPipes, setOwnedPipes,
    getBirdSkin, setBirdSkin, getPipeSkin, setPipeSkin, getBgSkin, setBgSkin,
    BIRD_SKINS, PIPE_SKINS, BACKGROUND_SKINS
  };
})(window);
