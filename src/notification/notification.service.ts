
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  sendNotification(studentName: string, message: string) {
    return {
      message: 'Notification sent successfully',
      student: studentName,
      notification: message,
    };
  }

  checkEnrollmentAndNotify(studentName: string, courseId: string) {
    return {
      message: 'Enrollment checked successfully',
      student: studentName,
      courseId,
      enrollments: {
        message: 'All enrollments fetched',
        data: [],
      },
    };
  }
}
