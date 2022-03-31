import { renderHook } from "@testing-library/react-hooks";
import { useInput } from "hooks";

describe("useInput", () => {
  test("initialValue를 입력하면 value 값이 설정 된다.", () => {
    const { result } = renderHook(() => useInput("test"));
    expect(result.current[0]).toBe("test");
  });
});
