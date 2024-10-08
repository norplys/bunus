import toast from "react-hot-toast";
let SERVICE = "000018f0-0000-1000-8000-00805f9b34fb";
let WRITE = "00002af1-0000-1000-8000-00805f9b34fb";
export async function handleConnect(
  deviceHandle: any,
  setDeviceHandle: (value: any) => void,
  characteristicDevice: any,
) {
  try {
    if (!deviceHandle) {
      const currentDevice = await navigator.bluetooth.requestDevice({
        filters: [{ services: [SERVICE] }],
      });
      setDeviceHandle(currentDevice);
      localStorage.setItem("deviceID", currentDevice.id);
      const server = await currentDevice.gatt?.connect();
      const service = await server?.getPrimaryService(SERVICE);
      const characteristic = await service?.getCharacteristic(WRITE);
      characteristicDevice.current = characteristic;
    } else {
      await deviceHandle.gatt.disconnect();
      toast.success("Device disconnected");
      characteristicDevice.current = null;
      setDeviceHandle(null);
      localStorage.removeItem("deviceID");
    }
  } catch (error) {
    toast.error("Cannot connect to device");
  }
}

export async function handlePrint(data: string, characteristicDevice: any) {
  try {
    const dataLength = data.length;
    const chunkSize = 20;
    let chunk = 0;
    while (chunk < dataLength) {
      let chunkData = data.substring(chunk, chunk + chunkSize);
      await characteristicDevice.current.writeValue(
        new TextEncoder().encode(chunkData),
      );
      chunk += chunkSize;
    }
    toast.success("Printed");
  } catch (error) {
    console.log(error);
    toast.error("Device not connected");
  }
}
