# app/services/punch_counter.py
import cv2
import mediapipe as mp
import asyncio

mp_pose = mp.solutions.pose

async def start_punch_counting(user_id: int):
    cap = cv2.VideoCapture(0)
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        punch_count = 0
        while True:
            ret, frame = cap.read()
            if not ret:
                break

            # Convert BGR to RGB
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = pose.process(image)

            # Very basic punch detection logic (replace with your own)
            if results.pose_landmarks:
                # Example: increase count if right hand crosses a threshold
                right_wrist = results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_WRIST]
                if right_wrist.y < 0.5:  # simple threshold
                    punch_count += 1

            # Yield punch count to WebSocket
            yield punch_count
            await asyncio.sleep(0.1)  # throttle
