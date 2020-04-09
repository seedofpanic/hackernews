import {FromNowPipe} from './from-now.pipe';
import {MomentService} from "../../services/moment.service";
import {instance, mock, when} from "ts-mockito";

describe('FromNowPipe', () => {
  let momentServiceMock: MomentService;
  let pipe: FromNowPipe;

  beforeEach(() => {
    momentServiceMock = mock(MomentService);
    pipe = new FromNowPipe(instance(momentServiceMock));
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should request fromNow', () => {
      when(momentServiceMock.unix(1586422464)).thenReturn({
        fromNow() {
          return 'test hours ago';
        }
      } as any);

      expect(pipe.transform(1586422464)).toBe('test hours ago')
    })
  });
});
