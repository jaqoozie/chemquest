'use client';
import React, { useState, useEffect } from 'react';

interface KillForm {
  copText: { value: string };
  yourHp: { value: number };
  copsHp: { value: number };
}

interface Drug {
  name: string;
  price: number;
  quantity: number;
}

const KnarkGame: React.FC = () => {
  const cookieName = 'pip182';
  const setCookie = (name: string, value: number) => {
    localStorage.setItem(name, value.toString());
  };
  const setprices = [
    420, 500, 1500, 2000, 10000, 1000, 7000, 15000, 200, 300, 3000, 30,
  ];
  const getCookie = (name: string): number => {
    if (localStorage) {
      const fromLocalStorage = localStorage.getItem(name);
      if (fromLocalStorage) {
        return parseInt(fromLocalStorage);
      }
    }
    return 0;
  };
  //@ts-ignore
  const [drugs, setDrugs] = useState<Drug[]>([
    { name: 'Marijuana', price: 420, quantity: 0 },
    { name: 'Svampar', price: 500, quantity: 0 },
    { name: 'LSD', price: 1500, quantity: 0 },
    { name: 'Opium', price: 2000, quantity: 0 },
    { name: 'Heroin', price: 10000, quantity: 0 },
    { name: 'Brass', price: 1000, quantity: 0 },
    { name: 'Nuke', price: 7000, quantity: 0 },
    { name: 'Kokain', price: 15000, quantity: 0 },
    { name: 'Tjack', price: 200, quantity: 0 },
    { name: 'Meskalin', price: 300, quantity: 0 },
    { name: 'Crack', price: 3000, quantity: 0 },
    { name: 'Exstacy', price: 30, quantity: 0 },
  ]);

  const RefreshSale = () => {
    clearSelections();
    let tempDrugs: Drug[] = [];
    Object.assign(tempDrugs, drugs);
    for (let x = 0; x < 12; x++) {
      let currentDrug = tempDrugs[x];
      if (x == 0 || x == 1 || x == 8 || x == 9) {
        currentDrug.price = setprices[x] + random(420);
      } else if (x == 11) {
        currentDrug.price = setprices[x] + random(100);
      } else if (x == 10) {
        currentDrug.price = setprices[x] + random(12000);
      } else {
        currentDrug.price = setprices[x] + random(8000);
      }
    }
    if (firstTime > 0) randomevent();
    else setFirstTime(1);
    setDaysLeft((daysLeft) => daysLeft - 1);
    if (daysLeft == 1) {
      alert('Det här är din sista dag!');
      setFirstTime(0);
    }
    if (daysLeft <= 0) {
      alert(
        'Du har fixat ' +
          Currency(cash) +
          ' genom att sälja knark,  nu är bin Ladin stolt över dig.',
      );
      setDaysLeft(31);
      for (let x = 0; x < 12; x++) {
        let currentDrug = tempDrugs[x];
        if (x == 0 || x == 1 || x == 8 || x == 9) {
          currentDrug.price = setprices[x] + random(420);
        } else if (x == 10 || x == 11) {
          currentDrug.price = setprices[x] + random(100);
        } else {
          currentDrug.price = setprices[x] + random(5000);
        }
      }
      for (let x = 0; x < 12; x++) {
        setYourDrugs([]);
      }
      if (oldScore !== undefined && cash > oldScore) {
        alert('GRATTIS!! Du har slagit ditt eget rekord!!');
        setCookie(cookieName, cash);
        setOldScore(cash);
      }
      setCash(2500);
      setSLeft(0);
      setSAvail(100);
    }
  };

  const [cash, setCash] = useState(2500);
  const [daysLeft, setDaysLeft] = useState(32);
  const [yHP, setYHP] = useState(50);
  const [cHP, setCHP] = useState(50);
  const [firstTime, setFirstTime] = useState(0);
  const [yourdrugs, setYourDrugs] = useState<Drug[]>([]);
  const [gameLayer1, setGameLayer1] = useState(true);
  const [gameLayer2, setGameLayer2] = useState(false);
  const [sAvail, setSAvail] = useState(100);
  const [sLeft, setSLeft] = useState(0);
  const [init, setInit] = useState(false);
  const [selectedDrugToBuy, setSelectedDrugToBuy] = useState(-1);
  const [selectedDrugToSell, setSelectedDrugToSell] = useState(-1);

  const [oldScore, setOldScore] = useState(0); //

  const [killForm, setKillForm] = useState<KillForm>({
    copText: { value: '' },
    yourHp: { value: 0 },
    copsHp: { value: 0 },
  });

  useEffect(() => {
    const savedRecord = getCookie(cookieName);
    setOldScore(savedRecord!);
    if (!init) {
      RefreshSale();
      setInit(true);
    }
  }, []);

  const clearSelections = () => {
    setSelectedDrugToBuy(-1);
    setSelectedDrugToSell(-1);
  };

  const killCops = () => {
    let hit = random(20);
    setCHP(cHP - hit);
    killForm.copText.value = 'Du orsakade ' + hit + ' kulhål.';
    if (refreshCops() === 2) {
      hit = random(10000) + (10000 * 2) / 1.52 + random(2000);
      alert('Du mördade snuten och tjänade ' + Currency(hit) + ' på det!');
      setCash(cash + hit);
      setGameLayer1(true);
      setGameLayer2(false);
      setFirstTime(0);
      RefreshSale();
      return;
    }
    hit = random(20);
    setYHP(yHP - hit);
    killForm.copText.value =
      killForm.copText.value +
      '\n\nBången orsakade ' +
      hit +
      ' kulhål på dig!!';
    if (refreshCops() === 1) {
      alert('Du fick käka bly, DU ÄR TOT MAL!!');
      setDaysLeft(0);
      setGameLayer1(true);
      setGameLayer2(false);
      setFirstTime(0);
      RefreshSale();
    }
  };

  const refreshCops = () => {
    let tempKillForm: KillForm = {
      copText: { value: '' },
      yourHp: { value: 0 },
      copsHp: { value: 0 },
    };
    Object.assign(killForm, tempKillForm);
    tempKillForm.yourHp.value = yHP;
    tempKillForm.copsHp.value = cHP;

    setKillForm(tempKillForm);

    if (yHP <= 0) {
      return 1;
    }
    if (cHP <= 0) {
      return 2;
    }

    return;
  };

  const runAway = () => {
    let run = random(2);
    if (run === 1) {
      alert('Du lyckades fly.');
      setGameLayer1(true);
      setGameLayer2(false);
      return;
    }
    if (run === 2) {
      alert('Det gick inte, försök igen eller slåss som en man.');
      let hit = random(20);
      setYHP(yHP - hit);
      killForm.copText.value = 'Bången orsakade ' + hit + ' kulhål på dig.';
      if (refreshCops() === 1) {
        alert('Bången spöade skiten ur dig!!');
        setDaysLeft(0);
        setGameLayer1(true);
        setGameLayer2(false);
        RefreshSale();
      }
    }
  };

  const random = (maxValue: number) => {
    let randscript = -1;
    while (randscript < 1 || randscript > maxValue || isNaN(randscript)) {
      randscript = Math.random() * (maxValue + 1);
    }
    return Math.round(randscript);
  };

  const Currency = (number: number) => {
    let num = new String(number);
    if (num.indexOf('.') === -1) {
      num += '.00';
    }
    if (num.indexOf('.') === num.length - 2) {
      num += '0';
    }
    return num;
  };

  const calcmax = (p: number) => {
    console.log(`Incoming price for the drug is ${p}`);
    let mp;
    let max = sAvail - sLeft;
    console.log(`Max total diregarding prics is ${max}`);
    for (let x = 0; x <= max; x++) {
      mp = p * x;
      if (mp >= cash || x == max || p * (x + 1) > cash) {
        return x;
      }
    }
    return 0;
  };

  const randomevent = () => {
    let x = random(3);
    console.log(`The chosen random event was ${x}`);
    if (x === 0) {
      alert('Bången är här, det blir skottlossning!');
      setGameLayer1(false);
      setGameLayer2(true);
      killForm.copText.value = '';
      setYHP(50);
      setCHP(50);
      refreshCops();
    }
    if (x === 1) {
      let xx = random(12);
      if (xx === 4) {
        alert('Frälsningarmen delar ut gratis LSD, priserna är skitlåga!');
        drugs[2].price = 100 + random(35);
      }
      if (xx === 2) {
        alert('Uteliggarna är desperata och köper Tjack för dyra pengar.');
        drugs[8].price = 1000 + random(500);
      }
      if (xx === 3) {
        alert('Marijuanan är väldigt billig just nu.');
        drugs[0].price = 10 + random(100);
      }
      if (xx === 5) {
        let lost = random(2000);
        if (cash - lost < 0) lost = cash;
        alert('Du blev rånad på ' + Currency(lost));
        setCash(cash - lost);
        if (cash < 0) setCash(0);
      }
      if (xx === 1) {
        alert('Ögan vill ha kokain! Han går gärna till Överpriser.');
        drugs[8].price = 25000 + random(12000);
      }
      if (xx === 6) {
        alert('Bången beslagtar stora mängder Marijuana, priserna höjs.');
        drugs[0].price = 1000 + random(1000);
      }
      if (xx === 7) {
        let poo = random(5);
        let x = random(12) - 1;
        alert('Haschman bjuder dig på lite ' + drugs[x].name + '.');
        const savedQuantity = yourdrugs[x].quantity;
        yourdrugs[x] = drugs[x];
        yourdrugs[x].quantity += poo + savedQuantity;
        setCash(cash + drugs[x].price * poo);
        setGameLayer1(true);
        setGameLayer2(false);
      }
      if (xx === 8) {
        let x = random(12) - 1;
        alert('Lagerrensning på ' + drugs[x].name + '.');

        drugs[x].price = drugs[x].price / 3;
      }
      if (xx === 9) {
        alert('Hippies i stan. Marijuana, Svamp, och LSD-priserna är skyhöga!');
        drugs[0].price = 1000 + random(420);
        drugs[1].price = 2000 + random(2000);
        random(2000);
      }
      if (xx === 10) {
        alert('Stort beslag av Opium, priserna är helt sanslösa!!');
        drugs[3].price = 10000 + random(10000);
      }
      if (xx === 11) {
        let x = random(12) - 1;
        alert(
          'Snuten beslagtar mängder av ' +
            drugs[x].name +
            '. Priserna fördubblade!',
        );
        drugs[x].price = drugs[x].price * 2;
      }
      if (xx === 12) {
        let x = random(12) - 1;
        alert('Ful ' + drugs[x].name + ' cirkulerar! Priserna 1/4 av vanliga.');
        drugs[x].price = drugs[x].price / 4;
      }
      if (xx === 14) {
        alert('Inbrott på apoteket, Exstacypriserna l�ga.');
        drugs[11].price = 1 + random(10);
      }
      if (xx === 15) {
        let x = 500 + random(100);
        let x2 = confirm(
          'Vill du modifiera din knarksäljarjacka, så att den rymmer 50 påsar till för ynka ' +
            Currency(x) +
            '?',
        );
        if (x2 === true && cash >= x) {
          setCash(cash - Number(x));
          setSAvail(sAvail + 50);
        } else if (x2 === true && cash < x) {
          alert('Du har för lite stålar ser jag!');
        }
      }
      if (xx === 16) {
        alert('Pounders betalar mycket pengar för lite heroin.');
        drugs[x].price = 20000 + random(20000);
      }
      if (xx === 17 || xx === 13 || xx === 18) {
        alert('Bången år här, det blir skottlossning!');
        setGameLayer1(false);
        setGameLayer2(true);
        killForm.copText.value = '';
        setYHP(50);
        setCHP(50);
        refreshCops();
      }
    }
  };

  const sellit = () => {
    let sel: number = selectedDrugToSell;
    if (sel === -1) {
      alert('Välj en drog först!');
      return;
    }
    let promptInput = prompt(
      'Hur  mycket ' + yourdrugs[sel].name + ' vill du sälja?',
      yourdrugs[sel].quantity.toString(),
    );
    if (promptInput === null) return;

    let quantityToSellFromPrompt = parseInt(promptInput);
    if (quantityToSellFromPrompt > 0) {
      if (quantityToSellFromPrompt < 0) {
        alert('Inga negativa tal, ditt såp!!');
        return;
      }
      if (quantityToSellFromPrompt === 0) return;
      if (quantityToSellFromPrompt <= yourdrugs[sel].quantity) {
        setCash(cash + drugs[sel].price * quantityToSellFromPrompt);
        setSLeft(sLeft - quantityToSellFromPrompt);
        setSAvail(sAvail);
      } else {
        alert('Slut på plats!!!');
        return;
      }
    }
    clearSelections();
  };
  const buyit = () => {
    let sel = selectedDrugToBuy;
    if (sel === -1) {
      alert('Välj en drog först!');
      return;
    }
    let fromPrompt = prompt(
      'Hur  mycket ' + drugs[sel].name + ' vill du ha?',
      calcmax(drugs[sel].price).toString(),
    );
    if (fromPrompt === null) return;

    const quantity = parseInt(fromPrompt!);
    console.log(
      `Quantity: ${quantity}, Spots left is ${sLeft}, Total Cash is ${cash}, Spots Available : ${sAvail} , Total Cost of Drugs are : ${drugs[sel].price * Number(quantity)},Clause 1 is ${drugs[sel].price * quantity <= cash} Clause 2 is ${Number(sLeft) + Number(quantity) <= Number(sAvail)}`,
    );
    if (quantity < 0) {
      alert('Inga negativa tal, ditt såp!!');
      return;
    }
    if (quantity === 0) return;
    if (drugs[sel].price * quantity <= cash && sLeft + quantity <= sAvail) {
      yourdrugs[sel] = drugs[sel];
      yourdrugs[sel].quantity = quantity;
      setCash(cash - drugs[sel].price * quantity);
      setSLeft(sLeft + quantity);
      setGameLayer1(true);
      setGameLayer2(false);
    } else if (quantity > 0 && cash < drugs[sel].price * quantity) {
      alert('Du har för lite stålar!');
      return;
    } else {
      alert('Slut på plats!!!');
      return;
    }
    clearSelections();
  };

  const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <>
      {gameLayer2 && (
        <div id="gameLayer2" className="layerClass">
          <form name="killForm">
            <p>Böngen trålar!</p>
            <hr />
            <br />
            <table>
              <tbody>
                <tr>
                  <td width="300" align="left">
                    <p className="b">
                      <b>HJÄLTEN: </b>
                    </p>
                    <center>
                      <input
                        name="yourHp"
                        type="text"
                        value={yHP}
                        className="b"
                        readOnly
                      />
                    </center>

                    <center>
                      <img src="/salja-knark/hero2.gif" />
                    </center>
                  </td>
                  <td>
                    <textarea name="copText" className="textClass"></textarea>
                  </td>
                  <td width="300" align="right">
                    <p className="b">
                      <b>BÖNGEN: </b>
                    </p>
                    <center>
                      <input
                        name="copsHp"
                        type="text"
                        value={cHP}
                        className="b"
                        readOnly
                      />
                    </center>

                    <center>
                      <img src="/salja-knark/snut2.gif" />
                    </center>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
            <input type="button" value="Skjut en snut!" onClick={killCops} />
            <input type="button" value="Fly" onClick={runAway} />
          </form>
        </div>
      )}
      {gameLayer1 && (
        <div id="gameLayer1">
          <center>
            <img src="/salja-knark/text.gif" />
            <br />
          </center>
          <center>
            <form action="#" name="drugform">
              <p className="impClass">
                <b>Stålar:</b>
              </p>
              <input
                name="money"
                className="selClass"
                type="text"
                value={'$' + cash}
                readOnly
              />
              <br />
              <p className="impClass">Plats för knark: </p>
              <div className="inventoryStatus">
                <input
                  className="coatClass"
                  name="spaceLeft"
                  type="text"
                  value={sLeft}
                  readOnly
                />
                <p>/</p>
                <input
                  className="coatClass"
                  name="spaceAvail"
                  type="text"
                  value={sAvail}
                  readOnly
                />
              </div>
              <table>
                <thead>
                  <tr>
                    <th>
                      <center>
                        <input
                          type="button"
                          className="buttClass"
                          value="Köp"
                          name="buy"
                          onClick={buyit}
                        />
                        <br />
                        <p className="impClass">Knark Till Salu:</p>
                        <br />
                      </center>
                    </th>
                    <th>
                      <center>
                        <input
                          type="button"
                          className="buttClass"
                          value="Sälj"
                          name="sell"
                          onClick={sellit}
                        />
                        <br />
                        <p className="impClass">Ditt Knark:</p>
                        <br />
                      </center>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <center>
                        <table className="drugTable">
                          <thead>
                            <tr>
                              <th className="drugColumn">Knark</th>
                              <th className="drugColumn">Pris</th>
                            </tr>
                          </thead>
                          <tbody>
                            {drugs.map((drug, index) => {
                              let classes = `drugRow`;
                              if (index === selectedDrugToBuy) {
                                classes += ' selectedDrugRow';
                              }
                              return (
                                <tr
                                  onClick={() => {
                                    setSelectedDrugToBuy(index);
                                    setSelectedDrugToSell(-1);
                                  }}
                                  key={index}
                                  className={classes}
                                >
                                  <td className="drugColumn">{drug.name}</td>
                                  <td className="drugColumn">
                                    ${numberWithCommas(drug.price)}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </center>
                    </td>
                    <td>
                      <center>
                        <table className="drugTable">
                          <thead>
                            <tr>
                              <th className="drugColumn">Knark</th>
                              <th className="drugColumn">Pris</th>
                            </tr>
                          </thead>
                          <tbody>
                            {yourdrugs.length > 0 &&
                              yourdrugs.map((drug, index) => {
                                let classes = `drugRow`;
                                if (index === selectedDrugToSell) {
                                  classes += ' selectedDrugRow';
                                }
                                return (
                                  <tr
                                    onClick={() => {
                                      setSelectedDrugToBuy(-1);
                                      setSelectedDrugToSell(index);
                                    }}
                                    key={index}
                                    className={classes}
                                  >
                                    <td className="drugColumn">{drug.name}</td>
                                    <td className="drugColumn">
                                      ${numberWithCommas(drug.price)}
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </center>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <input
                type="button"
                className="buttClass"
                value="Fortsätt"
                name="Done"
                onClick={RefreshSale}
              />
              <br />
              <p className="impClass">Dagar Kvar:</p>
              <input
                name="left"
                className="impClass"
                type="text"
                value={daysLeft}
                readOnly
              />
              <br />
              <br />
              <p className="impClass">Ditt bästa hittills:</p>
              <input
                name="score"
                className="selClass"
                type="text"
                value={oldScore}
                readOnly
              />
            </form>
          </center>
        </div>
      )}
    </>
  );
};

export default KnarkGame;
