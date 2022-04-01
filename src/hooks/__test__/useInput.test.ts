import { renderHook } from "@testing-library/react-hooks";
import { useInput } from "hooks";

describe("useInput", () => {
  test("useInput은 길이가 3인 배열을 리턴한다. (value, onChange, setValue)", () => {
    const { result } = renderHook(() => useInput(""));
    expect(result.current).toHaveLength(3);
  });

  test("initialValue를 입력하면 value 값이 설정 된다.", () => {
    const { result } = renderHook(() => useInput("test"));
    expect(result.current[0]).toBe("test");
  });
});
