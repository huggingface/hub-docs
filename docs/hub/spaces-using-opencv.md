# Using OpenCV in Spaces

In order to use OpenCV in your Gradio or Streamlit Spaces, you'll need to make the Space install both the Python and Debian dependencies

This means adding `python3-opencv` to the `packages.txt` file, and adding `opencv-python` to the `requirements.txt` file. If those files don't exist, you'll need to create them. 

To see an example, [see this Gradio project](https://huggingface.co/spaces/templates/gradio_opencv/tree/main).
