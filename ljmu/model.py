import torch

# Check if GPU is available
if torch.cuda.is_available():
    print("GPU is available!")
    print("GPU device name:", torch.cuda.get_device_name(0))  # Get the name of the GPU
    print("CUDA version:", torch.version.cuda)  # Get the CUDA version
    print("CUDA capabilities:", torch.cuda.get_device_capability(0))  # Get CUDA capabilities
    print("Number of CUDA devices:", torch.cuda.device_count())  # Get the number of CUDA devices
else:
    print("No GPU available, using CPU instead.")