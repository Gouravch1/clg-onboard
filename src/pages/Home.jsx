import styled, { keyframes, css } from "styled-components";
import { useCallback, useEffect, useState, useRef } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { createGlobalStyle } from "styled-components";
import partner1 from '../assets/partner1.png';
import partner2 from '../assets/partner2.jpeg'; // Note the .jpeg extension
import partner3 from '../assets/partner3.png';
import partner4 from '../assets/partner9.jpeg';
import partner5 from '../assets/partner8.png';

// Enhanced animations without GSAP
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Advanced animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const glowText = keyframes`
  0% { text-shadow: 0 0 10px rgba(255,255,255,0.1); }
  50% { text-shadow: 0 0 20px rgba(255,255,255,0.3), 0 0 30px rgba(255,255,255,0.2); }
  100% { text-shadow: 0 0 10px rgba(255,255,255,0.1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const float3D = keyframes`
  0%, 100% { transform: translateZ(0) translateY(0) rotateX(0); }
  25% { transform: translateZ(20px) translateY(-5px) rotateX(2deg); }
  75% { transform: translateZ(-20px) translateY(5px) rotateX(-2deg); }
`;

const glowPulse = keyframes`
  0%, 100% { text-shadow: 0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(0,255,255,0.2); }
  50% { text-shadow: 0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(0,255,255,0.3); }
`;

const scrollDownAnimation = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(10px); opacity: 0.5; }
  100% { transform: translateY(0); opacity: 1; }
`;

const scrollArrowAnimation = keyframes`
  0% { transform: translate(-50%, 0); opacity: 1; }
  50% { transform: translate(-50%, 10px); opacity: 0.5; }
  100% { transform: translate(-50%, 0); opacity: 1; }
`;

const countUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const revealText = keyframes`
  from {
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
    opacity: 0;
  }
  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    opacity: 1;
  }
`;

const parallaxFloat = keyframes`
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-5px) translateX(2px); }
  75% { transform: translateY(5px) translateX(-2px); }
`;

const floatGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const gradientMove = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const scrollLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const wave = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(10deg); }
  75% { transform: rotate(-10deg); }
  100% { transform: rotate(0deg); }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(78, 204, 163, 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(78, 204, 163, 0); }
  100% { box-shadow: 0 0 0 0 rgba(78, 204, 163, 0); }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: 
    linear-gradient(120deg, 
      rgba(0, 66, 66, 0.9) 0%,
      rgba(0, 77, 77, 0.9) 35%,
      rgba(0, 89, 89, 0.9) 70%,
      rgba(0, 66, 66, 0.9) 100%
    ),
    linear-gradient(
      60deg,
      rgba(78, 204, 163, 0.1) 0%,
      rgba(0, 89, 89, 0.1) 50%,
      rgba(78, 204, 163, 0.1) 100%
    ),
    radial-gradient(
      circle at top right,
      rgba(78, 204, 163, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at bottom left,
      rgba(0, 255, 255, 0.1) 0%,
      transparent 50%
    );
  background-size: 200% 200%, 200% 200%, 100% 100%, 100% 100%;
  animation: ${gradientMove} 15s ease infinite;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: min(4rem, 8vw);
  scroll-snap-align: start;
  scroll-snap-stop: always;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      120deg,
      rgba(78, 204, 163, 0.1),
      rgba(44, 120, 115, 0.1)
    );
    filter: blur(100px);
    pointer-events: none;
    animation: ${gradientMove} 15s ease infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(78, 204, 163, 0.1) 0%,
      transparent 50%
    );
    pointer-events: none;
    opacity: 0.6;
    mix-blend-mode: screen;
  }

  .parallax-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(78, 204, 163, 0.15),
      transparent 50%
    );
  }
`;

const Logo = styled.h1`
  color: white;
  font-family: 'Space Grotesk', sans-serif;
  font-size: min(1rem, 4vw);
  font-weight: 300;
  letter-spacing: min(5px, 2vw);
  margin: 0;
  z-index: 2;
  position: absolute;
  top: 3rem;
  left: 3rem;
  opacity: 0;
  animation: ${fadeIn} 1s ease-out forwards,
             ${float3D} 8s ease-in-out infinite reverse;
  transform-style: preserve-3d;
  perspective: 1000px;

  &:hover {
    transform: translateZ(20px) scale(1.05);
    text-shadow: 
      0 0 20px rgba(255,255,255,0.4),
      0 0 40px rgba(0,255,255,0.2);
  }
`;

const MainText = styled.div`
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
  z-index: 2;
  text-align: center;
  white-space: nowrap;

  .text-wrapper {
    position: relative;
    display: inline-block;
    padding-top: 0.1em;
    padding-right: 0.05em;
    padding-bottom: 0.15em;
  }

  .title {
    color: white;
    font-family: 'Oswald', sans-serif;
    font-size: min(4.5rem, 15vw);
    font-weight: 600;
    font-style: italic;
    letter-spacing: min(8px, 2vw);
    line-height: 1.2;
    animation: ${revealText} 1s cubic-bezier(0.77, 0, 0.175, 1) forwards,
               ${floatGradient} 8s linear infinite;
    transform-style: preserve-3d;
    perspective: 1000px;
    background: linear-gradient(
      120deg,
      #ffffff 0%,
      #4ecca3 50%,
      #ffffff 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    color: rgba(255, 255, 255, 0.8);
    font-family: 'Space Grotesk', sans-serif;
    font-size: min(1.2rem, 4vw);
    letter-spacing: 4px;
    margin-top: 1rem;
    opacity: 0;
    animation: ${fadeIn} 0.8s ease-out 0.5s forwards;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(78, 204, 163, 0.8), transparent);
      transform: scaleX(0);
      transition: transform 0.6s ease;
    }

    &:hover::after {
      transform: scaleX(1);
    }
  }
`;

const SignInButton = styled.button`
  background: white;
  color:rgb(23, 23, 23);
  border: none;
  padding: min(1rem, 3vw) min(3rem, 8vw);
  font-size: min(1rem, 4vw);
  font-weight: 600;
  font-family: 'Space Grotesk', sans-serif;
  cursor: pointer;
  position: absolute;
  bottom: 4rem;
  right: 4rem;
  z-index: 2;
  letter-spacing: min(2px, 1vw);
  opacity: 0;
  animation: ${fadeIn} 1s ease-out 0.6s forwards;
  transition: all 0.3s ease;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;
  
  &::before {
    content: '';
    position: absolute;
    inset: -5px;
    background: linear-gradient(45deg, #4ecca3, #1E40AF, #4ecca3);
    background-size: 200% 200%;
    animation: ${floatGradient} 5s linear infinite;
    border-radius: inherit;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;

  }

  .hover-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  &:hover span:not(.hover-text) {
    opacity: 0;
  }

  &:hover .hover-text {
    opacity: 1;
  }

  &:hover {
    transform: translateY(-5px) translateZ(20px) rotateX(10deg);
    box-shadow: 
      0 20px 40px rgba(0,0,0,0.3),
      0 0 20px rgba(0,255,255,0.2);
    letter-spacing: min(3px, 1.5vw);
  }

  &:active {
    transform: translateY(-2px) translateZ(10px);
    box-shadow: 
      0 10px 20px rgba(0,0,0,0.2),
      0 0 15px rgba(0,255,255,0.1);
  }
`;

const ParticlesContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  z-index: 1;
  animation: ${float} 6s ease-in-out infinite;
`;

const FloatingOrbs = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  perspective: 1000px;
  transform-style: preserve-3d;
  z-index: 1;

  &::before, &::after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: ${float3D} 10s ease-in-out infinite;
  }

  &::before {
    top: 20%;
    left: 20%;
    animation-delay: -2s;
  }

  &::after {
    bottom: 20%;
    right: 20%;
    animation-delay: -5s;
  }
`;

const ScrollArrow = styled.div`
  position: fixed;
  bottom: min(2rem, 5vh);
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, transform 0.3s ease;
  cursor: pointer;

  svg {
    width: min(30px, 5vw);
    height: min(30px, 5vw);
    fill: rgba(255, 255, 255, 0.8);
    animation: ${scrollArrowAnimation} 2s infinite ease-in-out;
  }

  &:hover {
    transform: translate(-50%, 5px);
  }
`;

const MissionSection = styled.section`
  min-height: 100vh;
  width: 100%;
  background: 
    linear-gradient(120deg, 
      rgba(0, 66, 66, 0.9) 0%,
      rgba(0, 77, 77, 0.9) 35%,
      rgba(0, 89, 89, 0.9) 70%,
      rgba(0, 66, 66, 0.9) 100%
    ),
    linear-gradient(
      60deg,
      rgba(78, 204, 163, 0.1) 0%,
      rgba(0, 89, 89, 0.1) 50%,
      rgba(78, 204, 163, 0.1) 100%
    );
  background-size: 200% 200%;
  animation: ${gradientMove} 15s ease infinite;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  position: relative;
  box-sizing: border-box;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  padding-bottom: 0;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(78, 204, 163, 0.05) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(78, 204, 163, 0.5),
      transparent
    );
  }
`;

const MissionTitle = styled.h2`
  font-family: 'Oswald', sans-serif;
  font-size: min(3.5rem, 10vw);
  font-weight: 400;
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: 2px;
`;

const MissionText = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: min(1.2rem, 4vw);
  line-height: 1.8;
  max-width: 800px;
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0.9;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  width: 100%;
  max-width: 1200px;
  margin-top: 2rem;
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: all 0.3s ease;
  animation: ${countUp} 1s ease-out forwards;
  animation-play-state: paused;
  position: relative;
  overflow: hidden;

  &.visible {
    animation-play-state: running;
  }

  &:hover {
    transform: translateY(-5px) rotateX(5deg);
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      800px circle at var(--mouse-x) var(--mouse-y),
      rgba(78, 204, 163, 0.1),
      transparent 40%
    );
    opacity: 0;
    transition: opacity 0.5s;
  }

  &:hover::before {
    opacity: 1;
  }

  .stat-number {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #4ECCA3, transparent);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease;
    }
  }

  &:hover .stat-number::after {
    transform: scaleX(1);
  }

  .icon-wrapper {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      inset: -10px;
      border-radius: 50%;
      background: rgba(78, 204, 163, 0.2);
      animation: ${pulseGlow} 2s infinite;
    }
  }

  .glow {
    position: absolute;
    width: 100px;
    height: 100px;
    background: radial-gradient(
      circle at center,
      rgba(78, 204, 163, 0.3),
      transparent 70%
    );
    border-radius: 50%;
    pointer-events: none;
    mix-blend-mode: screen;
    animation: ${glowPulse} 2s ease-in-out infinite;
  }

  .icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #4ecca3;
    animation: ${parallaxFloat} 3s ease-in-out infinite;
  }
`;

const StatNumber = styled.h3`
  font-family: 'Oswald', sans-serif;
  font-size: min(3rem, 8vw);
  font-weight: 500;
  margin: 0;
  color: #4ecca3;
`;

const StatLabel = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: min(1rem, 3vw);
  margin-top: 0.5rem;
  opacity: 0.8;
  text-align: center;
`;

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    height: auto;
    min-height: 100vh;
  }

  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500&display=swap');
`;

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  @media (prefers-reduced-motion: no-preference) {
    scroll-snap-type: y mandatory;
  }
`;

const ParallaxSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateY(${props => props.offset}px);
  transition: transform 0.1s ease-out;
`;

const Scene3D = styled.div`
  perspective: 1000px;
  width: 100%;
  height: 100vh;
  position: relative;
  transform-style: preserve-3d;
`;

// Add smooth scroll utilities
const smoothScroll = {
  timer: null,
  start: 0,
  target: 0,
  duration: 500,
  
  animate(currentTime) {
    if (!this.start) this.start = currentTime;
    const progress = (currentTime - this.start) / this.duration;
    
    if (progress < 1) {
      window.scrollTo(0, this.start + (this.target - this.start) * this.easeInOutCubic(progress));
      requestAnimationFrame(this.animate.bind(this));
    } else {
      window.scrollTo(0, this.target);
      this.start = 0;
    }
  },
  
  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
};

const PartnersSection = styled.section`
  padding: 2rem 0;
  margin: 2rem 0;
`;

const PartnersTitle = styled.h2`
  font-size: 2.5rem;
  color: white;
  text-align: center;
  margin-bottom: 1.5rem;
  font-family: 'Oswald', sans-serif;
  font-weight: 450;
  letter-spacing: 2px;
  text-transform: uppercase;
  
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: #4ECCA3;
    margin: 0.5rem auto;
  }
`;

const PartnersTrack = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const PartnersContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 0 60px;
`;

const PartnerBox = styled.div`
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  transition: all 0.3s ease;
  font-family: 'Space Grotesk', sans-serif;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const PartnerIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.8;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const Partners = styled.div`
  display: inline-flex;
  gap: 4rem;
  transition: transform 0.3s ease;
`;

const NavButton = styled.button`
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 24px;
  z-index: 2;

  &:hover {
    background: rgba(78, 204, 163, 0.2);
  }
`;

const Footer = styled.footer`
  background: linear-gradient(
    180deg,
    rgba(0, 66, 66, 0.95) 0%,
    rgba(0, 44, 44, 0.98) 100%
  );
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(78, 204, 163, 0.5),
      transparent
    );
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  position: relative;
  z-index: 1;
`;

const FooterColumn = styled.div`
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeInUp} 0.6s ease-out forwards;
  animation-delay: ${props => props.delay}s;

  h3 {
    color: #4ECCA3;
    font-family: 'Oswald', sans-serif;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
  width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #4ECCA3, transparent);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease;
    }
    
    &:hover::after {
      transform: scaleX(1);
    }
  }
`;

const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  display: block;
  margin-bottom: 1rem;
  font-family: 'Space Grotesk', sans-serif;
  transition: all 0.3s ease;
  position: relative;
  width: fit-content;

  &::before {
    content: '→';
    position: absolute;
    left: -20px;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
  }

  &:hover {
    color: #4ECCA3;
    transform: translateX(20px);
    
    &::before {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;

  svg {
    margin-right: 0.5rem;
    font-size: 1.2rem;
    color: #4ECCA3;
  }

  &:hover {
    color: #4ECCA3;
    transform: translateX(10px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, #4ECCA3, #2C7873);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  svg {
    z-index: 1;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(78, 204, 163, 0.3);

    &::before {
      opacity: 1;
    }

    svg {
      transform: scale(1.2);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;

  a {
    color: #4ECCA3;
    text-decoration: none;
    transition: color 0.3s ease;
  
  &:hover {
      color: white;
    }
  }
`;

function Home() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);
  const [showScroll, setShowScroll] = useState(true);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (scrollPosition > windowHeight * 0.8) {
        setShowScroll(false);
      } else {
        setShowScroll(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleParallax = () => {
      const offset = window.pageYOffset;
      setScrollOffset(offset * 0.5); // Adjust speed factor as needed
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Interactive stat cards
  const handleStatBoxMouseMove = (e, box) => {
    const rect = box.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    box.style.setProperty('--mouse-x', `${x}%`);
    box.style.setProperty('--mouse-y', `${y}%`);
  };

  // Smooth scroll handler
  const handleScrollClick = useCallback(() => {
    const nextSection = document.querySelector('#mission-section');
    if (!nextSection) return;

    const targetPosition = nextSection.offsetTop;
    smoothScroll.start = window.pageYOffset;
    smoothScroll.target = targetPosition;
    smoothScroll.timer = requestAnimationFrame(smoothScroll.animate.bind(smoothScroll));
  }, []);

  // Update scroll visibility with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScroll(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.3,
      }
    );

    const heroSection = document.querySelector('#hero-section');
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => observer.disconnect();
  }, []);

  // Add this partners data
  const partners = [
    { icon: '🏛️', name: 'University of Excellence' },
    { icon: '🌟', name: 'Innovation Hub' },
    { icon: '🔬', name: 'Research Institute' },
    { icon: '🎓', name: 'Global Education' },
    { icon: '💡', name: 'Tech Solutions' },
    { icon: '🤝', name: 'Community Partners' },
    { icon: '🌍', name: 'World Foundation' },
    { icon: '📚', name: 'Learning Center' },
  ];

  // Add mouse position tracking for parallax effects
  const handleMouseMove = useCallback((e) => {
    const cards = document.querySelectorAll('.magnetic');
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      
      // Magnetic effect
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = (x - centerX) * 0.1;
      const deltaY = (y - centerY) * 0.1;
      
      card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
  }, []);

  // Add smooth parallax scrolling
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach((el) => {
      const speed = el.dataset.speed || 0.5;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    // Replace GSAP animations with useEffect and CSS
    const elements = document.querySelectorAll('.hero-content');
    elements.forEach((el, index) => {
      el.style.animation = `${fadeInUp} 0.6s ease-out forwards ${index * 0.2}s`;
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  // Add this function for number animation
  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      element.textContent = current.toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const handlePartnerScroll = (direction) => {
    const container = document.querySelector('.partners-container');
    const partners = container.querySelector('.partners');
    
    if (container) {
      const scrollAmount = 300;
      const currentScroll = container.scrollLeft;
      const newScroll = direction === 'right' 
        ? currentScroll + scrollAmount 
        : currentScroll - scrollAmount;
      
      container.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
      
      // Debug logs
      console.log('Scrolling:', direction);
      console.log('Current scroll:', currentScroll);
      console.log('New scroll:', newScroll);
    }
  };

  return (
    <PageWrapper>
      <GlobalStyle />
      <Scene3D>
        <Container id="hero-section">
          <ParallaxSection offset={scrollOffset}>
            <FloatingOrbs />
            <Logo>SYSTEMIC ALTRUISM</Logo>
            <MainText>
              <div className="text-wrapper">
                <h1 className="title"> BE AN ALTRUIST</h1>
                <p className="subtitle">MAKE A DIFFERENCE TODAY</p>
              </div>
            </MainText>
            <SignInButton ref={buttonRef}>
              <span>SIGN IN</span>
              <span className="hover-text">JOIN US →</span>
            </SignInButton>
          </ParallaxSection>
          <ParticlesContainer>
            <Particles
              id="tsparticles"
              init={particlesInit}
              options={{
                fullScreen: false,
                background: {
                  opacity: 0
                },
                particles: {
                  color: {
                    value: "#ffffff",
                  },
                  number: {
                    value: 100,
                    density: {
                      enable: true,
                      area: 800
                    }
                  },
                  size: {
                    value: { min: 1, max: 3 },
                    random: true,
                  },
                  move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    outModes: "out",
                    attract: {
                      enable: true,
                      rotateX: 600,
                      rotateY: 1200
                    }
                  },
                  links: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.3,
                    width: 1,
                    triangles: {
                      enable: true,
                      opacity: 0.1
                    }
                  },
                  shape: {
                    type: "circle"
                  },
                  opacity: {
                    value: 0.5,
                    random: true,
                    animation: {
                      enable: true,
                      speed: 1,
                      minimumValue: 0.1,
                      sync: false
                    }
                  },
                },
                interactivity: {
                  events: {
                    onHover: {
                      enable: true,
                      mode: "grab"
                    },
                    onClick: {
                      enable: true,
                      mode: "push"
                    }
                  },
                  modes: {
                    grab: {
                      distance: 200,
                      links: {
                        opacity: 0.5
                      }
                    },
                    push: {
                      quantity: 4
                    }
                  }
                }
              }}
            />
          </ParticlesContainer>
          <ScrollArrow 
            show={showScroll} 
            onClick={handleScrollClick}
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
          </ScrollArrow>
        </Container>
      </Scene3D>

      <MissionSection id="mission-section">
        <MissionTitle>Our Mission</MissionTitle>
        <MissionText>
          We empower college students to become catalysts for systemic change. 
          By connecting passionate individuals with meaningful opportunities, 
          we're building a network of future leaders committed to making a lasting impact on society.
        </MissionText>
        
        <StatsContainer ref={statsRef}>
          {[
            { number: '150+', label: 'Colleges Onboarded', icon: '🏛️' },
            { number: '10K+', label: 'Students Enrolled', icon: '👥' },
            { number: '5K+', label: 'Active Contributors', icon: '🌟' },
            { number: '200+', label: 'Clubs Formed', icon: '🤝' }
          ].map((stat, index) => (
            <StatCard 
              key={index}
              className={isVisible ? 'visible' : ''}
              onMouseMove={(e) => handleStatBoxMouseMove(e, e.currentTarget)}
            >
              <div className="glow" />
              <span className="icon">{stat.icon}</span>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsContainer>

        <PartnersSection>
          <PartnersTitle>Our Partners</PartnersTitle>
          <div style={{ position: 'relative', width: '100%', padding: '0 40px' }}>
            <button 
              onClick={() => handlePartnerScroll('left')}
              style={{
                position: 'absolute',
                left: '-20px',  // Adjusted position
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                zIndex: 10,
                fontSize: '20px'
              }}
            >
              &#8249;
            </button>

            <div 
              className="partners-container"
              style={{
                overflowX: 'hidden',
                whiteSpace: 'nowrap',
                scrollBehavior: 'smooth',
                position: 'relative'
              }}
            >
              <div className="partners" style={{ display: 'inline-flex', gap: '4rem' }}>
                <PartnerBox>
                  <PartnerIcon src={partner1} alt="Partner 1" />
                </PartnerBox>
                <PartnerBox>
                  <PartnerIcon src={partner2} alt="Partner 2" />
                </PartnerBox>
                <PartnerBox>
                  <PartnerIcon src={partner3} alt="Partner 3" />
                </PartnerBox>
                <PartnerBox>
                  <PartnerIcon src={partner4} alt="Partner 4" />
                </PartnerBox>
                <PartnerBox>
                  <PartnerIcon src={partner5} alt="Partner 5" />
                </PartnerBox>
              </div>
            </div>

            <button 
              onClick={() => handlePartnerScroll('right')}
              style={{
                position: 'absolute',
                right: '-20px',  // Adjusted position
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                zIndex: 10,
                fontSize: '20px'
              }}
            >
              &#8250;
            </button>
          </div>
        </PartnersSection>
      </MissionSection>

      <Footer>
        <FooterContent>
          <FooterColumn delay={0.2}>
            <h3>Quick Links</h3>
            <FooterLink href="#about">About Us</FooterLink>
            <FooterLink href="#programs">Our Programs</FooterLink>
            <FooterLink href="#impact">Our Impact</FooterLink>
            <FooterLink href="#join">Join Movement</FooterLink>
            <FooterLink href="#resources">Resources</FooterLink>
          </FooterColumn>

          <FooterColumn delay={0.4}>
            <h3>Get Involved</h3>
            <FooterLink href="#volunteer">Volunteer</FooterLink>
            <FooterLink href="#donate">Donate</FooterLink>
            <FooterLink href="#partner">Partner With Us</FooterLink>
            <FooterLink href="#events">Upcoming Events</FooterLink>
            <FooterLink href="#newsletter">Newsletter</FooterLink>
          </FooterColumn>

          <FooterColumn delay={0.6}>
            <h3>Contact Us</h3>
            <ContactInfo>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              contact@systemic-altruism.org
            </ContactInfo>
            <ContactInfo>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/>
              </svg>
              1-800-ALTRUISM
            </ContactInfo>
            <ContactInfo>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              123 Impact Avenue, Change City, 12345
            </ContactInfo>
            
            <SocialLinks>
              <SocialIcon href="https://twitter.com" target="_blank" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.566.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="https://instagram.com" target="_blank" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 2.618 6.78 6.98 6.98 1.281.059 1.69-.073 4.948-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </SocialIcon>
            </SocialLinks>
          </FooterColumn>
        </FooterContent>

        <Copyright>
          © {new Date().getFullYear()} Systemic Altruism. All rights reserved. | 
          <a href="/privacy"> Privacy Policy</a> | 
          <a href="/terms"> Terms of Service</a>
        </Copyright>
      </Footer>
    </PageWrapper>
  );
}

export default Home;