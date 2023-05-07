import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { Images } from "../../Constants";
import "./WhatDo.css";

const WhatDo = () => {
  useEffect(() => {
    Aos.init({ duration: 2500 });
  }, []);
  return (
    <div className="app__whatdo-container" id="section">
      <div className="app__whatdo-content-header">
        <h1>What We Do Provide?</h1>
      </div>
      <main className="app__container" data-aos="">
        <div className="app__container_content-first">
          <div className="app__card-first" data-aos="fade-right">
            <img src={Images.img01} alt="" />
            <div>
              <h3>powerlifting section</h3>
              <p>
                Powerlifting is ultimately about strength. Not just a
                competitive sport, the benefits are tenfold. So, it’s no
                surprise that anyone looking to get some real muscle behind them
                is taking an interest.
              </p>
            </div>
          </div>
        </div>
        <div className="app__container_content-second">
          <div className="app__card-second" data-aos="fade-left">
            <div>
              <h3> Fitness section</h3>
              <p>
                Battle ropes, medicine balls, kettlebells, power plates, kinesis
                stations… this area is one that exercisers can get themselves in
                a sweat about. Functional fitness is the body’s natural way of
                moving
              </p>
            </div>
            <img src={Images.img2} alt="" />
          </div>
        </div>
        <div className="app__container_content-third">
          <div className="app__card-third" data-aos="fade-right">
            <img src={Images.img3} alt="" />
            <div>
              <h3>CrosFit section</h3>
              <p>
                This is the easiest place to start. You’re probably most
                familiar with fitness equipment such as treadmills and
                ellipticals. That’s great. They both brilliantly reliable gym
                staples that you simply turn on.
              </p>
            </div>
          </div>
        </div>
        <div className="app__container_content-fourth">
          <div className="app__card-fourth" data-aos="fade-left">
            <div>
              <h3> bodybulding section</h3>
              <p>
                The basic workout tools in this area include dumbbells,
                barbells, benches, power racks and press stations. When you join
                Friends GYM, we’ll include the amount of sets and reps you need
                to perform in your personalised plan
              </p>
            </div>
            <img src={Images.img4} alt="" />
          </div>
        </div>
        <div className="app__container_content-fifth">
          <div className="app__card-fifth" data-aos="fade-right">
            <img src={Images.img05} alt="" />
            <div>
              <h3> women's section</h3>
              <p>
                Our women's fitness classes range from low to high intensity,
                including aerobic exercise and strength training workouts. At
                Friends GYM, you can always find a fitness program that works
                for you.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WhatDo;
