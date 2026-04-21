import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import aiWomenVideo from "../assets/aiWomen.MOV"

const AiWomen = () => {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  // Ovozni yoqish/o'chirish funksiyasi
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      
      <video
        ref={videoRef}
        src={aiWomenVideo}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        style={{
          height: "100%",
          maxWidth: "100%",
          objectFit: "contain",
          pointerEvents: "none", // Video ustiga bosib bo'lmaydi
        }}
      />

      {/* OVOZ TUGMASI - Pastki chap burchakda */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "5%",
          zIndex: 20,
        }}
      >
        <button
          onClick={toggleMute}
          style={{
            padding: "12px",
            // backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            cursor: "pointer",
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            backdropFilter: "blur(5px)",
          }}
          className="bg-primary"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      </div>

      {/* O'NGGA O'TISH TUGMASI - Pastki o'ng burchakda */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          zIndex: 20,
        }}
      >
        <button
          onClick={() => navigate("/home")}
          style={{
            padding: "15px 30px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#fff",
            border: "none",
            borderRadius: "50px",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          } }className="bg-primary"
        >
          Murojat qilish ➜
        </button>
      </div>

      {isMuted && (
        <div style={{
          position: 'absolute',
          top: '20px',
          color: '#fff',
          padding: '5px 15px',
          borderRadius: '20px',
          fontSize: '12px',
          pointerEvents: 'none'
        }} 
        className="bg-primary">
          Ovozni yoqish uchun 🔇 tugmasini bosing
        </div>
      )}
    </div>
  )
}

export default AiWomen