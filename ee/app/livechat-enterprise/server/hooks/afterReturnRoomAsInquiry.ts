import { callbacks } from '../../../../../app/callbacks/server';
import { LivechatRooms } from '../../../../../app/models/server';
import { settings } from '../../../../../app/settings/server';

const unsetPredictedVisitorAbandonment = ({ room }: { room: any }): void => {
	if (!room?._id || !room?.omnichannel?.predictedVisitorAbandonmentAt) {
		return;
	}

	(LivechatRooms as any).unsetPredictedVisitorAbandonmentByRoomId(room._id);
};

settings.get('Livechat_abandoned_rooms_action', (_, value) => {
	if (!value || value === 'none') {
		callbacks.remove('livechat:afterReturnRoomAsInquiry', 'livechat-after-return-room-as-inquiry');
		return;
	}
	callbacks.add('livechat:afterReturnRoomAsInquiry', unsetPredictedVisitorAbandonment, callbacks.priority.HIGH, 'livechat-after-return-room-as-inquiry');
});
